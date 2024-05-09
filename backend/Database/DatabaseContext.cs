using System;
using System.Collections.Generic;
using backend.Models;
using Microsoft.EntityFrameworkCore;


namespace backend.Database
{
    public class DatabaseContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source =NL10-DP2110; Initial Catalog = FeedbackDatabase; Integrated Security = True; Encrypt = False");
        }
        public DbSet<Users> users { get; set; }
        public DbSet<Category> categories  { get; set;}   
        public DbSet<Product> products  { get; set;}   
        public DbSet<Feedback> feedbacks  { get; set;}  
    }
}