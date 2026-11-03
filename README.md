# PSL Coffee Shop Website

A modern, responsive product menu and WhatsApp online ordering website built with **React.js, HTML5, CSS3, and Bootstrap 5**, ready for free static hosting on **Cloudflare Pages**.

---

## Features Implemented

- **7 Complete Pages**:
  - **Home (`/`)**: Hero banner, category shortcuts (Coffee, Tea, Chips & Snacks), featured products, value combo deals, short About section, and opening hours.
  - **Menu (`/menu`)**: Complete categorized menu with instant search, category filter tabs, and an "In-stock only" toggle.
  - **Product Details (`/product/:id`)**: High-resolution product view, size/serving options, dynamic price calculation, quantity selector, and availability badge.
  - **Shopping Cart (`/cart`)**: Persistent cart powered by `localStorage`, quantity controls, item removal, and free delivery progress indicator.
  - **Checkout (`/checkout`)**: Customer validation (Name, Mobile Number, Pickup vs. Delivery, Delivery Address, Order Notes), live WhatsApp message preview, and one-click WhatsApp order handoff.
  - **About Us (`/about`)**: Brand story, quality promise, and café highlights.
  - **Contact Us (`/contact`)**: Shop address, Google Maps link, opening hours, phone, and direct WhatsApp inquiry form.

---

## Customizing Shop Details Before Final Launch

Open `src/data/categories.js` and update `shopConfig` with your confirmed details:
- `whatsappNumber`: International format without `+` or spaces (e.g., `'923001234567'`).
- `phoneDisplay`: Display phone number.
- `address` & `mapUrl`: Your shop's physical location.
- `deliveryFee` & `freeDeliveryThreshold`: Delivery pricing in PKR.

To update menu items and PKR prices, edit `src/data/products.js`.

---

## Local Development Setup

1. Ensure [Node.js LTS](https://nodejs.org/) is installed.
2. Open a terminal in the `psl-coffee-shop` directory:
   ```bash
   cd psl-coffee-shop
   npm install
   npm run dev
   ```
3. Open the local URL shown in the terminal (typically `http://localhost:5173`).

---

## Production Build & Free Cloudflare Pages Deployment

1. Test the production build locally:
   ```bash
   npm run build
   ```
   Vite outputs the static bundle to the `dist/` directory (including `public/_redirects` for single-page routing).
2. Push this project to a GitHub repository named `psl-coffee-shop`.
3. Sign in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
4. Select your `psl-coffee-shop` repository and configure:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Your site will be live on a free `*.pages.dev` HTTPS URL!

