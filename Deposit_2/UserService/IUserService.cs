using Deposit_2.Models;

namespace Deposit_2.UserService
{
    interface IUserService
    {
        User GetUserById(int userId);
        void AddUser(User user);
        void EditUser(User user);
    }
}
