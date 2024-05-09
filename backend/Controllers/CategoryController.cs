using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Functionality;
using backend.Models;
using backend.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("FMS/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _functionality;

        public CategoryController(ICategory functionality)
        {
            _functionality = functionality;
        }

        [HttpPost]
        [Route("AddCategory")]
        // [CustomAuthenticationFilter]
        [Authorize(Roles = "admin")]
        public IActionResult AddCategory(Category category)
        {
            try
            {
                // var token = Request.Headers["Authorization"].ToString().Split(' ')[1];
                // var tokenClaim = TokenManager.ValidateToken(token);

                // if (tokenClaim == null || !tokenClaim.HasClaim(c => c.Type == ClaimTypes.Role && c.Value == "admin"))
                // {
                //     return Unauthorized();
                // }

                var result = _functionality.AddCategory(category);

                // if (result is string message)
                // {
                //    return BadRequest(message);
                // }

                return Ok(result); 
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet]
        [Route("GetAllCategories")]
        public IActionResult GetAllCategories()
        {
            try
            {
                var categories = _functionality.GetAllCategories();
                return Ok(categories); 
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        [Route("UpdateCategory")]
        // [CustomAuthenticationFilter]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateCategory(Category newCategory)
        {
            try
            {
                // var token = Request.Headers["Authorization"].ToString().Split(' ')[1];
                // var tokenClaim = TokenManager.ValidateToken(token);
                // if (tokenClaim == null || !tokenClaim.HasClaim(c => c.Type == ClaimTypes.Role && c.Value == "admin"))
                // {
                //     return Unauthorized();
                // }
                var updated = _functionality.UpdateCategory(newCategory);
                if (updated)
                {
                    return Ok("Category updated successfully");
                }
                return NotFound("CAtegory not found");                
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
        
    }
}