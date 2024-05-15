using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Database;
using backend.Functionality;
using backend.Models;

namespace backend.Service
{
    public class FeedbackOperations : IFeedback
    {

        private readonly DatabaseContext _db;

        public FeedbackOperations(DatabaseContext db)
        {
            _db = db;
        }
        object IFeedback.SubmitFeedback(Feedback feedback)
        {
            try
            {
                var user = _db.users.FirstOrDefault(u => u.Email == feedback.Email);
                if (user == null)
                {
                    return "Invalid user"; // User not found
                }
                var existingProduct = _db.products.Find(feedback.ProductId);
                if (existingProduct == null)
                {
                    return "Product not Found";
                }
                var existingFeedback = _db.feedbacks.FirstOrDefault(f => f.ProductId == feedback.ProductId && f.Email == feedback.Email);
                if (existingFeedback != null)
                {
                    return "You have already submitted feedback for this product";
                }
                _db.feedbacks.Add(feedback);
                _db.SaveChanges();
                return "Submited";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
                return $"Failed to submit feedback: {ex.Message}";
            }
        }


        bool IFeedback.UpdateFeedback(Feedback updatedFeedback)
        {
            try
            {
                var user = _db.users.FirstOrDefault(u => u.Email == updatedFeedback.Email);
                if (user == null)
                {
                    return false; // User not found
                }
                var existingFeedback = _db.feedbacks.FirstOrDefault(f => f.Email == updatedFeedback.Email &&  f.ProductId == updatedFeedback.ProductId);
                if (existingFeedback == null)
                {
                    return false; // Product not found
                }
                var existingProduct = _db.products.Find(updatedFeedback.ProductId);
                if (existingProduct == null)
                {
                    return false;
                }
                existingFeedback.Name = updatedFeedback.Name;
                existingFeedback.Email = updatedFeedback.Email;
                existingFeedback.ProductId = updatedFeedback.ProductId;
                existingFeedback.Rating = updatedFeedback.Rating;
                existingFeedback.Comment = updatedFeedback.Comment;
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred while updating Feedback: {ex.Message}");
                return false;
            }
        }


        bool IFeedback.DeleteFeedback(Feedback feedback)
        {
            try
            {
                if (feedback != null)
                {
                    _db.feedbacks.Remove(feedback);
                    _db.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred while deleting feedback: {ex.Message}");
                return false;
            }
        }



        object IFeedback.GetFeedbackById(int feedbackId)
        {
            try
            {
                Feedback feedbackById = _db.feedbacks.Find(feedbackId);
                if (feedbackById != null)
                {
                    return feedbackById;
                }
                return "Feedback not exist";
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error occurred : {ex.Message}");
                return null;
            }
        }

        List<object> IFeedback.GetAllFeedbacks()
        {
            try
            {
                // return _db.products.ToList();
                var result = _db.feedbacks.Select(feedback => new
                {
                    feedback.Id,
                    feedback.Name,
                    feedback.Comment,
                    feedback.Email,
                    feedback.Rating,
                    feedback.ProductId
                }).ToList<object>();
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                throw;
            }
        }

        public List<Feedback> GetFeedbackByUserEmail(string email)
        {
            var userFeedback = _db.feedbacks.Where(f => f.Email == email).ToList();
            return userFeedback;
        }

    }
}