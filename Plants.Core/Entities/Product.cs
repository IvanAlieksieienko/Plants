using System;
using System.Collections.Generic;
using System.Text;

namespace Plants.Core.Entities
{
    public class Product
    {
        /// <summary>
		/// ИД продукта типа GUID
		/// </summary>
        public Guid ID { get; set; }
        /// <summary>
		/// ИД родительской категории продукта
		/// </summary>
        public Guid CategoryID { get; set; }
        /// <summary>
		/// Доступен или нет
		/// </summary>
        public bool IsAvailable { get; set; }
        /// <summary>
		/// Название продукта
		/// </summary>
        public string Name { get; set; }
        /// <summary>
		/// Описание продукта
		/// </summary>
        public string Description { get; set; }
        /// <summary>
		/// Картинка продукта (путь к ней)
		/// </summary>
        public string ImagePath { get; set; }
        /// <summary>
		/// Цена продукта
		/// </summary>
        public int Price { get; set; } 
    }
}
