using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Plants.Core.Entities;
using Plants.Core.IServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plants.API.Controllers
{
	[Route("order")]
	[ApiController]
	public class OrderController : Controller
	{
		private IOrderService _orderService;

		public OrderController(IOrderService orderService)
		{
			this._orderService = orderService;
		}

		[HttpPost("add")]
		public async Task<IActionResult> Add([FromBody]Order order)
		{
			return Ok(await this._orderService.Add(order));
		}

		[Authorize]
		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await this._orderService.GetAll());
		}

		[Authorize]
		[HttpGet("{id:guid}")]
		public async Task<IActionResult> GetByID(Guid id)
		{
			return Ok(await this._orderService.GetByID(id));
		}

		[Authorize]
		[HttpPut("update")]
		public async Task<IActionResult> Update([FromBody] Order order)
		{
			return Ok(await this._orderService.Update(order));
		}

		[Authorize]
		[HttpDelete("{id:guid}")]
		public async Task<IActionResult> Delete(Guid id)
		{
			await this._orderService.Delete(id);
			return Ok();
		}

		[Authorize]
		[HttpGet("status/{id:guid}/{number:int}")]
		public async Task<IActionResult> UpdateStatus(Guid id, int number)
		{
			var order = await this._orderService.GetByID(id);
			order.Status = ((OrderStatus)number).ToString();
			return Ok(await this._orderService.Update(order));
		}
	}
}
