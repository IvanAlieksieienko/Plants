using Plants.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.IServices
{
    public interface IProductService
    {
        Product Add(Product product);
        ICollection<Product> GetAll();
        ICollection<Product> GetByCategoryID(Guid? ID);
        Product GetByID(Guid? ID);
        Product Update(Product product);
        void Delete(Guid? ID);
    }
}
