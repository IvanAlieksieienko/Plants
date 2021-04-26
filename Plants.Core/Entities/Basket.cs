using System;
namespace Plants.Core.Entities
{
	public class Basket
	{
		public Guid ProductId { get; set; }
		public int Count { get; set; }

		public Basket(Guid productId, int count)
		{
			this.ProductId = productId;
			this.Count = count;
		}
	}
}
