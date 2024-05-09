using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Net;

// using System.IO;
// using System.Net.Mail;
// using System.Threading.Tasks;
// using System.Web;

using System.Security.Claims;
using backend.Functionality;
using backend.ModelDTO;
using backend.Models;
using backend.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers
{
    [ApiController]
    [Route("FMS/[controller]")]
    public class UserController : ControllerBase
    {
        IUser functionality;
        public UserController(IUser _functionality)
        {
            functionality = _functionality;
        }

        [HttpPost]
        [Route("Create UserAccount")]
        public IActionResult CreateUserAccount(registerDto registerDto)
        {
            var newUser = new Users
            {
                Name = registerDto.name,
                Email = registerDto.email,
                Password = registerDto.password,
                Gender = registerDto.gender,
                PhoneNumber = registerDto.phoneNumber
            };
            var result = functionality.accountCreate(newUser);
            if (result == null)
            {
                return StatusCode(500, "An error occurred while creating account");
            }
            if (result is string message)
            {
                return BadRequest(message);
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("Login Account")]
        public IActionResult LoginAccount(LoginRequestDto loginDto)
        {
            try
            {
                if (string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Password))
                {
                    return BadRequest("Email and password are required.");
                }

                // Call the user service to perform login logic
                var result = functionality.loginAccount(loginDto.Email, loginDto.Password);

                if (result == null)
                {
                    return StatusCode(500, "An error occurred while logging in.");
                }

                if (result is string message)
                {
                    return BadRequest(message);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet]
        [Route("CheckToken")]
        [CustomAuthenticationFilter]
        public IActionResult CheckToken()
        {
            return Ok(new { message = "Token is valid" });
        }

        [HttpGet]
        [Route("GetAllUsers")]
        // [CustomAuthenticationFilter]
        [Authorize(Roles = "admin")]
        public IActionResult GetAllUsers()
        {
            try
            {
                // var token = HttpContext.Request.Headers["Authorization"].ToString().Split(' ')[1];
                // var tokenClaim = TokenManager.ValidateToken(token);

                // if (tokenClaim == null || !tokenClaim.HasClaim(c => c.Type == ClaimTypes.Role && c.Value == "admin"))
                // {
                //     return StatusCode((int)HttpStatusCode.Unauthorized);
                // }

                var users = functionality.GetAllUsers();

                return Ok(users);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }


        [HttpPut]
        [Route("UpdateUserStatus")]
        // [CustomAuthenticationFilter]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateUserStatus(int userId, string newStatus)
        {
            try
            {
                // var token = Request.Headers["Authorization"].ToString().Split(' ')[1];;
                // var tokenClaim = TokenManager.ValidateToken(token);
                // if (tokenClaim == null || !tokenClaim.HasClaim(c => c.Type == ClaimTypes.Role && c.Value == "admin"))
                // {
                //     return Unauthorized();
                // }
                var updated = functionality.UpdateUserStatus(userId, newStatus);
                if (updated)
                {
                    return Ok("User status updated successfully");
                }
                return NotFound("User not found");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        [Route("Change Password")]
        // [CustomAuthenticationFilter]
        [Authorize(Roles = "admin,,user")]
        public IActionResult ChangePassword(ChangePassword model)
        {
            try
            {
                // var token = Request.Headers["Authorization"].ToString().Split(' ')[1];
                // var tokenClaim = TokenManager.ValidateToken(token);        
                // // Check if token claim exists and has the appropriate role
                // if (tokenClaim == null || !tokenClaim.HasClaim(c => c.Type == ClaimTypes.Role && (c.Value == "admin" || c.Value == "user")))
                // {
                //     return Unauthorized();
                // }
                var result = functionality.ChangePassword(model.Email, model.OldPassword, model.NewPassword);
                // if (result is string message)
                // {
                //     return BadRequest(message);
                // }
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}