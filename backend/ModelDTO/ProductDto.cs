using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.ModelDTO
{
    public class ProductDto
    {
        public int id { get; set; } 
        public string? Name { get; set; }
        public string? Description { get; set; }
        public  int? Clients { get; set; }
        
    }
}