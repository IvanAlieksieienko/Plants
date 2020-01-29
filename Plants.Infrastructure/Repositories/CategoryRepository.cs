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
    public class CategoryRepository : ICategoryRepository<Category>
    {
        private string _connectionString;

        public CategoryRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public Category Add(Category category)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                Category newCategory = new Category();
                newCategory.ID = Guid.NewGuid();
                newCategory.Name = category.Name;
                newCategory.Description = category.Description;
                newCategory.ImagePath = category.ImagePath;
                var sqlQuery = "INSERT INTO Category (ID, Name, Description, ImagePath) " +
                    "VALUES (@ID, @Name, @Description, @ImagePath)";
                db.Execute(sqlQuery, newCategory);
                return GetByID(newCategory.ID);
            }
        }

        public ICollection<Category> GetAll()
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                List<Category> categories = db.Query<Category>("SELECT * FROM Category").ToList();
                return categories;
            }
        }

        public Category GetByID(Guid? ID)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                Category category = db.Query<Category>("SELECT * FROM Category WHERE ID = @ID", new { ID }).FirstOrDefault();
                return category;
            }
        }

        public Category Update(Category category)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                Category newCategory = new Category();
                newCategory.ID = category.ID;
                newCategory.Name = category.Name;
                newCategory.Description = category.Description;
                newCategory.ImagePath = category.ImagePath;
                var sqlQuery = "UPDATE Category SET " +
                                "ID = @ID, " +
                                "Name = @Name, " +
                                "Description = @Description, " +
                                "ImagePath = @ImagePath " +
                                "WHERE ID = @ID";
                db.Execute(sqlQuery, newCategory);
                return GetByID(newCategory.ID);
            }
        }

        public void Delete(Guid? ID)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sqlQuery = "DELETE FROM Category WHERE ID = @ID";
                db.Execute(sqlQuery, new { ID });
            }
        }
    }
}
