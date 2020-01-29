using Plants.Core.Entities;
using Plants.Core.IRepositories;
using Plants.Core.IServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.Services
{
    public class AdminService : IAdminService
    {
        private IAdminRepository<Admin> _adminRepository;

        public AdminService(IAdminRepository<Admin> adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public Admin GetByLoginPassword(string login, string password)
        {
            return _adminRepository.GetByLoginPassword(login, password);
        }

        public Admin Add(Admin admin)
        {
            return _adminRepository.Add(admin);
        }

        public ICollection<Admin> GetAll()
        {
            return _adminRepository.GetAll();
        }

        public Admin GetByID(Guid? ID)
        {
            return _adminRepository.GetByID(ID);
        }

        public Admin Update(Admin admin)
        {
            return _adminRepository.Update(admin);
        }

        public void Delete(Guid? ID)
        {
            _adminRepository.Delete(ID);
        }
    }
}
