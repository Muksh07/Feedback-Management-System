using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Functionality
{
    public interface Iproduct
    {
        bool AddProduct(Product product);
        List<object> GetAllProducts();
        public List<Product> GetProductsByCategoryId(int id);

        public Object GetProductsById(int id);
        public bool UpdateProduct(Product updatedProduct);

        public bool DeleteProduct(Product product);

    }
}