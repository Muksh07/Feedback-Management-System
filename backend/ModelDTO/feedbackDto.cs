using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.ModelDTO
{
    public class feedbackDto
    {
        public string? name { get; set; }
        public string? email { get; set; }
        public int productId { get; set; }
        public int rating { get; set; }
        public string? comment { get; set; }
    }
}