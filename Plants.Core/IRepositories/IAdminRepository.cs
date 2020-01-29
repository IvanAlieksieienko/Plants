using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.IRepositories
{
    public interface IAdminRepository<U> where U :class
    {
        U Add(U admin);

        ICollection<U> GetAll();

        U GetByID(Guid? ID);

        U GetByLoginPassword(string login, string password);

        U Update(U admin);

        void Delete(Guid? ID);
    }
}
