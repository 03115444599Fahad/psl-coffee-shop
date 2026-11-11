using System.ComponentModel.DataAnnotations;

namespace PslCoffeeCms.Models;

public class SiteSettings
{
    [Required]
    public string CompanyName { get; set; } = "PSL Coffee Bar";
    public string BrandFull { get; set; } = "Pour, Sip & Leaf Coffee Shop";
    public string Tagline { get; set; } = "Pour • Sip • Stay — Welcome to PSL, Your Everyday Cafe";
    public string LogoUrl { get; set; } = "/logo.png";
    public string Phone { get; set; } = "03400440463";
    public string WhatsAppNumber { get; set; } = "923400440463";
    public string Currency { get; set; } = "Rs.";
    public string Address { get; set; } = "PSL Coffee Bar — Pour, Sip & Leaf, Pakistan";
    public string AboutTitle { get; set; } = "Welcome to PSL – Your Everyday Cafe";
    public string AboutParagraph1 { get; set; } = "At PSL, we believe that great coffee is more than just a drink – it's an experience, a moment of relaxation and a reason to smile.";
    public string AboutParagraph2 { get; set; } = "Our journey is inspired by a passion for premium coffee, delicious food and the simple pleasure of bringing people together. We aim to create a welcoming space where every cup tells a story, every flavour creates a memory and every visit feels special.";
    public string AboutParagraph3 { get; set; } = "From rich, freshly prepared Espresso and creamy Cappuccino to our signature Spanish Lattes, refreshing Margaritas, flavorful shakes and delicious food, we bring together quality, taste and creativity under one roof.";
    public string AdminUsername { get; set; } = "admin";
    public string AdminPassword { get; set; } = "psl123";
}

public class SliderSlide
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public string Subtitle { get; set; } = string.Empty;
    public string Badge { get; set; } = "PSL Coffee Bar • Pour, Sip & Leaf";
    public string ImageUrl { get; set; } = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80";
    public int DisplayOrder { get; set; } = 1;
}

public class MenuCategory
{
    public string Id { get; set; } = string.Empty;
    [Required]
    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = "bi-cup-hot-fill";
    public string Description { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 1;
}

public class MenuItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Category { get; set; } = "Coffee";
    public string Description { get; set; } = string.Empty;
    [Range(0, 100000)]
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80";
    public bool Available { get; set; } = true;
    public bool Featured { get; set; } = false;
    public string? Badge { get; set; }
}

public class SpecialDeal
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];
    [Required]
    public string Title { get; set; } = string.Empty;
    [Range(0, 100000)]
    public decimal Price { get; set; }
    public string Badge { get; set; } = "Special Deal";
    public List<string> Items { get; set; } = new();
    public bool Active { get; set; } = true;
}

public class CmsDatabase
{
    public SiteSettings Settings { get; set; } = new();
    public List<SliderSlide> Sliders { get; set; } = new();
    public List<MenuCategory> Categories { get; set; } = new();
    public List<MenuItem> MenuItems { get; set; } = new();
    public List<SpecialDeal> Deals { get; set; } = new();
}
