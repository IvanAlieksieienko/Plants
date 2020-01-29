using Plants.Core.Entities;
using Plants.Core.IRepositories;
using Plants.Core.IServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.Services
{
    public class ProductService : IProductService
    {
        private IProductRepository<Product> _productRepository;

        public ProductService(IProductRepository<Product> productRepository)
        {
            _productRepository = productRepository;
        }

        public Product Add(Product product)
        {
            return _productRepository.Add(product);
        }

        public ICollection<Product> GetAll()
        {
            return _productRepository.GetAll();
        }

        public Product GetByID(Guid? ID)
        {
            return _productRepository.GetByID(ID);
        }

        public ICollection<Product> GetByCategoryID(Guid? ID)
        {
            return _productRepository.GetByCategoryID(ID);
        }

        public Product Update(Product product)
        {
            return _productRepository.Update(product);
        }

        public void Delete(Guid? ID)
        {
            _productRepository.Delete(ID);
        }
    }
}
