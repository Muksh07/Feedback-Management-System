using System;
using System.Collections.Generic;


namespace backend.Functionality
{
    public interface IUser
    {
        public object accountCreate(Users user);
        public object loginAccount(string email, string password);
        List<Users> GetAllUsers();
        bool UpdateUserStatus(int userId, string newStatus);
        public bool UpdateUserRole(int userId, string newRole);
        public bool DeleteUser(int userId);

        object ChangePassword(string email, string oldPassword, string newPassword);
    }
}