using Plants.Core.Entities;
using Plants.Core.IRepositories;
using Plants.Core.IServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.Services
{
    public class CategoryService : ICategoryService
    {
        private ICategoryRepository<Category> _categoryRepository;

        public CategoryService(ICategoryRepository<Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public Category Add(Category category)
        {
            return _categoryRepository.Add(category);
        }

        public ICollection<Category> GetAll()
        {
            return _categoryRepository.GetAll();
        }

        public Category GetByID(Guid? ID)
        {
            return _categoryRepository.GetByID(ID);
        }

        public Category Update(Category category)
        {
            return _categoryRepository.Update(category);
        }

        public void Delete(Guid? ID)
        {
            _categoryRepository.Delete(ID);
        }
    }
}
