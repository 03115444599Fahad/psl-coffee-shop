using Microsoft.AspNetCore.Mvc;
using PslCoffeeCms.Models;
using PslCoffeeCms.Services;

namespace PslCoffeeCms.Controllers;

public class AdminController : Controller
{
    private readonly CmsStoreService _store;
    private const string AuthCookieName = "PslCmsAdminAuth";

    public AdminController(CmsStoreService store)
    {
        _store = store;
    }

    private bool IsAuthenticated()
    {
        return Request.Cookies.TryGetValue(AuthCookieName, out var val) && val == "authenticated";
    }

    [HttpGet]
    public IActionResult Login()
    {
        if (IsAuthenticated())
        {
            return RedirectToAction(nameof(Index));
        }
        return View(_store.GetDatabase().Settings);
    }

    [HttpPost]
    public IActionResult Login(string username, string password)
    {
        var settings = _store.GetDatabase().Settings;
        if (string.Equals(username, settings.AdminUsername, StringComparison.OrdinalIgnoreCase) &&
            password == settings.AdminPassword)
        {
            Response.Cookies.Append(AuthCookieName, "authenticated", new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });
            TempData["Success"] = "Welcome to the PSL Coffee Bar CMS Dashboard!";
            return RedirectToAction(nameof(Index));
        }

        ViewBag.Error = "Invalid username or password. Default is admin / psl123";
        return View(settings);
    }

    public IActionResult Logout()
    {
        Response.Cookies.Delete(AuthCookieName);
        return RedirectToAction(nameof(Login));
    }

    public IActionResult Index(string tab = "menu", string? editId = null)
    {
        if (!IsAuthenticated())
        {
            return RedirectToAction(nameof(Login));
        }

        var db = _store.GetDatabase();
        ViewBag.ActiveTab = tab;
        ViewBag.EditItem = editId != null ? db.MenuItems.FirstOrDefault(x => x.Id == editId) : null;
        return View(db);
    }

    [HttpPost]
    public IActionResult SaveSettings(SiteSettings updated)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        db.Settings.CompanyName = updated.CompanyName ?? "PSL Coffee Bar";
        db.Settings.BrandFull = updated.BrandFull ?? "Pour, Sip & Leaf Coffee Shop";
        db.Settings.Tagline = updated.Tagline ?? "";
        db.Settings.Phone = updated.Phone ?? "03400440463";
        db.Settings.WhatsAppNumber = updated.WhatsAppNumber ?? "923400440463";
        db.Settings.Currency = updated.Currency ?? "Rs.";
        db.Settings.Address = updated.Address ?? "";
        db.Settings.AboutTitle = updated.AboutTitle ?? "";
        db.Settings.AboutParagraph1 = updated.AboutParagraph1 ?? "";
        db.Settings.AboutParagraph2 = updated.AboutParagraph2 ?? "";
        db.Settings.AboutParagraph3 = updated.AboutParagraph3 ?? "";
        if (!string.IsNullOrWhiteSpace(updated.AdminUsername))
            db.Settings.AdminUsername = updated.AdminUsername;
        if (!string.IsNullOrWhiteSpace(updated.AdminPassword))
            db.Settings.AdminPassword = updated.AdminPassword;

        _store.SaveChanges();
        TempData["Success"] = "Company Branding, About Us & Contact Settings updated!";
        return RedirectToAction(nameof(Index), new { tab = "settings" });
    }

    [HttpPost]
    public IActionResult SaveMenuItem(MenuItem item)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        var existing = db.MenuItems.FirstOrDefault(x => x.Id == item.Id);
        if (existing != null)
        {
            existing.Name = item.Name;
            existing.Category = item.Category;
            existing.Price = item.Price;
            existing.Description = item.Description ?? "";
            existing.ImageUrl = string.IsNullOrWhiteSpace(item.ImageUrl)
                ? "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
                : item.ImageUrl;
            existing.Badge = item.Badge;
            existing.Featured = item.Featured;
            existing.Available = item.Available;
            TempData["Success"] = $"Updated menu item '{item.Name}'.";
        }
        else
        {
            item.Id = Guid.NewGuid().ToString("N")[..8];
            if (string.IsNullOrWhiteSpace(item.ImageUrl))
                item.ImageUrl = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80";
            db.MenuItems.Add(item);
            TempData["Success"] = $"Added new menu item '{item.Name}'.";
        }

        _store.SaveChanges();
        return RedirectToAction(nameof(Index), new { tab = "menu" });
    }

    [HttpPost]
    public IActionResult DeleteMenuItem(string id)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        var item = db.MenuItems.FirstOrDefault(x => x.Id == id);
        if (item != null)
        {
            db.MenuItems.Remove(item);
            _store.SaveChanges();
            TempData["Success"] = $"Deleted '{item.Name}'.";
        }
        return RedirectToAction(nameof(Index), new { tab = "menu" });
    }

    [HttpPost]
    public IActionResult ToggleAvailability(string id)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        var item = db.MenuItems.FirstOrDefault(x => x.Id == id);
        if (item != null)
        {
            item.Available = !item.Available;
            _store.SaveChanges();
            TempData["Success"] = $"'{item.Name}' availability set to {(item.Available ? "In Stock" : "Sold Out")}.";
        }
        return RedirectToAction(nameof(Index), new { tab = "menu" });
    }

    [HttpPost]
    public IActionResult SaveCategory(MenuCategory category)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        var id = string.IsNullOrWhiteSpace(category.Id) ? category.Name.Trim() : category.Id.Trim();
        var existing = db.Categories.FirstOrDefault(x => x.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
        if (existing != null)
        {
            existing.Name = category.Name;
            existing.Icon = string.IsNullOrWhiteSpace(category.Icon) ? "bi-cup-hot-fill" : category.Icon;
            existing.Description = category.Description ?? "";
            existing.DisplayOrder = category.DisplayOrder;
        }
        else
        {
            category.Id = category.Name.Trim();
            if (string.IsNullOrWhiteSpace(category.Icon)) category.Icon = "bi-cup-hot-fill";
            db.Categories.Add(category);
        }

        _store.SaveChanges();
        TempData["Success"] = $"Saved category '{category.Name}'.";
        return RedirectToAction(nameof(Index), new { tab = "categories" });
    }

    [HttpPost]
    public IActionResult DeleteCategory(string id)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        var cat = db.Categories.FirstOrDefault(x => x.Id == id);
        if (cat != null)
        {
            db.Categories.Remove(cat);
            _store.SaveChanges();
            TempData["Success"] = $"Removed category '{cat.Name}'.";
        }
        return RedirectToAction(nameof(Index), new { tab = "categories" });
    }

    [HttpPost]
    public IActionResult SaveSlider(SliderSlide slide)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        var existing = db.Sliders.FirstOrDefault(x => x.Id == slide.Id);
        if (existing != null)
        {
            existing.Title = slide.Title;
            existing.Subtitle = slide.Subtitle;
            existing.Badge = slide.Badge ?? "PSL Coffee Bar";
            existing.ImageUrl = slide.ImageUrl;
            existing.DisplayOrder = slide.DisplayOrder;
        }
        else
        {
            slide.Id = Guid.NewGuid().ToString("N")[..8];
            db.Sliders.Add(slide);
        }

        _store.SaveChanges();
        TempData["Success"] = $"Saved slider '{slide.Title}'.";
        return RedirectToAction(nameof(Index), new { tab = "sliders" });
    }

    [HttpPost]
    public IActionResult DeleteSlider(string id)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        var slide = db.Sliders.FirstOrDefault(x => x.Id == id);
        if (slide != null)
        {
            db.Sliders.Remove(slide);
            _store.SaveChanges();
            TempData["Success"] = $"Deleted slider '{slide.Title}'.";
        }
        return RedirectToAction(nameof(Index), new { tab = "sliders" });
    }

    [HttpPost]
    public IActionResult SaveDeal(string? id, string title, decimal price, string badge, string itemsMultiline, bool active = true)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        var parsedItems = (itemsMultiline ?? "")
            .Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries)
            .Select(x => x.Trim().TrimStart('✓', '-', '•').Trim())
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .ToList();

        var existing = db.Deals.FirstOrDefault(x => x.Id == id);
        if (existing != null)
        {
            existing.Title = title;
            existing.Price = price;
            existing.Badge = badge ?? "Special Deal";
            existing.Items = parsedItems;
            existing.Active = active;
        }
        else
        {
            db.Deals.Add(new SpecialDeal
            {
                Id = Guid.NewGuid().ToString("N")[..8],
                Title = title,
                Price = price,
                Badge = badge ?? "Special Deal",
                Items = parsedItems,
                Active = active
            });
        }

        _store.SaveChanges();
        TempData["Success"] = $"Saved deal '{title}'.";
        return RedirectToAction(nameof(Index), new { tab = "deals" });
    }

    [HttpPost]
    public IActionResult DeleteDeal(string id)
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        var db = _store.GetDatabase();
        var deal = db.Deals.FirstOrDefault(x => x.Id == id);
        if (deal != null)
        {
            db.Deals.Remove(deal);
            _store.SaveChanges();
            TempData["Success"] = $"Removed deal '{deal.Title}'.";
        }
        return RedirectToAction(nameof(Index), new { tab = "deals" });
    }

    [HttpPost]
    public IActionResult ResetDefaults()
    {
        if (!IsAuthenticated()) return RedirectToAction(nameof(Login));

        _store.ResetToDefaults();
        TempData["Success"] = "CMS database reset to original PSL Web publish.doc defaults!";
        return RedirectToAction(nameof(Index));
    }
}
