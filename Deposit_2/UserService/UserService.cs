using System;
using System.Linq;
using System.Linq.Expressions;
using Deposit_2.Context;
using Deposit_2.Models;
using Deposit_2.Resources;
using Deposit_2.Utils;

namespace Deposit_2.UserService
{
    public class UserService : IUserService
    {
        private readonly UserContext _userContext;
        public UserService(UserContext userContext)
        {
            _userContext = userContext ?? throw new NullReferenceException(nameof(UserContext));
        }
        public User GetUser(Expression<Func<User, bool>> predicate) => _userContext.Users.FirstOrDefault(predicate);

        public void AddUser(User user)
        {
            _userContext.Users.Add(user);
            _userContext.SaveChanges();
        }

        public void EditUser(User user)
        {
            _userContext.Update(user);
            _userContext.SaveChanges();
        }

        public Result<User> TrySignUp(string email, string password)
        {
            throw new NotImplementedException();
        }

        public Result<User> TryLogin(string email, string password)
        {
            var userEntity = GetUser(u => u.Email == email);

            if (userEntity == null)
                return Result<User>.Fail(ResultMessages.UserNotFound);

            var now = DateTime.UtcNow;
            Result<User> result;

            var isAccountBlocked = userEntity.BlockExpires > now;
            var accountedBlockedResult = Result<User>.Fail(string.Format(ResultMessages.AccountBlocked, Configuration.BlockTimeInMinutes));

            if (isAccountBlocked)
            {
                return accountedBlockedResult;
            }

            if (userEntity.Password == SecurityExtensions.SecureWithMd5(password, email))
            {
                userEntity.FailedAuthRetryCount = 0;
                result = Result<User>.Ok(new User
                {
                    UserId = userEntity.UserId,
                    Email = userEntity.Email,
                    FiltersConfig = userEntity.FiltersConfig
                });
            }
            else
            {
                userEntity.FailedAuthRetryCount += 1;

                if (userEntity.FailedAuthRetryCount == Configuration.AmountOfRetriesUntilBlock)
                {
                    userEntity.BlockExpires = now.AddMinutes(Configuration.BlockTimeInMinutes);
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
    }
}
