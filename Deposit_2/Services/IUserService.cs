﻿using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Deposit_2.Models;
using Deposit_2.Utils;
using Deposit_2.ViewModels;

namespace Deposit_2.Services
{
    public interface IUserService
    {
        User GetUser(Expression<Func<User, bool>> predicate);
        void EditUser(User user);
        Result<User> SignUp(UserViewModel signUpModel);
        Result<User> SignIn(string login, string password);
        Result<User> EditPassword(int userId, string password, string newPassword);
        Result<User> EditProfileConfig(int userId, string password, string profileConfig);
        Result<User> EditFiltersConfig(int userId, string filtersConfig);
        Task<Result<User>> EditEmail(int userId, string password, string email);
        Task<Result<User>> EditEmail(int userId, string email);
        Result<bool> ConfirmEmail(string confirmationCode);
    }
}