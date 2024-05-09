using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Functionality;
using backend.ModelDTO;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {

        IFeedback functionality;
        public FeedbackController(IFeedback _functionality)
        {
            functionality = _functionality;
        }

        [HttpPost]
        [Route("SubmitFeedback")]
        [Authorize(Roles = "user")]
        public IActionResult SubmitFeedback(feedbackDto feedbackdto)
        {
            try
            {
                var feedback = new Feedback
                {
                    Name = feedbackdto.name,
                    Email = feedbackdto.email,
                    ProductId = feedbackdto.productId,
                    Rating = feedbackdto.rating,
                    Comment = feedbackdto.comment
                };
                //var userEmail = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var submited = functionality.SubmitFeedback(feedback);
                if (submited=="Submited")
                {
                    return Ok(submited);
                }
                return BadRequest("Failed to submit");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut]
        [Route("UpdateFeedback")]
        [Authorize(Roles = "user")]
        public IActionResult UpdateFeedback(Feedback updatedFeedback)
        {
            try
            {
                var feedbackUpdated = functionality.UpdateFeedback(updatedFeedback);
                if (!feedbackUpdated)
                {
                    return NotFound("Failed to Update");
                }
                return Ok("Feedback updated successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpDelete]
        [Route("DeleteFeedback/{feedbackId}")]
        [Authorize(Roles = "user, admin")]
        public IActionResult DeleteFeedback(int feedbackId)
        {
            // var result = functionality.DeleteFeedback(feedbackId);
            // return Ok(result);
            try
            {
                Feedback existingfeedback = functionality.GetFeedbackById(feedbackId) as Feedback;

                if (existingfeedback == null)
                {
                    return NotFound($"Product with ID {feedbackId} not found");
                }

                bool deleted = functionality.DeleteFeedback(existingfeedback);

                if (deleted)
                {
                    return Ok("Feedback deleted successfully");
                }

                return StatusCode(500, "Failed to delete feedback");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet]
        [Route("MyFeedback/{email}")]
        [Authorize(Roles = "user")]
        public IActionResult GetMyFeedback(string email)
        {
            try
            {
                var userFeedback = functionality.GetFeedbackByUserEmail(email);
                if (userFeedback == null || !userFeedback.Any())
                {
                    return NotFound("No feedback found for the current user.");
                }
                return Ok(userFeedback);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("AllFeedbacks")]
        [Authorize(Roles = "admin")]
        public IActionResult GetAllFeedbacks()
        {
            try
            {
                var feedbacks = functionality.GetAllFeedbacks();
                return Ok(feedbacks);

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }



        [HttpGet]
        [Route("GetFeedbackById/{feedbackId}")]
        [Authorize(Roles = "admin,user")]
        public IActionResult GetFeedbackById(int feedbackId)
        {
            try
            {
                var feedback = functionality.GetFeedbackById(feedbackId);
                return Ok(feedback);

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}