import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { categories, specialCombos, shopConfig } from '../data/categories';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const mainCategories = categories.filter((c) => c.id !== 'All');

  const handleAddCombo = (combo) => {
    const comboProduct = {
      id: combo.id,
      name: combo.title,
      category: 'Special Combo',
      description: combo.subtitle,
      price: combo.comboPrice,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      available: true
    };
    addToCart(comboProduct, 1, { label: combo.subtitle, price: combo.comboPrice });
  };

  return (
    <div>
      {/* 1. Hero Banner */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="hero-badge mb-3">
                <i className="bi bi-stars me-1 text-warning"></i> Freshly Brewed in Pakistan • Order via WhatsApp
              </span>
              <h1 className="display-4 fw-bold mb-3 text-white">
                Where Rich Espresso Meets Authentic Karak Chai
              </h1>
              <p className="lead mb-4 opacity-90" style={{ maxWidth: '600px' }}>
                Welcome to <strong>{shopConfig.name}</strong>. Enjoy handcrafted Arabica coffees, slow-simmered Doodh Patti, and crispy golden snacks. Browse our menu, fill your cart, and send your order directly on WhatsApp in seconds!
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/menu" className="btn btn-psl-accent btn-lg px-4">
                  <i className="bi bi-journal-richtext me-2"></i>View Menu
                </Link>
                <Link to="/cart" className="btn btn-outline-light btn-lg px-4">
                  <i className="bi bi-whatsapp me-2"></i>Order Now
                </Link>
              </div>

              <div className="row g-3 mt-4 pt-3 border-top border-light border-opacity-25">
                <div className="col-4">
                  <div className="fw-bold fs-4 text-white">100%</div>
                  <div className="small opacity-75">Arabica Coffee Beans</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold fs-4 text-white">Fresh</div>
                  <div className="small opacity-75">Karak Chai & Snacks</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold fs-4 text-white">Instant</div>
                  <div className="small opacity-75">WhatsApp Checkout</div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block">
              <div className="p-3 rounded-4 bg-white bg-opacity-10 border border-light border-opacity-25 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
                  alt="PSL Coffee Shop signature cappuccino and snacks"
                  className="img-fluid rounded-4"
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Shortcuts */}
      <section className="py-5 bg-psl-cream">
        <div className="container">
          <div className="text-center mb-4">
            <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
              Explore By Category
            </span>
            <h2 className="fw-bold mt-1">What Are You Craving Today?</h2>
          </div>

          <div className="row g-4">
            {mainCategories.map((cat) => (
              <div className="col-md-4" key={cat.id}>
                <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                  <div style={{ height: '190px', overflow: 'hidden' }}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <i className={`bi ${cat.icon} fs-4`} style={{ color: '#5B3424' }}></i>
                      <h4 className="mb-0 fw-bold">{cat.name}</h4>
                    </div>
                    <p className="text-muted small mb-3 flex-grow-1">{cat.description}</p>
                    <Link
                      to={`/menu?category=${encodeURIComponent(cat.id)}`}
                      className="btn btn-psl-outline w-100"
                    >
                      Browse {cat.name} <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
                Handpicked Favorites
              </span>
              <h2 className="fw-bold mt-1 mb-0">Featured Menu Items</h2>
            </div>
            <Link to="/menu" className="btn btn-psl-primary mt-3 mt-md-0">
              View Complete Menu <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div className="col-sm-6 col-lg-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Special Offers / Combo Deals */}
      <section className="py-5 bg-psl-brown">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge rounded-pill px-3 py-2 mb-2" style={{ backgroundColor: '#C58B52' }}>
              Value Combos
            </span>
            <h2 className="fw-bold text-white">Special Offers & Combo Deals</h2>
            <p className="opacity-75 mb-0">
              Save more when you pair your favorite brew with freshly prepared snacks.
            </p>
          </div>

          <div className="row g-4">
            {specialCombos.map((combo) => (
              <div className="col-md-4" key={combo.id}>
                <div className="card border-0 rounded-4 h-100 shadow" style={{ backgroundColor: '#F5EBDD', color: '#2C1E18' }}>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-success">{combo.badge}</span>
                      <span className="text-decoration-line-through text-muted small">
                        {shopConfig.currency} {combo.originalPrice}
                      </span>
                    </div>
                    <h4 className="fw-bold mb-2">{combo.title}</h4>
                    <p className="text-muted small flex-grow-1 mb-3">{combo.subtitle}</p>
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25">
                      <div>
                        <span className="small text-muted d-block">Combo Price</span>
                        <span className="fs-4 fw-bold" style={{ color: '#5B3424' }}>
                          {shopConfig.currency} {combo.comboPrice}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-psl-primary"
                        onClick={() => handleAddCombo(combo)}
                      >
                        <i className="bi bi-cart-plus me-1"></i> Add Deal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Short About & Opening Hours */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
                Our Story & Promise
              </span>
              <h2 className="fw-bold mt-1 mb-3">Crafted With Passion, Served With Warmth</h2>
              <p className="text-muted">
                At <strong>{shopConfig.name}</strong>, we believe every cup tells a story. Whether you need a morning Double Espresso, a comforting evening cup of Karak Doodh Patti with friends, or crunchy kettle chips during match night, we prepare everything fresh to order.
              </p>
              <div className="row g-3 my-3">
                <div className="col-sm-6">
                  <div className="d-flex gap-3 align-items-start">
                    <i className="bi bi-check2-circle fs-4 text-success"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Fresh Ingredients</h6>
                      <p className="small text-muted mb-0">Pure full-cream milk, freshly roasted beans, and hand-cut snacks.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex gap-3 align-items-start">
                    <i className="bi bi-whatsapp fs-4 text-success"></i>
                    <div>
                      <h6 className="fw-bold mb-1">No-Hassle Ordering</h6>
                      <p className="small text-muted mb-0">No account or card needed—send your cart directly on WhatsApp.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3 mt-3">
                <Link to="/about" className="btn btn-psl-outline">
                  Read Full Story
                </Link>
                <Link to="/contact" className="btn btn-psl-primary">
                  Visit or Contact Us
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 bg-psl-cream p-4">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-clock-history me-2" style={{ color: '#5B3424' }}></i>
                  Opening Hours & Location
                </h4>
                <ul className="list-group list-group-flush rounded-3 mb-3">
                  {shopConfig.openingHours.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center bg-transparent py-3"
                    >
                      <span className="fw-semibold">{item.days}</span>
                      <span className="badge bg-dark text-white rounded-pill px-3 py-2">
                        {item.hours}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="p-3 rounded-3 bg-white border">
                  <div className="fw-bold mb-1">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i> Shop Address
                  </div>
                  <p className="small text-muted mb-2">{shopConfig.address}</p>
                  <div className="small fw-semibold">
                    <i className="bi bi-telephone-fill me-1 text-success"></i> WhatsApp / Phone: {shopConfig.phoneDisplay}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

