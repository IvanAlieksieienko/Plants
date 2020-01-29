using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.IRepositories
{
    public interface ICategoryRepository<U> where U : class
    {
        U Add(U category);

        ICollection<U> GetAll();

        U GetByID(Guid? ID);

        U Update(U category);

        void Delete(Guid? ID);
    }
}
