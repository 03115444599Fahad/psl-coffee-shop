export const products = [
  // ================= COFFEE =================
  {
    id: 'coffee-001',
    name: 'Classic Double Espresso',
    category: 'Coffee',
    description: 'A bold, full-bodied double shot of freshly ground 100% Arabica beans with a rich golden crema.',
    longDescription: 'Pulled at precision temperature and pressure, our Classic Double Espresso delivers notes of dark chocolate, roasted hazelnut, and a clean caramel finish. Ideal for an instant energy boost.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    badge: 'Pure Energy',
    sizes: [
      { label: 'Single Shot', price: 280 },
      { label: 'Double Shot (Standard)', price: 350 }
    ]
  },
  {
    id: 'coffee-002',
    name: 'Caffè Americano',
    category: 'Coffee',
    description: 'Rich double espresso topped with hot filtered water for a smooth, clean cup of black coffee.',
    longDescription: 'Enjoy the complexity of espresso with the smooth sipping experience of filter coffee. Available hot or over ice at no extra charge.',
    price: 420,
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    sizes: [
      { label: 'Regular (8 oz)', price: 420 },
      { label: 'Large (12 oz)', price: 500 }
    ]
  },
  {
    id: 'coffee-003',
    name: 'Artisan Cappuccino',
    category: 'Coffee',
    description: 'Espresso balanced with steamed milk and a thick, velvety layer of micro-foam dusted with cocoa.',
    longDescription: 'Our signature Cappuccino combines a double ristretto shot with silky textured milk and airy foam. Topped with optional Belgian cocoa or cinnamon dust.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: true,
    badge: 'Bestseller',
    sizes: [
      { label: 'Regular (8 oz)', price: 520 },
      { label: 'Large (12 oz)', price: 620 }
    ]
  },
  {
    id: 'coffee-004',
    name: 'Caramel Café Latte',
    category: 'Coffee',
    description: 'Smooth espresso swirled with creamy steamed milk and house-made warm caramel drizzle.',
    longDescription: 'Crafted for those who love a creamy, comforting cup. Rich espresso meets velvety steamed milk, finished with our signature buttery caramel sauce.',
    price: 560,
    image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    sizes: [
      { label: 'Regular (8 oz)', price: 560 },
      { label: 'Large (12 oz)', price: 660 }
    ]
  },
  {
    id: 'coffee-005',
    name: 'Belgian Café Mocha',
    category: 'Coffee',
    description: 'Espresso blended with melted dark chocolate ganache, steamed milk, and whipped cream.',
    longDescription: 'Where rich coffee meets decadent chocolate. We melt dark Belgian chocolate into hot espresso before folding in steamed milk and a light crown of cream.',
    price: 600,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    sizes: [
      { label: 'Regular (8 oz)', price: 600 },
      { label: 'Large (12 oz)', price: 700 }
    ]
  },
  {
    id: 'coffee-006',
    name: 'Signature Frappe Cold Coffee',
    category: 'Coffee',
    description: 'Chilled double espresso blended with vanilla ice cream, milk, and chocolate swirl.',
    longDescription: 'The ultimate refresher for warm days. Blended thick with real espresso, full-cream milk, and a scoop of vanilla bean ice cream inside a chocolate-drizzled cup.',
    price: 620,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: true,
    badge: 'Customer Favorite',
    sizes: [
      { label: 'Regular (12 oz)', price: 620 },
      { label: 'Jumbo (16 oz)', price: 740 }
    ]
  },

  // ================= TEA =================
  {
    id: 'tea-001',
    name: 'Special Karak Doodh Patti',
    category: 'Tea',
    description: 'Traditional Pakistani tea slow-simmered in pure full-cream milk with crushed green cardamom.',
    longDescription: 'Our pride and joy! Premium Assam tea leaves brewed directly in rich, simmering milk with aromatic green elaichi until thick, golden, and deeply comforting.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: true,
    badge: 'House Special',
    sizes: [
      { label: 'RegularKulhar / Cup', price: 220 },
      { label: 'Large Mug', price: 300 },
      { label: 'Sharing Matka (Serves 2)', price: 420 }
    ]
  },
  {
    id: 'tea-002',
    name: 'Peshawari Kahwa (Green Tea)',
    category: 'Tea',
    description: 'Fragrant green tea infused with green cardamom, lemongrass, and a touch of honey.',
    longDescription: 'Light, soothing, and packed with antioxidants. Steeped fresh to order with whole cardamom pods and served with lemon wedges.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    sizes: [
      { label: 'Single Cup', price: 180 },
      { label: 'Teapot (Serves 2)', price: 320 }
    ]
  },
  {
    id: 'tea-003',
    name: 'Classic English Black Tea',
    category: 'Tea',
    description: 'Brisk, amber-colored whole-leaf black tea served plain, with lemon, or a splash of milk.',
    longDescription: 'A clean, aromatic cup of high-grown Ceylon & Assam black tea. Perfect for pairing with bakery biscuits or club sandwiches.',
    price: 170,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    sizes: [
      { label: 'Regular Cup', price: 170 },
      { label: 'Large Mug', price: 230 }
    ]
  },
  {
    id: 'tea-004',
    name: 'Kashmiri Pink Chai',
    category: 'Tea',
    description: 'Velvety pink tea brewed with star anise and topped generously with crushed pistachios and almonds.',
    longDescription: 'Hand-aerated for hours to achieve its signature rosy hue and rich creamy texture, garnished with roasted pistachios and slivered almonds.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    badge: 'Winter Favorite',
    sizes: [
      { label: 'Regular Cup', price: 320 },
      { label: 'Extra Nuts Cup', price: 380 }
    ]
  },
  {
    id: 'tea-005',
    name: 'Bombay Masala Chai',
    category: 'Tea',
    description: 'Spiced milk tea infused with fresh ginger, cinnamon bark, cloves, and black pepper.',
    longDescription: 'Warm and invigorating! Freshly grated ginger and roasted whole spices simmered with strong tea leaves and creamy milk.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    sizes: [
      { label: 'Regular Cup', price: 250 },
      { label: 'Large Mug', price: 320 }
    ]
  },

  // ================= CHIPS & SNACKS =================
  {
    id: 'snack-001',
    name: 'Hand-Cut Kettle Potato Chips',
    category: 'Chips & Snacks',
    description: 'Extra-crunchy artisanal potato chips tossed in your choice of Sea Salt, Peri-Peri, or Masala spice.',
    longDescription: 'Thinly sliced local potatoes batch-fried to golden perfection and seasoned while piping hot. Served with our signature garlic mayo dip.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: true,
    badge: 'Crispy & Fresh',
    sizes: [
      { label: 'Regular Bowl (Sea Salt)', price: 240 },
      { label: 'Regular Bowl (Peri-Peri)', price: 260 },
      { label: 'Sharing Basket + 2 Dips', price: 420 }
    ]
  },
  {
    id: 'snack-002',
    name: 'Loaded Cheese & Salsa Nachos',
    category: 'Chips & Snacks',
    description: 'Crispy tortilla chips smothered in warm cheddar cheese sauce, tangy salsa, and jalapeños.',
    longDescription: 'A crowd-pleasing snack platter layered with crunchy corn tortilla chips, melted nacho cheese, house pico de gallo salsa, pickled jalapeños, and sour cream.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    sizes: [
      { label: 'Regular Platter', price: 550 },
      { label: 'Add Grilled Chicken', price: 720 }
    ]
  },
  {
    id: 'snack-003',
    name: 'Golden Masala French Fries',
    category: 'Chips & Snacks',
    description: 'Crispy skin-on French fries dusted with house chaat masala and served with garlic mayo.',
    longDescription: 'Double-fried for a fluffy interior and shatteringly crisp exterior. Tossed in our tangy Lahori chaat masala blend or served classic salted.',
    price: 340,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    sizes: [
      { label: 'Regular Portion', price: 340 },
      { label: 'Large Bucket', price: 480 }
    ]
  },
  {
    id: 'snack-004',
    name: 'Artisan Bakery Butter Biscuits (6 Pcs)',
    category: 'Chips & Snacks',
    description: 'Freshly baked zeera, almond khatai, and chocolate chip butter biscuits—made for dunking in tea.',
    longDescription: 'An assorted plate of six melt-in-the-mouth bakery biscuits including roasted cumin (zeera), pistachio nan-khatai, and Belgian chocolate chip.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: false,
    sizes: [
      { label: 'Assorted Box (6 Pcs)', price: 280 },
      { label: 'Family Box (12 Pcs)', price: 520 }
    ]
  },
  {
    id: 'snack-005',
    name: 'Grilled Chicken Club Sandwich',
    category: 'Chips & Snacks',
    description: 'Triple-decker toasted sandwich with herb-grilled chicken, fried egg, cheddar cheese, and coleslaw.',
    longDescription: 'Our hearty triple-layer sandwich stacked with marinated grilled chicken breast, cheddar cheese, omelette, crisp lettuce, tomatoes, and accompanied by a side of potato chips.',
    price: 620,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    available: true,
    featured: true,
    badge: 'Hearty Meal',
    sizes: [
      { label: 'Half Club (2 Triangles)', price: 420 },
      { label: 'Full Club (4 Triangles + Chips)', price: 620 }
    ]
  },
  {
    id: 'snack-006',
    name: 'Fudgy Walnut Brownie',
    category: 'Chips & Snacks',
    description: 'Warm dark chocolate fudge brownie studded with roasted walnuts. Currently sold out for today.',
    longDescription: 'Baked in small batches every morning using rich cocoa and crunchy walnuts. Check back tomorrow morning for a fresh batch!',
    price: 380,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    available: false,
    featured: false,
    badge: 'Sold Out',
    sizes: [
      { label: 'Single Slice', price: 380 },
      { label: 'Warm with Ice Cream', price: 520 }
    ]
  }
];

