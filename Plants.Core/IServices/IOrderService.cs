using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Plants.Core.Entities;

namespace Plants.Core.IServices
{
	public interface IOrderService
	{
		Task<Order> Add(Order order);
		Task<ICollection<Order>> GetAll();
		Task<Order> GetByID(Guid? ID);
		Task<Order> Update(Order order);
		Task Delete(Guid? ID);
	}
}
