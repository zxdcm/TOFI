using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Newtonsoft.Json;
using Deposit_2.Context;
using Deposit_2.Models;
using Deposit_2.Resources;
using Deposit_2.Utils;
using Deposit_2.ViewModels;

namespace Deposit_2.Services
{
    public class UserService : IUserService
    {
        private readonly UserContext _userContext;
        private readonly SecurityService _securityService;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationConfiguration _config;

        public UserService(
            UserContext userContext,
            IEmailSender emailSender,
            SecurityService securityService,
            ApplicationConfiguration config)
        {
            _userContext = userContext ?? throw new NullReferenceException(nameof(UserContext));
            _emailSender = emailSender;
            _securityService = securityService;
            _config = config;
        }
        public User GetUser(Expression<Func<User, bool>> predicate) 
            => _userContext.Users.FirstOrDefault(predicate);

        public void EditUser(User user)
        {
            _userContext.Update(user);
            _userContext.SaveChanges();
        }

        public Result<User> SignUp(UserViewModel signUpVm)
        {
            var isEmailOccupied = GetUser(u => u.Email == signUpVm.Email) != null;
            if (isEmailOccupied)
                return Result<User>.Fail(string.Format(ResultMessages.EmailOccupied));

            var isUserNameOccupied = GetUser(u => u.Username == signUpVm.Username) != null;
            if (isUserNameOccupied)
                return Result<User>.Fail(string.Format(ResultMessages.UserNameOccupied));

            var securedPassword = _securityService.SecureWithMd5(signUpVm.Password, signUpVm.Email);
            var userEntity = new User
            {
                Username = signUpVm.Username,
                Email = signUpVm.Email,
                Password = securedPassword,
                ProfileConfig = signUpVm.ProfileConfig,
                FiltersConfig = signUpVm.FiltersConfig,
            };

            _userContext.Users.Add(userEntity);
            _userContext.SaveChanges();

            return Result<User>.Ok(userEntity);
        }

        public Result<User> SignIn(string login, string password)
        {
            var userEntity = GetUser(u => u.Username == login) ?? GetUser(u => u.Email == login);
            if (userEntity == null)
                return Result<User>.Fail(
                    string.Format(ResultMessages.UserWithLoginNotFound, login));

            var now = DateTime.UtcNow;
            Result<User> result;

            var isAccountBlocked = userEntity.BlockExpires > now;
            var accountedBlockedResult = Result<User>.Fail(string.Format(ResultMessages.AccountBlocked, _config.BlockTimeInMinutes));

            if (isAccountBlocked)
            {
                return accountedBlockedResult;
            }

            if (userEntity.Password == _securityService.SecureWithMd5(password, userEntity.Email))
            {
                userEntity.FailedAuthRetryCount = 0;
                result = Result<User>.Ok(new User
                {
                    UserId = userEntity.UserId,
                    Username = userEntity.Username,
                    Email = userEntity.Email,
                    ProfileConfig = userEntity.ProfileConfig,
                    FiltersConfig = userEntity.FiltersConfig
                });
            }
            else
            {
                userEntity.FailedAuthRetryCount += 1;

                if (userEntity.FailedAuthRetryCount == _config.AmountOfRetriesUntilBlock)
                {
                    userEntity.BlockExpires = now.AddMinutes(_config.BlockTimeInMinutes);
                    userEntity.FailedAuthRetryCount = 0;
                    result = accountedBlockedResult;
                }
                else
                {
                    result = Result<User>.Fail(ResultMessages.InvalidPassword);
                }
            }

            _userContext.SaveChanges();

            return result;
        }

        public Result<User> EditPassword(int userId, string password, string newPassword) =>
            EditWithSecurityCheck(userId, password, newPassword);

        public Result<User> EditProfileConfig(int userId, string password, string profileConfig) =>
            EditWithSecurityCheck(userId, password, profileConfig);

        public Result<User> EditFiltersConfig(int userId, string filtersConfig) =>
            EditWithoutSecurityCheck(userId, filtersConfig);

        public async Task<Result<User>> EditEmail(int userId, string password, string email)
        {
            var result = GetUserWithSecurityCheck(userId, password);
            if (!result.IsSuccess)
                return result;

            await SendEmailConfirmationMessage(userId, email);

            return Result<User>.Ok(string.Empty);
        }

        public async Task<Result<User>> EditEmail(int userId, string email)
        {
            var result = GetUser(userId);
            if (!result.IsSuccess)
                return result;

            await SendEmailConfirmationMessage(userId, email);

            return Result<User>.Ok(string.Empty);
        }

        public Result<bool> ConfirmEmail(string code)
        {
            var payload = new { UserId = 0, Email = string.Empty, CreatedOn = DateTime.MinValue };
            try
            {
                payload = JsonConvert.DeserializeAnonymousType(_securityService.DecryptAes(code), payload);
            }
            catch (Exception) // todo: replace
            {
                return Result<bool>.Fail(string.Empty);
            }

            var user = GetUser(u => u.UserId == payload.UserId);

            if (DateTime.UtcNow.AddMinutes(_config.ConfirmationCodeValidTimeInMinutes) < payload.CreatedOn
                && user.Email != payload.Email)
            {
                user.Email = payload.Email;

                _userContext.SaveChanges();

                return Result<bool>.Ok(true);
            }

            return Result<bool>.Ok(false);
        }

        private async Task SendEmailConfirmationMessage(int userId, string email)
        {
            var confirmationCodePayload = new { UserId = userId, Email = email, CreatedOn = DateTime.UtcNow };
            var confirmationCode = _securityService.EncryptAes(JsonConvert.SerializeObject(confirmationCodePayload));

            await _emailSender.SendEmailAsync(email, EmailMessages.Subject,
                string.Format(EmailMessages.HtmlBody, confirmationCode));
        }

        private Result<User> EditWithSecurityCheck(
            int userId, string password, string newPassword = null,
            string profileConfig = null)
        {
            var userResult = GetUserWithSecurityCheck(userId, password);
            if (!userResult.IsSuccess)
                return userResult;

            var user = userResult.Data;

            if (!string.IsNullOrWhiteSpace(newPassword))
                user.Password = _securityService.SecureWithMd5(newPassword, user.Email);

            if (!string.IsNullOrWhiteSpace(profileConfig))
                user.ProfileConfig = profileConfig;

            _userContext.SaveChanges();

            return Result<User>.Ok(string.Empty);
        }

        private Result<User> EditWithoutSecurityCheck(
            int userId, string filtersConfig = null,
            string email = null)
        {
            var userResult = GetUser(userId);
            if (!userResult.IsSuccess)
                return userResult;

            var user = userResult.Data;

            if (!string.IsNullOrWhiteSpace(filtersConfig))
                user.FiltersConfig = filtersConfig;

            _userContext.SaveChanges();

            return Result<User>.Ok(string.Empty);
        }

        private Result<User> GetUser(int userId)
        {
            var user = GetUser(u => u.UserId == userId);
            if (user == null)
                return Result<User>.Fail(string.Format(ResultMessages.UserNotFound, nameof(User.UserId), userId));

            return Result<User>.Ok(user);
        }

        private Result<User> GetUserWithSecurityCheck(int userId, string oldPassword)
        {
            var userResult = GetUser(userId);
            if (!userResult.IsSuccess)
                return userResult;

            var user = userResult.Data;
            if (user.Password != _securityService.SecureWithMd5(oldPassword, user.Email))
                return Result<User>.Ok(string.Format(ResultMessages.InvalidPassword));

            return Result<User>.Ok(user);
        }
    }
}
