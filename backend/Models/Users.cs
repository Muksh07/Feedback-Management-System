using System.ComponentModel.DataAnnotations;

public class Users
{
       //[Key]
       public int Id { get; set; }
       public string? Name { get; set; }
       public string? Email { get; set; }
       public string? Password { get; set; }
       public string? Gender { get; set; }
       public int PhoneNumber { get; set; }
       public string? Role { get; set; }
       public string? status { get; set; }
}