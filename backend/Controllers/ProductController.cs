using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using backend.Functionality;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("FMS/[controller]")]
    public class ProductController : ControllerBase
    {
        Iproduct functionality;
        public ProductController(Iproduct _functionality)
        {
            functionality = _functionality;
        }

        [HttpPost]
        [Route("AddProduct")]
        [Authorize(Roles = "admin")]
        public IActionResult AddProduct(Product product)
        {
            try
            {
                var added = functionality.AddProduct(product);
                if (added)
                {
                    return Ok(added);
                }
                return BadRequest("Failed to add product");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet]
        [Route("GetAllProducts")]
        //[Authorize(Roles = "admin,user")]
        public IActionResult GetAllProducts()
        {
            try
            {
                var products = functionality.GetAllProducts();
                return Ok(products);

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet]
        [Route("GetProductsByCategoryId/{cid}")]
        //[Authorize(Roles = "admin,user")]
        public IActionResult GetProductsByCategoryId(int cid)
        {
            try
            {
                var products = functionality.GetProductsByCategoryId(cid);
                if(products==null||products.Count==0)
                {
                    return NotFound("No products found for the specified category ID.");
                }
                return Ok(products);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet]
        [Route("GetProductsById/{id}")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                var products = functionality.GetProductsById(id);
                return Ok(products);

            }
            catch (Exception e)
            {
                Console.WriteLine($"Error occurred: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut]
        [Route("UpdateProduct")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateProduct(Product updatedProduct)
        {
            try
            {
                var product = functionality.GetProductsById(updatedProduct.id) as Product;
                if (product == null)
                {
                    return NotFound($"Product with ID {updatedProduct.id} not found");
                }

                product.Name = updatedProduct.Name;
                product.Description = updatedProduct.Description;
                product.Clients = updatedProduct.Clients;
                product.ImageUrl = updatedProduct.ImageUrl;
                product.CategoryId = updatedProduct.CategoryId; 

                var updated = functionality.UpdateProduct(product);
                if (updated)
                {
                    return Ok("Product updated successfully");
                }
                return StatusCode(500, "Failed to update product");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpDelete]
        [Route("DelsteProduct/{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                Product existingProduct = functionality.GetProductsById(id) as Product;

                if (existingProduct == null)
                {
                    return NotFound($"Product with ID {id} not found");
                }

                bool deleted = functionality.DeleteProduct(existingProduct);

                if (deleted)
                {
                    return Ok("Product deleted successfully");
                }

                return StatusCode(500, "Failed to delete product");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }



        
    }
}
