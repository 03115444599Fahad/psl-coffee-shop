export const shopConfig = {
  name: 'PSL Coffee Bar',
  brandFull: 'Pour, Sip & Leaf Coffee Shop',
  tagline: 'Pour • Sip • Stay — Welcome to PSL, Your Everyday Cafe',
  logo: '/logo.png',
  whatsappNumber: '923400440463', // International format without '+' for 03400440463
  phoneDisplay: '03400440463',
  email: 'info@pslcoffeebar.pk',
  address: 'PSL Coffee Bar — Pour, Sip & Leaf, Pakistan',
  mapUrl: 'https://maps.google.com/?q=PSL+Coffee+Bar',
  currency: 'Rs.',
  deliveryFee: 150,
  freeDeliveryThreshold: 1500,
  openingHours: [
    { days: 'Monday – Thursday', hours: '8:00 AM – 11:30 PM' },
    { days: 'Friday', hours: '8:00 AM – 1:00 AM (Break 1:00 – 2:30 PM)' },
    { days: 'Saturday – Sunday', hours: '9:00 AM – 1:00 AM' }
  ]
};

export const heroSlides = [
  {
    id: 'slide-1',
    badge: 'PSL Coffee Bar • Pour, Sip & Leaf',
    title: 'Premium Coffee Experience',
    subtitle: 'Carefully prepared coffee with rich flavour, beautiful presentation and attention to every detail.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    ctaText: 'Explore Coffee',
    ctaLink: '/menu?category=Coffee'
  },
  {
    id: 'slide-2',
    badge: 'Freshly Prepared Every Day',
    title: 'Delicious Food & Refreshments',
    subtitle: 'A delightful selection of breakfast, sandwiches, snacks, shakes and refreshing drinks.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80',
    ctaText: 'Browse Full Menu',
    ctaLink: '/menu'
  },
  {
    id: 'slide-3',
    badge: 'Pour • Sip • Stay',
    title: 'Comfort & Good Vibes',
    subtitle: 'A welcoming atmosphere designed for conversations, relaxation and memorable moments.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    ctaText: 'About Our Cafe',
    ctaLink: '/about'
  },
  {
    id: 'slide-4',
    badge: 'Our Everyday Promise',
    title: 'Passion for Quality',
    subtitle: 'We focus on quality ingredients, careful preparation and friendly service in every order.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    ctaText: 'Order on WhatsApp',
    ctaLink: '/cart'
  }
];

export const categories = [
  {
    id: 'All',
    name: 'All Items',
    icon: 'bi-grid-fill',
    description: 'Browse our complete selection of freshly brewed coffees, shakes, teas, breakfast, sandwiches, and deals.'
  },
  {
    id: 'Coffee',
    name: 'Coffee',
    icon: 'bi-cup-hot-fill',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    description: 'Rich Espresso, Cappuccino, Latte, Flat White, Mocha, Caramel/Hazelnut/Vanilla Lattes, Cortado, Affogato & Hot Chocolate.'
  },
  {
    id: 'Iced Coffee',
    name: 'Iced Coffee',
    icon: 'bi-cup-straw',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    description: 'Chilled Iced Americano, signature Iced Spanish Latte, Iced Caramel, Hazelnut, Vanilla Latte & Iced Mocha.'
  },
  {
    id: 'Shakes',
    name: 'Shakes',
    icon: 'bi-lightning-charge-fill',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh Apple, Banana & Mango Shakes, Dates & Almond Shake, and our signature Morning Power Shake (PSL).'
  },
  {
    id: 'Ice Cream Shakes',
    name: 'Ice Cream Shakes',
    icon: 'bi-snow2',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    description: 'Creamy Vanilla, Chocolate, Strawberry, and decadent Oreo Ice Cream Shakes.'
  },
  {
    id: 'Margarita',
    name: 'Margarita',
    icon: 'bi-droplet-half',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    description: 'Refreshing Mint Margarita, Strawberry Margarita, and Peach Margarita.'
  },
  {
    id: 'Iced Tea',
    name: 'Iced Tea',
    icon: 'bi-thermometer-snow',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    description: 'Chilled Peach Iced Tea, Lemon Iced Tea, and Strawberry Iced Tea.'
  },
  {
    id: 'Hot Tea',
    name: 'Hot Tea',
    icon: 'bi-cup-fill',
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80',
    description: 'Warming Roasted Tea, traditional Karak Chai, soothing Green Tea, and fresh Mint Tea.'
  },
  {
    id: 'Soups',
    name: 'Soups',
    icon: 'bi-Bowl-hot-fill',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    description: 'Piping hot, comforting bowls of Hot & Sour Soup and Chicken Corn Soup.'
  },
  {
    id: 'Cold Sandwiches',
    name: 'Cold Sandwiches',
    icon: 'bi-layers-fill',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    description: 'Club Sandwich, Egg & Cheese, Plain Chicken, Vegetable Sandwich, and our signature PSL Sixer Sandwich.'
  },
  {
    id: 'Fries',
    name: 'Fries',
    icon: 'bi-fire',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    description: 'Golden French Fries, PSL Free Hit Loaded Fries, and tangy Masala Fries.'
  },
  {
    id: 'Savouries',
    name: 'Savouries',
    icon: 'bi-basket2-fill',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    description: 'Crispy Chicken Strips + Fries, 4 Spring Rolls with Mint Sauce, and 4 Chicken & Jalapeño Samosas.'
  },
  {
    id: 'Breakfast',
    name: 'Breakfast',
    icon: 'bi-sunrise-fill',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    description: 'Plain, Vegetable & Mushroom Omelettes, Sunny Eggs, French Toast, fluffy Pancakes, and golden Waffles.'
  },
  {
    id: 'Deals',
    name: 'Deals',
    icon: 'bi-stars',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    description: 'Special value combos including our complete Office Deal and Tea Break Deal.'
  }
];

export const specialCombos = [
  {
    id: 'deal-001',
    title: 'OFFICE DEAL',
    subtitle: '✓ 1 Coffee • ✓ 1 Sweet • ✓ 2 Mini Samosa (Chicken & Jalapeño) • ✓ French Fries',
    items: [
      '1 Coffee',
      '1 Sweet',
      '2 Mini Samosa (Chicken & Jalapeño)',
      'French Fries'
    ],
    originalPrice: 1850,
    comboPrice: 1599,
    badge: 'Rs. 1599 • Complete Office Combo',
    productId: 'deal-001'
  },
  {
    id: 'deal-002',
    title: 'TEA BREAK DEAL',
    subtitle: '✓ 2 Chicken & Jalapeño Samosa (Mini) • ✓ Vegetable Spring Rolls (2 pcs) • ✓ French Fries • ✓ One Hot Coffee (Cappuccino)',
    items: [
      '2 Chicken & Jalapeño Samosa (Mini)',
      'Vegetable Spring Rolls (2 pcs)',
      'French Fries',
      'One Hot Coffee (Cappuccino)'
    ],
    originalPrice: 1450,
    comboPrice: 1199,
    badge: 'Rs. 1199 • Best Value Break',
    productId: 'deal-002'
  }
];
