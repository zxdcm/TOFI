using System;
using System.Linq.Expressions;
using Deposit_2.Models;
using Deposit_2.Utils;

namespace Deposit_2.UserService
{
    public interface IUserService
    {
        User GetUser(Expression<Func<User, bool>> predicate);
        void AddUser(User user);
        void EditUser(User user);
        Result<User> TrySignUp(string email, string password);
        Result<User> TryLogin(string email, string password);
    }
}
