using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Security
{
    public class TokenClaim
    {
        public string? Email { get; set; }
        public string? Role { get; set; }
        public string? Name { get; set; }
    }
}