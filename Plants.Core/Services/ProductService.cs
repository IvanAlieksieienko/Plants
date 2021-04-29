using Plants.Core.Entities;
using Plants.Core.IRepositories;
using Plants.Core.IServices;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Plants.Core.Services
{
    /// <summary>
	/// Сервис продуктов, использующий репозиторий
	/// </summary>
    public class ProductService : IProductService
    {
        /// <summary>
		/// Репозиторий продуктов
		/// </summary>
        private IProductRepository<Product> _productRepository;

        /// <summary>
		/// Конструктор
		/// </summary>
		/// <param name="productRepository">Интерфейс репозитория продуктов, внедряемый благодаря встроенному Dependency Injection</param>
        public ProductService(IProductRepository<Product> productRepository)
        {
            _productRepository = productRepository;
        }

        /// <summary>
		/// Добавление продукта в БД
		/// </summary>
		/// <param name="product">Новый продукт</param>
		/// <returns>Продукт с обновленным ИД</returns>
        public async Task<Product> Add(Product product)
        {
            return await _productRepository.Add(product);
        }

        /// <summary>
		/// Получение всех продуктов из БД
		/// </summary>
		/// <returns>Коллекция продуктов</returns>
        public async Task<ICollection<Product>> GetAll()
        {
            return await _productRepository.GetAll();
        }

        /// <summary>
		/// Получение продукта по его ИД
		/// </summary>
		/// <param name="ID">Идентификатор (типа Guid)</param>
		/// <returns>Обьект продукта</returns>
        public async Task<Product> GetByID(Guid? ID)
        {
            return await _productRepository.GetByID(ID);
        }

        /// <summary>
		/// Получение коллекции продуктов, которые относятся
		/// к конкретной категории
		/// </summary>
		/// <param name="ID">ИД категории</param>
		/// <returns>Коллекцию продуктов</returns>
        public async Task<ICollection<Product>> GetByCategoryID(Guid? ID)
        {
            return await _productRepository.GetByCategoryID(ID);
        }

        /// <summary>
		/// Изменение продукта и возвращение его обновленного
		/// </summary>
		/// <param name="product">Продукт для модификации в бд</param>
		/// <returns>Обновленный продукт</returns>
        public async Task<Product> Update(Product product)
        {
            return await _productRepository.Update(product);
        }

        /// <summary>
		/// Удаление продукта из БД
		/// </summary>
		/// <param name="ID">ИД продукта, который нужно удалить</param>
		/// <returns>Ничего</returns>
        public async Task Delete(Guid? ID)
        {
           await _productRepository.Delete(ID);
        }
    }
}
