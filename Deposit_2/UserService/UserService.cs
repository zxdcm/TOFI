using System;
using System.Linq;
using Deposit_2.Context;
using Deposit_2.Models;
using System.Security.Cryptography;
using System.Text;

namespace Deposit_2.UserService
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        public static Result<T> Ok(T data = default(T)) => new Result<T> { IsSuccess = true, Data = data };
    }

    public class UserService : IUserService
    {
        private readonly UserContext _userContext;
        public UserService(UserContext userContext)
        {
            _userContext = userContext ?? throw new NullReferenceException(nameof(UserContext));
        }
        public User GetUserById(int userId) => _userContext.Users.FirstOrDefault(u => u.UserId == userId);

        public void AddUser(User user) => _userContext.Users.Add(user);

        public void EditUser(User user) => _userContext.Update(user);

        public void SecurePassword(User user)
            => user.Password = Convert.ToBase64String(MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(user.Password)));
    }
}
