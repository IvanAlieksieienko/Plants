using Dapper;
using Plants.Core.Entities;
using Plants.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace Plants.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository<Product>
    {
        private string _connectionString;

        public ProductRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public Product Add(Product product)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                Product newProduct = new Product();
                newProduct.ID = Guid.NewGuid();
                newProduct.CategoryID = product.CategoryID;
                newProduct.IsAvailable = product.IsAvailable;
                newProduct.Name = product.Name;
                newProduct.Description = product.Description;
                newProduct.ImagePath = product.ImagePath;
                newProduct.Price = product.Price;
                var sqlQuery = "INSERT INTO Product (ID, CategoryID, IsAvailable, Name, Description, ImagePath, Price) " +
                    "VALUES (@ID, @CategoryID, @IsAvailable, @Name, @Description, @ImagePath, @Price)";
                db.Execute(sqlQuery, newProduct);
                return GetByID(newProduct.ID);
            }
        }

        public ICollection<Product> GetAll()
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                List<Product> products = db.Query<Product>("SELECT * FROM Product").ToList();
                return products;
            }
        }

        public Product GetByID(Guid? ID)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                Product product = db.Query<Product>("SELECT * FROM Product WHERE ID = @ID", new { ID }).FirstOrDefault();
                return product;
            }
        }

        public ICollection<Product> GetByCategoryID(Guid? ID)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                List<Product> products = db.Query<Product>("SELECT * FROM Product WHERE CategoryID = @ID", new { ID }).ToList();
                return products;
            }
        }

        public Product Update(Product product)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                Product newProduct = new Product();
                newProduct.ID = product.ID;
                newProduct.CategoryID = product.CategoryID;
                newProduct.IsAvailable = product.IsAvailable;
                newProduct.Name = product.Name;
                newProduct.Description = product.Description;
                newProduct.ImagePath = product.ImagePath;
                newProduct.Price = product.Price;
                var sqlQuery = "UPDATE Product SET " +
                                "ID = @ID, " +
                                "CategoryID = @CategoryID, " +
                                "IsAvailable = @IsAvailable, " +
                                "Name = @Name, " +
                                "Description = @Description, " +
                                "ImagePath = @ImagePath, " +
                                "Price = @Price " +
                                "WHERE ID = @ID";
                db.Execute(sqlQuery, newProduct);
                return GetByID(newProduct.ID);
            }
        }

        public void Delete(Guid? ID)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sqlQuery = "DELETE FROM Product WHERE ID = @ID";
                db.Execute(sqlQuery, new { ID });
            }

        }
    }
}