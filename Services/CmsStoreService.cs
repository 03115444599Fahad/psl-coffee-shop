using System.Text.Json;
using PslCoffeeCms.Models;

namespace PslCoffeeCms.Services;

public class CmsStoreService
{
    private readonly string _filePath;
    private readonly object _lock = new();
    private CmsDatabase _db;

    public CmsStoreService(IWebHostEnvironment env)
    {
        var dataDir = Path.Combine(env.ContentRootPath, "App_Data");
        Directory.CreateDirectory(dataDir);
        _filePath = Path.Combine(dataDir, "cms_data.json");
        _db = LoadOrSeed();
    }

    public CmsDatabase GetDatabase()
    {
        lock (_lock)
        {
            return _db;
        }
    }

    public void SaveChanges()
    {
        lock (_lock)
        {
            var json = JsonSerializer.Serialize(_db, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }
    }

    public void ResetToDefaults()
    {
        lock (_lock)
        {
            _db = CreateSeedData();
            SaveChanges();
        }
    }

    private CmsDatabase LoadOrSeed()
    {
        if (File.Exists(_filePath))
        {
            try
            {
                var json = File.ReadAllText(_filePath);
                var data = JsonSerializer.Deserialize<CmsDatabase>(json);
                if (data != null && data.MenuItems.Count > 0)
                {
                    return data;
                }
            }
            catch
            {
                // Fall back to seed data
            }
        }

        var seed = CreateSeedData();
        var serialized = JsonSerializer.Serialize(seed, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(_filePath, serialized);
        return seed;
    }

    private static CmsDatabase CreateSeedData()
    {
        var db = new CmsDatabase
        {
            Settings = new SiteSettings(),
            Sliders = new List<SliderSlide>
            {
                new() { Id = "slide-1", DisplayOrder = 1, Badge = "PSL Coffee Bar • Pour, Sip & Leaf", Title = "Premium Coffee Experience", Subtitle = "Carefully prepared coffee with rich flavour, beautiful presentation and attention to every detail.", ImageUrl = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80" },
                new() { Id = "slide-2", DisplayOrder = 2, Badge = "Freshly Prepared Every Day", Title = "Delicious Food & Refreshments", Subtitle = "A delightful selection of breakfast, sandwiches, snacks, shakes and refreshing drinks.", ImageUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80" },
                new() { Id = "slide-3", DisplayOrder = 3, Badge = "Pour • Sip • Stay", Title = "Comfort & Good Vibes", Subtitle = "A welcoming atmosphere designed for conversations, relaxation and memorable moments.", ImageUrl = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80" },
                new() { Id = "slide-4", DisplayOrder = 4, Badge = "Our Everyday Promise", Title = "Passion for Quality", Subtitle = "We focus on quality ingredients, careful preparation and friendly service in every order.", ImageUrl = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80" }
            },
            Categories = new List<MenuCategory>
            {
                new() { Id = "Coffee", Name = "Coffee", Icon = "bi-cup-hot-fill", Description = "Espresso, Cappuccino, Latte, Flat White, Mocha, Caramel/Hazelnut/Vanilla Lattes, Cortado, Affogato & Hot Chocolate", DisplayOrder = 1 },
                new() { Id = "Iced Coffee", Name = "Iced Coffee", Icon = "bi-cup-straw", Description = "Chilled Iced Americano, Iced Spanish Latte, Iced Caramel, Hazelnut, Vanilla Latte & Iced Mocha", DisplayOrder = 2 },
                new() { Id = "Shakes", Name = "Shakes", Icon = "bi-lightning-charge-fill", Description = "Apple, Banana, Mango Shakes, Morning Power Shake (PSL), and Dates & Almond Shake", DisplayOrder = 3 },
                new() { Id = "Ice Cream Shakes", Name = "Ice Cream Shakes", Icon = "bi-snow2", Description = "Vanilla, Chocolate, Strawberry, and Oreo Ice Cream Shakes", DisplayOrder = 4 },
                new() { Id = "Margarita", Name = "Margarita", Icon = "bi-droplet-half", Description = "Mint Margarita, Strawberry Margarita, and Peach Margarita", DisplayOrder = 5 },
                new() { Id = "Iced Tea", Name = "Iced Tea", Icon = "bi-thermometer-snow", Description = "Peach Iced Tea, Lemon Iced Tea, and Strawberry Iced Tea", DisplayOrder = 6 },
                new() { Id = "Hot Tea", Name = "Hot Tea", Icon = "bi-cup-fill", Description = "Roasted Tea, Karak Chai, Green Tea, and Mint Tea", DisplayOrder = 7 },
                new() { Id = "Soups", Name = "Soups", Icon = "bi-fire", Description = "Hot & Sour Soup and Chicken Corn Soup", DisplayOrder = 8 },
                new() { Id = "Cold Sandwiches", Name = "Cold Sandwiches", Icon = "bi-layers-fill", Description = "Club Sandwich, Egg & Cheese, Plain Chicken, Vegetable, and PSL Sixer Sandwich", DisplayOrder = 9 },
                new() { Id = "Fries", Name = "Fries", Icon = "bi-basket-fill", Description = "French Fries, PSL Free Hit Loaded Fries, and Masala Fries", DisplayOrder = 10 },
                new() { Id = "Savouries", Name = "Savouries", Icon = "bi-basket2-fill", Description = "Chicken Stripes + Fries, 4 Spring Roll with Mint Sauce, and 4 Chicken & Jalapeño Samosa", DisplayOrder = 11 },
                new() { Id = "Breakfast", Name = "Breakfast", Icon = "bi-sunrise-fill", Description = "Plain, Vegetables & Mushroom Omelettes, French Toast, Sunny Eggs, Pan Cakes, and Waffles", DisplayOrder = 12 }
            },
            Deals = new List<SpecialDeal>
            {
                new()
                {
                    Id = "deal-001",
                    Title = "OFFICE DEAL",
                    Price = 1599,
                    Badge = "Complete Office Combo",
                    Items = new List<string> { "1 Coffee", "1 Sweet", "2 Mini Samosa (Chicken & Jalapeño)", "French Fries" },
                    Active = true
                },
                new()
                {
                    Id = "deal-002",
                    Title = "TEA BREAK DEAL",
                    Price = 1199,
                    Badge = "Best Value Tea Break",
                    Items = new List<string> { "2 Chicken & Jalapeño Samosa (Mini)", "Vegetable Spring Rolls (2 pcs)", "French Fries", "One Hot Coffee (Cappuccino)" },
                    Active = true
                }
            },
            MenuItems = new List<MenuItem>
            {
                // COFFEE
                new() { Id = "c-01", Name = "Americano", Category = "Coffee", Price = 499, Description = "Rich espresso shots topped with hot water for a smooth black coffee.", ImageUrl = "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-02", Name = "Cappuccino", Category = "Coffee", Price = 599, Description = "Espresso balanced with steamed milk and velvety micro-foam.", Featured = true, Badge = "Bestseller", ImageUrl = "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-03", Name = "Latte", Category = "Coffee", Price = 599, Description = "Smooth espresso combined with generous steamed milk.", ImageUrl = "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-04", Name = "Flat White", Category = "Coffee", Price = 599, Description = "Velvety micro-foamed milk poured over a bold double ristretto.", ImageUrl = "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-05", Name = "Mocha", Category = "Coffee", Price = 699, Description = "Rich espresso blended with decadent chocolate and steamed milk.", ImageUrl = "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-06", Name = "Caramel Latte", Category = "Coffee", Price = 650, Description = "Smooth espresso swirled with steamed milk and buttery caramel.", ImageUrl = "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-07", Name = "Hazelnut Latte", Category = "Coffee", Price = 650, Description = "Roasted hazelnut infused into smooth espresso and steamed milk.", ImageUrl = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-08", Name = "Vanilla Latte", Category = "Coffee", Price = 650, Description = "Classic espresso and steamed milk sweetened with vanilla.", ImageUrl = "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-09", Name = "Espresso (Single Shot)", Category = "Coffee", Price = 399, Description = "Pure, concentrated shot of freshly ground espresso.", ImageUrl = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-10", Name = "Macchiato", Category = "Coffee", Price = 450, Description = "Bold espresso shot marked with a dollop of foamed milk.", ImageUrl = "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-11", Name = "Piccolo", Category = "Coffee", Price = 499, Description = "Ristretto shot topped with warm silky milk.", ImageUrl = "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-12", Name = "Cortado", Category = "Coffee", Price = 499, Description = "Equal parts rich espresso and warm textured milk.", ImageUrl = "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-13", Name = "Affogato", Category = "Coffee", Price = 599, Description = "Creamy vanilla ice cream topped with a hot shot of espresso.", ImageUrl = "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-14", Name = "Extra Shot", Category = "Coffee", Price = 150, Description = "Add an extra freshly pulled espresso shot to any drink.", ImageUrl = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "c-15", Name = "Hot Chocolate", Category = "Coffee", Price = 699, Description = "Velvety steamed milk blended with rich cocoa.", ImageUrl = "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80" },

                // ICED COFFEE
                new() { Id = "ic-01", Name = "Iced Americano", Category = "Iced Coffee", Price = 599, Description = "Freshly pulled espresso poured over chilled water and ice.", ImageUrl = "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ic-02", Name = "Iced Hazelnut Latte", Category = "Iced Coffee", Price = 699, Description = "Chilled milk and bold espresso with roasted hazelnut over ice.", ImageUrl = "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ic-03", Name = "Iced Vanilla Latte", Category = "Iced Coffee", Price = 699, Description = "Rich espresso, cold milk, and sweet vanilla syrup over ice.", ImageUrl = "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ic-04", Name = "Iced Spanish Latte", Category = "Iced Coffee", Price = 699, Description = "Signature sweetened condensed milk & fresh milk iced espresso latte.", Featured = true, Badge = "Signature", ImageUrl = "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ic-05", Name = "Iced Caramel Latte", Category = "Iced Coffee", Price = 699, Description = "Chilled espresso and milk swirled with golden caramel sauce.", ImageUrl = "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ic-06", Name = "Iced Mocha", Category = "Iced Coffee", Price = 699, Description = "Espresso, rich chocolate ganache, and cold milk over ice.", ImageUrl = "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80" },

                // SHAKES
                new() { Id = "sh-01", Name = "Apple Shake", Category = "Shakes", Price = 750, Description = "Fresh crisp apples blended with chilled full-cream milk.", ImageUrl = "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sh-02", Name = "Banana Shake", Category = "Shakes", Price = 750, Description = "Ripe bananas blended thick with chilled creamy milk.", ImageUrl = "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sh-03", Name = "Mango Shake", Category = "Shakes", Price = 750, Description = "Sweet mango blended with chilled full-cream milk.", ImageUrl = "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sh-04", Name = "Morning Power Shake (PSL)", Category = "Shakes", Price = 999, Description = "Banana + Dates + Almond + Cashew + Walnut + Milk / Breakfast-energy shake.", Featured = true, Badge = "PSL Power", ImageUrl = "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sh-05", Name = "Dates and Almond Shake", Category = "Shakes", Price = 800, Description = "Rich dates and crunchy almonds blended with chilled milk.", ImageUrl = "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80" },

                // ICE CREAM SHAKES
                new() { Id = "ics-01", Name = "Vanilla Ice Cream Shake", Category = "Ice Cream Shakes", Price = 499, Description = "Thick and creamy vanilla bean ice cream shake.", ImageUrl = "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ics-02", Name = "Chocolate Ice Cream Shake", Category = "Ice Cream Shakes", Price = 499, Description = "Decadent chocolate ice cream blended with milk.", ImageUrl = "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ics-03", Name = "Strawberry Ice Cream Shake", Category = "Ice Cream Shakes", Price = 499, Description = "Creamy strawberry ice cream blended with milk.", ImageUrl = "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ics-04", Name = "Oreo Ice Cream Shake", Category = "Ice Cream Shakes", Price = 699, Description = "Crunchy Oreo cookies blended with vanilla ice cream and milk.", ImageUrl = "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80" },

                // MARGARITA
                new() { Id = "mg-01", Name = "Mint Margarita", Category = "Margarita", Price = 599, Description = "Fresh garden mint leaves, zesty lime juice, crushed ice, and soda.", Featured = true, Badge = "Refresher", ImageUrl = "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "mg-02", Name = "Strawberry Margarita", Category = "Margarita", Price = 699, Description = "Sweet strawberry blended with lime, crushed ice, and fizz.", ImageUrl = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "mg-03", Name = "Peach Margarita", Category = "Margarita", Price = 699, Description = "Juicy peach nectar blended with lime, mint, and crushed ice.", ImageUrl = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80" },

                // ICED TEA
                new() { Id = "it-01", Name = "Peach Iced Tea", Category = "Iced Tea", Price = 599, Description = "Chilled brewed tea infused with sweet peach flavour over ice.", ImageUrl = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "it-02", Name = "Lemon Iced Tea", Category = "Iced Tea", Price = 499, Description = "Crisp black tea chilled over ice with fresh lemon.", ImageUrl = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "it-03", Name = "Strawberry Iced Tea", Category = "Iced Tea", Price = 599, Description = "Freshly brewed iced tea infused with strawberry essence.", ImageUrl = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80" },

                // HOT TEA
                new() { Id = "ht-01", Name = "Roasted Tea", Category = "Hot Tea", Price = 350, Description = "Deep, caramelized roasted tea leaves simmered to perfection.", ImageUrl = "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ht-02", Name = "Karak Chai", Category = "Hot Tea", Price = 200, Description = "Traditional strong slow-simmered milk tea with green cardamom.", Featured = true, Badge = "House Special", ImageUrl = "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ht-03", Name = "Green Tea", Category = "Hot Tea", Price = 180, Description = "Soothing green tea steeped with cardamom.", ImageUrl = "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "ht-04", Name = "Mint Tea", Category = "Hot Tea", Price = 180, Description = "Refreshing herbal infusion steeped with fresh mint leaves.", ImageUrl = "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80" },

                // SOUPS
                new() { Id = "sp-01", Name = "Hot & Sour Soup", Category = "Soups", Price = 499, Description = "Tangy, spicy broth loaded with shredded chicken, vegetables, and egg.", ImageUrl = "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sp-02", Name = "Chicken Corn Soup", Category = "Soups", Price = 499, Description = "Comforting chicken broth simmered with sweet corn, chicken, and egg drop.", ImageUrl = "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80" },

                // COLD SANDWICHES
                new() { Id = "sw-01", Name = "Club Sandwich", Category = "Cold Sandwiches", Price = 750, Description = "Triple-decker sandwich with chicken, egg, cheese, lettuce, and mayo.", Featured = true, Badge = "Chef Special", ImageUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sw-02", Name = "Egg and Cheese Sandwich", Category = "Cold Sandwiches", Price = 450, Description = "Soft bread layered with seasoned egg and cheddar cheese.", ImageUrl = "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sw-03", Name = "Plain Chicken Sandwich", Category = "Cold Sandwiches", Price = 420, Description = "Shredded tender chicken in seasoned mayo between soft bread.", ImageUrl = "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sw-04", Name = "Vegetable Sandwich", Category = "Cold Sandwiches", Price = 350, Description = "Fresh cucumber, tomatoes, coleslaw, and herb spread.", ImageUrl = "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sw-05", Name = "PSL Sixer Sandwich", Category = "Cold Sandwiches", Price = 499, Description = "Signature PSL house sandwich packed with chicken, cheese, and special sauce.", Badge = "PSL Special", ImageUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80" },

                // FRIES
                new() { Id = "fr-01", Name = "French Fries", Category = "Fries", Price = 499, Description = "Crispy golden salted potato fries served hot.", ImageUrl = "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "fr-02", Name = "PSL Free Hit Loaded Fries", Category = "Fries", Price = 599, Description = "Golden fries loaded with cheese sauce, signature drizzle, and jalapeños.", Badge = "PSL Signature", ImageUrl = "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "fr-03", Name = "Masala Fries", Category = "Fries", Price = 530, Description = "Crispy fries tossed in our zesty chaat masala spice blend.", ImageUrl = "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80" },

                // SAVOURIES
                new() { Id = "sv-01", Name = "Chicken Stripes + Fries", Category = "Savouries", Price = 699, Description = "Crispy breaded chicken strips served with hot French fries.", ImageUrl = "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sv-02", Name = "4 Spring Roll with Mint Sauce", Category = "Savouries", Price = 599, Description = "4 crispy golden rolls served with fresh mint sauce.", ImageUrl = "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "sv-03", Name = "4 Chicken & Jalapeño Samosa", Category = "Savouries", Price = 699, Description = "4 crispy samosas filled with spiced minced chicken and jalapeños.", ImageUrl = "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80" },

                // BREAKFAST
                new() { Id = "bf-01", Name = "Plain Omelette", Category = "Breakfast", Price = 699, Description = "Fluffy farm-fresh eggs seasoned with salt and black pepper.", ImageUrl = "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "bf-02", Name = "Vegetables Omelette", Category = "Breakfast", Price = 750, Description = "Fluffy omelette loaded with tomatoes, onions, bell peppers, and herbs.", ImageUrl = "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "bf-03", Name = "French Toast", Category = "Breakfast", Price = 699, Description = "Golden brioche slices dipped in cinnamon-vanilla egg batter.", ImageUrl = "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "bf-04", Name = "Sunny Eggs", Category = "Breakfast", Price = 599, Description = "Sunny-side-up eggs with runny golden yolks.", ImageUrl = "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "bf-05", Name = "Mushroom Omelette", Category = "Breakfast", Price = 899, Description = "Savory omelette folded with sautéed mushrooms and melted cheese.", ImageUrl = "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "bf-06", Name = "Pan Cakes", Category = "Breakfast", Price = 699, Description = "Stack of fluffy golden pancakes served with butter and syrup.", ImageUrl = "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80" },
                new() { Id = "bf-07", Name = "Waffles", Category = "Breakfast", Price = 730, Description = "Crispy golden Belgian waffles with sweet toppings.", ImageUrl = "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80" }
            }
        };

        return db;
    }
}
