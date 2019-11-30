using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Deposit_2.Models;
using Deposit_2.Utils;
using Deposit_2.ViewModels;

namespace Deposit_2.Services
{
    public interface IUserService
    {
        void EditUser(User user);
        User GetUser(Expression<Func<User, bool>> predicate);
        Result<User> SignIn(string login, string password);
        Result<User> EditPassword(int userId, string password, string newPassword);
        Result<User> EditProfileConfig(int userId, string password, string profileConfig);
        Result<User> EditFiltersConfig(int userId, string filtersConfig);
        Result<bool> ConfirmEmail(string confirmationCode);
        Task<Result<User>> SignUp(UserViewModel signUpVm);
        Task<Result<User>> EditEmail(int userId, string password, string email);
        Task<Result<User>> EditEmail(int userId, string email);
    }
}
