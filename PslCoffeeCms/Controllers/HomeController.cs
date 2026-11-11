using Microsoft.AspNetCore.Mvc;
using PslCoffeeCms.Models;
using PslCoffeeCms.Services;

namespace PslCoffeeCms.Controllers;

public class HomeController : Controller
{
    private readonly CmsStoreService _store;

    public HomeController(CmsStoreService store)
    {
        _store = store;
    }

    public IActionResult Index()
    {
        var db = _store.GetDatabase();
        return View(db);
    }

    public IActionResult Menu(string? category, string? q)
    {
        var db = _store.GetDatabase();
        ViewBag.SelectedCategory = string.IsNullOrWhiteSpace(category) ? "All" : category;
        ViewBag.SearchQuery = q ?? string.Empty;
        return View(db);
    }

    public IActionResult About()
    {
        var db = _store.GetDatabase();
        return View(db);
    }

    public IActionResult Contact()
    {
        var db = _store.GetDatabase();
        return View(db);
    }

    [HttpGet("/api/cms/status")]
    public IActionResult ApiStatus()
    {
        var db = _store.GetDatabase();
        return Json(new
        {
            companyName = db.Settings.CompanyName,
            phone = db.Settings.Phone,
            whatsapp = db.Settings.WhatsAppNumber,
            logoUrl = db.Settings.LogoUrl,
            menuItemCount = db.MenuItems.Count,
            categoryCount = db.Categories.Count,
            sliderCount = db.Sliders.Count,
            dealCount = db.Deals.Count,
            hasAboutUs = !string.IsNullOrWhiteSpace(db.Settings.AboutParagraph1)
        });
    }
}
