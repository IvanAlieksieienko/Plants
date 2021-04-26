using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Plants.Core.Entities;
using Plants.Core.IRepositories;
using Plants.Core.IServices;

namespace Plants.Core.Services
{
	public class OrderService : IOrderService
	{
		private IOrderRepository<Order> _orderRepository;

		public OrderService(IOrderRepository<Order> orderRepository) => this._orderRepository = orderRepository;

		public async Task<Order> Add(Order order)
		{
			order.ID = Guid.NewGuid();
			return await this._orderRepository.Add(order);
		}

		public async Task Delete(Guid? ID)
		{
			await this._orderRepository.Delete(ID);
		}

		public async Task<ICollection<Order>> GetAll()
		{
			return await this._orderRepository.GetAll();
		}

		public async Task<Order> GetByID(Guid? ID)
		{
			return await this._orderRepository.GetByID(ID);
		}

		public async Task<Order> Update(Order order)
		{
			return await this._orderRepository.Update(order);
		}
	}
}
