using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Plants.Core.Entities;
using Plants.Core.IRepositories;

namespace Plants.Infrastructure.Repositories
{
	public class OrderRepository : IOrderRepository<Order>
	{
		private string _connectionString;

		public OrderRepository(string connectionString)
		{
			this._connectionString = connectionString;
		}

		public async Task<Order> Add(Order order)
		{
			using (IDbConnection db = new SqlConnection(this._connectionString))
			{
				var sqlQuerry = @"INSERT INTO Order(ID,
									DateCreated,
									Status,
									FirstName,
									SecondName,
									Patronymic,
									Region,
									City,
									Street,
									AppartmentAddress,
									DeliveryType)
								VALUES (@ID,
									@DateCreated,
									@Status,
									@FirstName,
									@SecondName,
									@Patronymic,
									@Region,
									@City,
									@Street,
									@AppartmentAddress,
									@DeliveryType)";
				await db.ExecuteAsync(sqlQuerry, order);
				return await this.GetByID(order.ID);
			}
		}

		public async Task Delete(Guid? id)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				var sqlQuery = "DELETE FROM Order WHERE ID = @ID";
				await db.ExecuteAsync(sqlQuery, new { id });
			}
		}

		public async Task<ICollection<Order>> GetAll()
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				List<Order> orders = (await db.QueryAsync<Order>("SELECT * FROM Order")).ToList();
				return orders;
			}
		}

		public async Task<Order> GetByID(Guid? id)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				Order order = (await db.QueryAsync<Order>("SELECT * FROM Order WHERE ID = @id", new { id })).FirstOrDefault();
				return order;
			}
		}

		public async Task<Order> Update(Order order)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				var sqlQuerry = @"Update Order SET 
									DateCreated = @DateCreated,
									Status = @Status,
									FirstName = @FirstName,
									SecondName = @SecondName,
									Patronymic = @Patronymic,
									Region = @Region,
									City = @City,
									Street = @Street,
									AppartmentAddress = @AppartmentAddress,
									DeliveryType = @DeliveryType WHERE ID = @ID";
				await db.ExecuteAsync(sqlQuerry, order);
				return await this.GetByID(order.ID);
			}
		}
	}
}
