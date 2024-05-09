using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Database;
using backend.Functionality;
using backend.Models;
namespace backend.Service
{
    public class CategoryOperations:ICategory
    {
        private readonly DatabaseContext _db;
        public CategoryOperations(DatabaseContext db)
        {
            _db = db;
        }
        object ICategory.AddCategory(Category category)
        {        
            try
            {
                _db.categories.Add(category);
                _db.SaveChanges();
                return "Category added successfully";
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return $"Failed to add category: {e.Message}";
            }     
        }
        List<Category> ICategory.GetAllCategories()
        {     
            try
            {
                List<Category> categoriesObj = _db.categories.ToList();
                return categoriesObj;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                throw;
            }     
        }

       public bool UpdateCategory(Category newCategory)
        {
            try
            {       
                var categoryy = _db.categories.Find(newCategory.id);
                if (categoryy != null)
                {
                    categoryy.Name = newCategory.Name;
                    _db.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return false;
            }
        }
    }
}
