using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.ModelDTO
{
    public class registerDto
    {
        public string? name { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public string? gender { get; set; }
        public int phoneNumber { get; set; }
    }
}