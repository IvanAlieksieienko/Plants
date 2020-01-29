using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Plants.Core.Entities;
using Plants.Core.IServices;

namespace Plants.API.Controllers
{
    [Route("/product")]
    [ApiController]
    public class ProductController : Controller
    {
        private IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var products = _productService.GetAll();
            return Ok(products);
        }

        [HttpGet("{ID:guid}")]
        public IActionResult GetByID(Guid ID)
        {
            var product = _productService.GetByID(ID);
            return Ok(product);
        }

        [HttpGet("category/{ID:guid}")]
        public IActionResult GetByCategoryID(Guid ID)
        {
            var products = _productService.GetByCategoryID(ID);
            return Ok(products);
        }

        [Authorize]
        [HttpPost("add")]
        public IActionResult Add([FromBody]Product product)
        {
            var productReturned = _productService.Add(product);
            return Ok(productReturned);
        }

        [Authorize]
        [HttpPut("update")]
        public IActionResult Update([FromBody]Product product)
        {
            var productReturned = _productService.Update(product);
            return Ok(productReturned);
        }

        [Authorize]
        [HttpDelete("{ID:guid}")]
        public IActionResult Delete(Guid ID)
        {
            _productService.Delete(ID);
            return Ok();
        }
    }
}