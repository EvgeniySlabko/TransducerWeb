using System;
using System.IO;
using AutoMapper;
using BundleServer.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace TicketManagement.MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment _environment;

        public HomeController(IWebHostEnvironment env)
        {
            _environment = env ?? throw new ArgumentNullException(nameof(env));
        }

        public ActionResult Index()
        {
            string path = Path.Combine(_environment.WebRootPath, "index.html");
            var html = System.IO.File.ReadAllText(path);

            return Content(html, "text/html");
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
