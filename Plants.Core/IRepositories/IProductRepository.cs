using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.IRepositories
{
    public interface IProductRepository<U> where U : class
    {
        U Add(U product);

        ICollection<U> GetAll();

        U GetByID(Guid? ID);

        ICollection<U> GetByCategoryID(Guid? ID);

        U Update(U product);

        void Delete(Guid? ID);
    }
}
