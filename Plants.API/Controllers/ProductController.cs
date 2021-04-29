using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Plants.Core.Entities;
using Plants.Core.IServices;

namespace Plants.API.Controllers
{
    /// <summary>
	/// Контроллер для реализации бизнес логики продуктов.
	/// Принимает запрос, выполняет действия и отдает ответ,
	/// если он есть.
	/// </summary>
    [Route("product")]
    [ApiController]
    public class ProductController : Controller
    {
        /// <summary>
		/// Сервис продуктов, с которым взаимодействует контроллер.
		/// </summary>
        private IProductService _productService;

        /// <summary>
		/// Конструктор
		/// </summary>
		/// <param name="productService">Интерфейс сервиса продуктов, внедряемый благодаря встроенному Dependency Injection</param>
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        /// <summary>
		/// Метод получения всех продуктов с базы данных
		/// </summary>
		/// <returns>Коллекция продуктов</returns>
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAll();
            return Ok(products);
        }

        /// <summary>
		/// Получает конкретный продукт по его ИД
		/// </summary>
		/// <param name="ID">Идентификатор (типа Guid)</param>
		/// <returns>Обьект продукта</returns>
        [HttpGet("{ID:guid}")]
        public async Task<IActionResult> GetByID(Guid ID)
        {
            var product = await _productService.GetByID(ID);
            return Ok(product);
        }

        /// <summary>
		/// Получение коллекции продуктов, которые относятся
		/// к конкретной категории
		/// </summary>
		/// <param name="ID">ИД категории</param>
		/// <returns>Коллекцию продуктов</returns>
        [HttpGet("category/{ID:guid}")]
        public async Task<IActionResult> GetByCategoryID(Guid ID)
        {
            var products = await _productService.GetByCategoryID(ID);
            return Ok(products);
        }

        /// <summary>
		/// <para>Метод для администратора</para>
		/// Добавление продукта без ИД в бд и возвращение его обратно
		/// </summary>
		/// <param name="product">Новый продукт</param>
		/// <returns>Продукт с новым ИД</returns>
        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody]Product product)
        {
            var productReturned = await _productService.Add(product);
            return Ok(productReturned);
        }

        /// <summary>
		/// <para>Метод для администратора</para>
		/// Изменение продукта и возвращение его обновленного
		/// </summary>
		/// <param name="product">Продукт для модификации в бд</param>
		/// <returns>Обновленный продукт</returns>
        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody]Product product)
        {
            var productReturned = await _productService.Update(product);
            return Ok(productReturned);
        }

        /// <summary>
		/// <para>Метод для администратора</para>
		/// Удаление продукта из БД
		/// </summary>
		/// <param name="ID">ИД продукта, который нужно удалить</param>
		/// <returns>Ничего</returns>
        [Authorize]
        [HttpDelete("{ID:guid}")]
        public async Task<IActionResult> Delete(Guid ID)
        {
            var product = await _productService.GetByID(ID);
            if (product != null && product.ImagePath != @"Resources\Images\default-tree.png")
            {
                System.IO.File.Delete(product.ImagePath);
            }
            await _productService.Delete(ID);
            return Ok();
        }

        /// <summary>
		/// <para>Метод для администратора</para>
		/// Загрузка изображения. Принимает изображение в виде
		/// файла и перемещает его в папку /Resources/Images/Product
		/// </summary>
		/// <returns>Путь к изображению</returns>
        [Authorize]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage()
        {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Resources", "Images", "Product");
            var path = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(path, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    stream.Close();
                }


                return Ok(new { dbPath });
            }
            return Ok();
        }
    }
}