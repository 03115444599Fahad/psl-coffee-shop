export const shopConfig = {
  name: 'PSL Coffee Shop',
  tagline: 'Artisanal Coffee, Signature Karak Chai & Crispy Snacks',
  whatsappNumber: '923001234567', // International format without '+'
  phoneDisplay: '+92 300 1234567',
  email: 'hello@pslcoffeeshop.pk',
  address: 'Shop #14, Central Commercial Area, Gulberg III, Lahore, Pakistan',
  mapUrl: 'https://maps.google.com/?q=Gulberg+III+Lahore',
  currency: 'PKR',
  deliveryFee: 150,
  freeDeliveryThreshold: 1500,
  openingHours: [
    { days: 'Monday – Thursday', hours: '8:00 AM – 11:30 PM' },
    { days: 'Friday', hours: '8:00 AM – 1:00 AM (Break 1:00 – 2:30 PM)' },
    { days: 'Saturday – Sunday', hours: '9:00 AM – 1:00 AM' }
  ]
};

export const categories = [
  {
    id: 'All',
    name: 'All Items',
    icon: 'bi-grid-fill',
    description: 'Browse our complete selection of freshly brewed drinks and snacks.'
  },
  {
    id: 'Coffee',
    name: 'Coffee',
    icon: 'bi-cup-hot-fill',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    description: 'Rich espresso classics, velvety lattes, and refreshing iced brews crafted from 100% Arabica beans.'
  },
  {
    id: 'Tea',
    name: 'Tea & Chai',
    icon: 'bi-cup-fill',
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic slow-simmered Doodh Patti, aromatic Masala Chai, Kashmiri Pink Tea, and soothing herbal infusions.'
  },
  {
    id: 'Chips & Snacks',
    name: 'Chips & Snacks',
    icon: 'bi-basket2-fill',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
    description: 'Kettle-cooked potato chips, loaded nachos, golden masala fries, club sandwiches, and bakery treats.'
  }
];

export const specialCombos = [
  {
    id: 'combo-001',
    title: 'Chai & Fries Evening Duo',
    subtitle: '2x Special Doodh Patti + 1x Large Masala Fries',
    originalPrice: 780,
    comboPrice: 650,
    badge: 'Save PKR 130',
    productId: 'tea-001'
  },
  {
    id: 'combo-002',
    title: 'Coffee & Club Work-Break',
    subtitle: '1x Regular Cappuccino + 1x Grilled Chicken Club Sandwich',
    originalPrice: 1100,
    comboPrice: 950,
    badge: 'Best Seller Deal',
    productId: 'coffee-003'
  },
  {
    id: 'combo-003',
    title: 'Match Day Crunch Pack',
    subtitle: '2x Cold Coffee + 1x Loaded Cheese Nachos + 1x Kettle Chips',
    originalPrice: 1930,
    comboPrice: 1690,
    badge: 'Group Deal',
    productId: 'snack-002'
  }
];

