using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;


namespace backend.Functionality
{
    public interface IFeedback
    {
    object SubmitFeedback(Feedback feedback);
    bool UpdateFeedback(Feedback updatedFeedback);
    object GetFeedbackById(int feedbackId);
    bool DeleteFeedback(Feedback feedback);
    List<object> GetAllFeedbacks();
    public List<Feedback> GetFeedbackByUserEmail(string userEmail);

    }
}