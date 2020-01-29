using Plants.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.IServices
{
    public interface ICategoryService
    {
        Category Add(Category category);
        ICollection<Category> GetAll();
        Category GetByID(Guid? ID);
        Category Update(Category category);
        void Delete(Guid? ID);
    }
}
