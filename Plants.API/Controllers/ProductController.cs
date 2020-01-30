﻿using System;
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
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAll();
            return Ok(products);
        }

        [HttpGet("{ID:guid}")]
        public async Task<IActionResult> GetByID(Guid ID)
        {
            var product = await _productService.GetByID(ID);
            return Ok(product);
        }

        [HttpGet("category/{ID:guid}")]
        public async Task<IActionResult> GetByCategoryID(Guid ID)
        {
            var products = await _productService.GetByCategoryID(ID);
            return Ok(products);
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody]Product product)
        {
            var productReturned = await _productService.Add(product);
            return Ok(productReturned);
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody]Product product)
        {
            var productReturned = await _productService.Update(product);
            return Ok(productReturned);
        }

        [Authorize]
        [HttpDelete("{ID:guid}")]
        public async Task<IActionResult> Delete(Guid ID)
        {
            await _productService.Delete(ID);
            return Ok();
        }
    }
}