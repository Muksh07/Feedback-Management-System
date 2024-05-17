using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Database;
using backend.Functionality;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Service
{
    public class ProductOperations : Iproduct
    {
        private readonly DatabaseContext _db;

        public ProductOperations(DatabaseContext db)
        {
            _db = db;
        }

        bool Iproduct.AddProduct(Product product)
        {
            try
            {
                _db.products.Add(product);
                _db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return false;
            }
        }

        public List<object> GetAllProducts()
        {
            try
            {
                // return _db.products.ToList();
                var result = (from product in _db.products
                              join category in _db.categories on product.CategoryId equals category.id
                              select new
                              {
                                  product.id,
                                  product.Name,
                                  product.Description,
                                  product.Clients,
                                  product.ImageUrl,
                                  categoryid = category.id,
                                  categoryName = category.Name
                              }).ToList<object>();

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                throw; 
            }
        }

        public List<Product> GetProductsByCategoryId(int id)
        {
            try
            {
                var productsByCategory = _db.products
                 .Join(_db.categories,
                 product => product.CategoryId,
                 category => category.id,
                 (product, category) => new { Product = product, Category = category })
                 .Where(joinResult => joinResult.Category.id == id)
                 .Select(joinResult => joinResult.Product)
                 .ToList();

                return productsByCategory;
            }
            catch (Exception ex)
            {
                
                Console.WriteLine($"Error occurred : {ex.Message}");
                return null; 
            }
        }
        public Object GetProductsById(int id)
        {
            try
            {
                Product productsById = _db.products.Find(id);
                if(productsById!=null)
                {
                    return productsById;
                }
                return "Product not exist";
            }
            catch (Exception ex)
            {
                
                Console.WriteLine($"Error occurred : {ex.Message}");
                return null; 
            }

        }

        public bool UpdateProduct(Product updatedProduct)
        {
            try
            {
                var existingProduct = _db.products.Find(updatedProduct.id);

                if (existingProduct == null)
                {
                    return false; // Product not found
                }

                existingProduct.Name = updatedProduct.Name;
                existingProduct.Description = updatedProduct.Description;
                existingProduct.Clients = updatedProduct.Clients;
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred while updating product: {ex.Message}");
                return false;
            }
        }

        public bool DeleteProduct(Product product)
        {
            try
            {
                if (product != null)
                {
                    _db.products.Remove(product);
                    _db.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred while deleting product: {ex.Message}");
                return false;
            }
        }
    }
}