using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Plants.Core.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plants.API.Controllers
{
	[Route("basket")]
	public class BasketController : Controller
	{
		private const string BasketKeyName = @"basket";
		private const string CountKey = @"count";

		[HttpGet]
		public async Task<IActionResult> GetAllItems()
		{
			var dictionary = this.GetAllCookies();
			ICollection<Basket> baskets = dictionary.Select(kv => new Basket(kv.Key ?? Guid.NewGuid(), kv.Value)).ToArray();
			return Ok(baskets);
		}

		[HttpGet("{id:Guid}")]
		public async Task<IActionResult> GetById(Guid id)
		{
			var dictionary = this.GetAllCookies();
			return Ok(new Basket(id, dictionary[id]));
		}

		[HttpGet("add/{productId:Guid}")]
		public async Task<IActionResult> Add(Guid productId)
		{
			var countOfProduct = this.GetCountOfProduct(productId);
			await this.Delete(productId);
			Response.Cookies.Append(this.GetIdString(productId, ++countOfProduct), BasketKeyName);
			return Ok();
		}

		[HttpGet("update/{productId:Guid}/{newCount:int}")]
		public async Task<IActionResult> Update(Guid productId, int newCount)
		{
			var currentCountOfProduct = this.GetCountOfProduct(productId);
			Response.Cookies.Delete(this.GetIdString(productId, currentCountOfProduct));
			Response.Cookies.Append(this.GetIdString(productId, newCount), BasketKeyName);
			return Ok();
		}

		[HttpDelete("{productId:Guid}")]
		public async Task<IActionResult> Delete(Guid productId)
		{
			var count = this.GetCountOfProduct(productId);
			Response.Cookies.Delete(this.GetIdString(productId, count));
			return Ok();
		}

		[HttpGet("test")]
		public async Task<IActionResult> Test()
		{
			return await this.Add(Guid.NewGuid());
		}

		[HttpGet("test1")]
		public async Task<IActionResult> Test1()
		{
			return Ok(Request.Cookies.Where(k => k.Value == "basket").Select(s => s.Key));
		}

		[HttpGet("test2")]
		public async Task<IActionResult> test2()
		{
			Response.Cookies.Delete("1787c4a7-d3ff-4382-9d0c-1647a93755b4");
			return Ok();
		}

		private Dictionary<Guid?, int> GetAllCookies()
		{
			var ids = Request.Cookies
				.Where(k => k.Value == BasketKeyName)
				.Select(s => ConvertStingToTuple(s.Key))
				.Where(k => k.id != null && k.count != 0)
				.ToDictionary(key => key.id, val => val.count);

			return ids;
		}

		private int GetCountOfProduct(Guid id)
		{
			var dictionary = this.GetAllCookies();
			if (!dictionary.ContainsKey(id)) return 0;
			return dictionary[id];
		}

		private (Guid? id, int count) ConvertStingToTuple(string key)
		{
			var startIndexOfCount = key.IndexOf(CountKey);
			if (startIndexOfCount == -1 || startIndexOfCount != 36) return (null, 0);
			var countString = key.Substring(startIndexOfCount + CountKey.Length);
			var guidString = key.Substring(0, startIndexOfCount);
			if (!int.TryParse(countString, out int countNumber)
				|| !Guid.TryParse(guidString, out Guid guid)) return (null, 0);
			return (guid, countNumber);
		}

		private string GetIdString(Guid id, int count) => id.ToString() + $"count{count}";
	}
}
