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
        public IActionResult GetAll()
        {
            var categorys = _categoryService.GetAll();
            return Ok(categorys);
        }

        [HttpGet("{ID:guid}")]
        public IActionResult GetByID(Guid ID)
        {
            var category = _categoryService.GetByID(ID);
            return Ok(category);
        }

        [Authorize]
        [HttpPost("add")]
        public IActionResult Add([FromBody]Category category)
        {
            var categoryReturned = _categoryService.Add(category);
            return Ok(categoryReturned);
        }

        [Authorize]
        [HttpPut("update")]
        public IActionResult Update([FromBody]Category category)
        {
            var categoryReturned = _categoryService.Update(category);
            return Ok(categoryReturned);
        }

        [Authorize]
        [HttpDelete("{ID:guid}")]
        public IActionResult Delete(Guid ID)
        {
            _categoryService.Delete(ID);
            return Ok();
        }
    }
}