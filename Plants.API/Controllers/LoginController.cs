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
using Plants.Core.IServices;

namespace Plants.API.Controllers
{
    [Route("/login")]
    [ApiController]
    public class LoginController : Controller
    {
        private IAdminService _adminService;

        public LoginController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        public ActionResult Login()
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult Login(Admin admin)
        {
            if (!ModelState.IsValid)
            {
                return Ok(null);
            }
            Admin _admin = _adminService.GetByLoginPassword(admin.Login, admin.Password);
            if (_admin != null)
            {
                Authenticate(_admin.Login);
                return Ok(_admin);
            }
            ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            return Ok(_admin);
        }

        [HttpPut("cookiesAuthentication")]
        private void Authenticate(string login)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, login)
            };
            var id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}