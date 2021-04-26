using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Plants.Core.IRepositories
{
	public interface IOrderRepository<U> where U : class
	{
		Task<U> Add(U order);
		Task<ICollection<U>> GetAll();
		Task<U> GetByID(Guid? id);
		Task<U> Update(U order);
		Task Delete(Guid? id);
	}
}