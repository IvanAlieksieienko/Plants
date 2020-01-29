using Plants.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.IServices
{
    public interface IAdminService
    {
        Admin GetByLoginPassword(string login, string password);
        Admin Add(Admin admin);
        ICollection<Admin> GetAll();
        Admin GetByID(Guid? ID);
        Admin Update(Admin admin);
        void Delete(Guid? ID);
    }
}
