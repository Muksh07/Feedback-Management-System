using System;
using System.Linq;
using backend.Database;
using backend.Functionality;
using backend.Security;
using Microsoft.AspNetCore.Mvc;
namespace backend.Service
{
    public class UserOperations : IUser
    {
        private readonly DatabaseContext _db;
        public UserOperations(DatabaseContext db)
        {
            _db = db;
        }
        object IUser.accountCreate(Users user)
        {
            try
            {
                var userObj = _db.users.FirstOrDefault(u => u.Email == user.Email);
                if (userObj == null)
                {
                    user.Role = "user";
                    user.status = "false";
                    _db.users.Add(user);
                    _db.SaveChanges();
                    return true;
                }
                else
                {
                    return "Email already exists";
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return 0;
            }
        }
        object IUser.loginAccount(string email, string password)
        {
            try
            {
                var user = _db.users.FirstOrDefault(u => u.Email == email && u.Password == password);
                if (user != null)
                {
                    if (user.status == "true")
                    {
                        string token = TokenManager.GenerateToken(user.Email, user.Role, user.Name);
                        return new { token };
                    }
                    else
                    {
                        return "Wait for admin approval";
                    }
                }
                else
                {
                    return "Invalid credentials";
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return null;
            }
        }
        public List<Users> GetAllUsers()
        {
            // Retrieve all users from the database
            return _db.users.Select(u => 
            new Users{ Id = u.Id, Name = u.Name, 
                       Email = u.Email, Gender = u.Gender,
                       PhoneNumber = u.PhoneNumber, Role = u.Role, status = u.status}).ToList();
        }
        public bool UpdateUserStatus(int userId, string newStatus)
        {
            try
            {              
                var user = _db.users.Find(userId);
                if (user != null)
                {
                    user.status = newStatus;
                    _db.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return false;
            }
        }
        public bool UpdateUserRole(int userId, string newRole)
        {
            try
            {              
                var user = _db.users.Find(userId);
                if (user != null)
                {
                    user.Role = newRole;
                    _db.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return false;
            }
        }
        public object ChangePassword(string email, string oldPassword, string newPassword)
        {
            try
            {
                var user = _db.users.FirstOrDefault(u => u.Email == email && u.Password == oldPassword);
                if (user == null)
                {
                    return "Invalid credentials";
                }
                user.Password = newPassword;
                _db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return false;
            }
        }
        public bool DeleteUser(int userId)
        {
            try
            {
                var user = _db.users.Find(userId);
                if (user != null)
                {
                    _db.users.Remove(user);
                    _db.SaveChanges();
                    return true;
                }
                else
                {
                    return false; // User with specified ID not found
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return false;
            }
        }
    }
}
