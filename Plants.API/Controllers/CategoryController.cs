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
    [Route("category")]
    [ApiController]
    public class CategoryController : Controller
    {
        private ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var categorys = await _categoryService.GetAll();
            return Ok(categorys);
        }

        [HttpGet("{ID:guid}")]
        public async Task<IActionResult> GetByID(Guid ID)
        {
            var category = await _categoryService.GetByID(ID);
            return Ok(category);
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody]Category category)
        {
            var categoryReturned = await _categoryService.Add(category);
            return Ok(categoryReturned);
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody]Category category)
        {
            var categoryReturned = await _categoryService.Update(category);
            return Ok(categoryReturned);
        }

        [Authorize]
        [HttpDelete("{ID:guid}")]
        public async Task<IActionResult> Delete(Guid ID)
        {
            await _categoryService.Delete(ID);
            return Ok();
        }
    }
}