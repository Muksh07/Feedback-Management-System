using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Functionality
{
    public interface ICategory
    {
        object AddCategory(Category category);
        public List<Category> GetAllCategories();

        public bool UpdateCategory(Category newCategory);
    
    }
}