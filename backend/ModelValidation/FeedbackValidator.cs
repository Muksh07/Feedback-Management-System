using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using FluentValidation;

namespace backend.ModelValidation
{
    public class FeedbackValidator : AbstractValidator<Feedback>
    {
        public FeedbackValidator()
        {
            RuleFor(f => f.Email).NotEmpty().EmailAddress(); 
            RuleFor(f => f.ProductId).NotEmpty().GreaterThan(0); 
            RuleFor(f => f.Rating).InclusiveBetween(1, 10); 
        }

    }
}