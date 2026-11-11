import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getCmsData } from './Admin';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [cms, setCms] = useState(() => getCmsData());
  const { products, categories, specialCombos, shopConfig, heroSlides } = cms;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const refresh = () => setCms(getCmsData());
    window.addEventListener('psl-cms-updated', refresh);
    return () => window.removeEventListener('psl-cms-updated', refresh);
  }, []);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const mainCategories = categories.filter((c) => c.id !== 'All');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleAddCombo = (combo) => {
    const comboProduct = {
      id: combo.id,
      name: combo.title,
      category: 'Deals',
      description: combo.subtitle,
      price: combo.comboPrice,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      available: true
    };
    addToCart(comboProduct, 1, { label: 'Complete Deal', price: combo.comboPrice });
  };

  const currentSlide = heroSlides[activeSlide] || heroSlides[0];

  return (
    <div>
      {/* 1. Hero Banner Slider */}
      <section className="hero-section position-relative">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={shopConfig.logo || '/logo.png'}
                  alt="PSL Coffee Bar Monogram"
                  className="rounded-circle border border-2 border-warning shadow"
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                />
                <span className="hero-badge">
                  <i className="bi bi-stars me-1 text-warning"></i> {currentSlide.badge}
                </span>
              </div>

              <h1 className="display-4 fw-bold mb-3 text-white">
                {currentSlide.title}
              </h1>
              <p className="lead mb-4 opacity-90" style={{ maxWidth: '600px', minHeight: '64px' }}>
                {currentSlide.subtitle}
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to={currentSlide.ctaLink || '/menu'} className="btn btn-psl-accent btn-lg px-4">
                  <i className="bi bi-journal-richtext me-2"></i>{currentSlide.ctaText || 'View Menu'}
                </Link>
                <a
                  href={`https://wa.me/${shopConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  <i className="bi bi-whatsapp me-2"></i>WhatsApp: {shopConfig.phoneDisplay}
                </a>
              </div>

              {/* Slider Controls */}
              <div className="d-flex align-items-center gap-2 mt-4">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Slide ${idx + 1}: ${slide.title}`}
                    className="border-0 rounded-pill transition-all"
                    style={{
                      width: idx === activeSlide ? '36px' : '12px',
                      height: '10px',
                      backgroundColor: idx === activeSlide ? '#C58B52' : 'rgba(255,255,255,0.4)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
                <span className="small text-light opacity-75 ms-2">
                  {activeSlide + 1} / {heroSlides.length} — {currentSlide.title}
                </span>
              </div>

              <div className="row g-3 mt-4 pt-3 border-top border-light border-opacity-25">
                <div className="col-4">
                  <div className="fw-bold fs-4 text-white">12+</div>
                  <div className="small opacity-75">Menu Categories</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold fs-4 text-white">50+</div>
                  <div className="small opacity-75">Fresh Items & Deals</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold fs-4 text-white">Instant</div>
                  <div className="small opacity-75">WhatsApp Order</div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block">
              <div className="p-3 rounded-4 bg-white bg-opacity-10 border border-light border-opacity-25 shadow-lg text-center">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="img-fluid rounded-4"
                  style={{ height: '380px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. All 4 Slider Highlights Strip */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="row g-3">
            {heroSlides.map((slide, index) => (
              <div className="col-md-6 col-lg-3" key={slide.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveSlide(index)}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveSlide(index)}
                  className={`p-3 rounded-4 h-100 border transition-all ${
                    activeSlide === index ? 'bg-psl-cream border-warning shadow-sm' : 'bg-light border-0'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge rounded-pill" style={{ backgroundColor: '#5B3424' }}>
                      0{index + 1}
                    </span>
                    <h6 className="fw-bold mb-0">{slide.title}</h6>
                  </div>
                  <p className="small text-muted mb-0">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Category Shortcuts */}
      <section className="py-5 bg-psl-cream">
        <div className="container">
          <div className="text-center mb-4">
            <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
              Explore By Category
            </span>
            <h2 className="fw-bold mt-1">Our Complete Menu Categories</h2>
          </div>

          <div className="row g-4">
            {mainCategories.map((cat) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={cat.id}>
                <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-3 d-flex flex-column">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <i className={`bi ${cat.icon} fs-5`} style={{ color: '#5B3424' }}></i>
                      <h5 className="mb-0 fw-bold">{cat.name}</h5>
                    </div>
                    <p className="text-muted small mb-3 flex-grow-1">{cat.description}</p>
                    <Link
                      to={`/menu?category=${encodeURIComponent(cat.id)}`}
                      className="btn btn-psl-outline btn-sm w-100"
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

      {/* 4. Featured Products */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
                Handpicked Favorites
              </span>
              <h2 className="fw-bold mt-1 mb-0">Signature Menu Highlights</h2>
            </div>
            <Link to="/menu" className="btn btn-psl-primary mt-3 mt-md-0">
              View All {products.length} Items <i className="bi bi-arrow-right ms-1"></i>
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

      {/* 5. Special Offers / Combo Deals */}
      <section className="py-5 bg-psl-brown">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge rounded-pill px-3 py-2 mb-2" style={{ backgroundColor: '#C58B52' }}>
              Exclusive Value Combos
            </span>
            <h2 className="fw-bold text-white">Special Deals</h2>
            <p className="opacity-75 mb-0">
              Enjoy our complete Office Deal and Tea Break Deal freshly prepared for you and your team.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {specialCombos.map((combo) => (
              <div className="col-md-6" key={combo.id}>
                <div className="card border-0 rounded-4 h-100 shadow" style={{ backgroundColor: '#F5EBDD', color: '#2C1E18' }}>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-success">{combo.badge}</span>
                      <span className="text-decoration-line-through text-muted small">
                        {shopConfig.currency} {combo.originalPrice}
                      </span>
                    </div>
                    <h3 className="fw-bold mb-2">{combo.title}</h3>
                    {combo.items ? (
                      <ul className="list-unstyled mb-3 flex-grow-1">
                        {combo.items.map((item, i) => (
                          <li key={i} className="mb-1 fw-medium">
                            <i className="bi bi-check2-circle text-success me-2"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted small flex-grow-1 mb-3">{combo.subtitle}</p>
                    )}
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25">
                      <div>
                        <span className="small text-muted d-block">Deal Price</span>
                        <span className="fs-3 fw-bold" style={{ color: '#5B3424' }}>
                          {shopConfig.currency} {combo.comboPrice}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-psl-primary"
                        onClick={() => handleAddCombo(combo)}
                      >
                        <i className="bi bi-cart-plus me-1"></i> Add Deal to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. About Us & Contact Summary */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
                About Us
              </span>
              <h2 className="fw-bold mt-1 mb-3">Welcome to PSL – Your Everyday Cafe</h2>
              <p className="text-muted">
                At PSL, we believe that great coffee is more than just a drink – it's an experience, a moment of relaxation and a reason to smile.
              </p>
              <p className="text-muted">
                Our journey is inspired by a passion for premium coffee, delicious food and the simple pleasure of bringing people together. We aim to create a welcoming space where every cup tells a story, every flavour creates a memory and every visit feels special.
              </p>
              <p className="text-muted">
                From rich, freshly prepared Espresso and creamy Cappuccino to our signature Spanish Lattes, refreshing Margaritas, flavorful shakes and delicious food, we bring together quality, taste and creativity under one roof.
              </p>
              <div className="d-flex gap-3 mt-3">
                <Link to="/about" className="btn btn-psl-outline">
                  Read Full Story
                </Link>
                <Link to="/contact" className="btn btn-psl-primary">
                  Contact Us ({shopConfig.phoneDisplay})
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 bg-psl-cream p-4 text-center">
                <img
                  src={shopConfig.logo || '/logo.png'}
                  alt="PSL Monogram"
                  className="rounded-4 mx-auto mb-3 shadow"
                  style={{ maxWidth: '220px', width: '100%', height: 'auto' }}
                />
                <h4 className="fw-bold mb-1">{shopConfig.name}</h4>
                <p className="small text-muted mb-3">Pour • Sip • Stay</p>
                <div className="p-3 rounded-3 bg-white border">
                  <div className="fw-bold mb-1">
                    <i className="bi bi-telephone-fill text-success me-2"></i>
                    Call: <a href={`tel:${shopConfig.phoneDisplay}`} className="text-decoration-none text-dark">{shopConfig.phoneDisplay}</a>
                  </div>
                  <div className="fw-bold text-success">
                    <i className="bi bi-whatsapp me-2"></i>
                    WhatsApp: <a href={`https://wa.me/${shopConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-success">{shopConfig.phoneDisplay}</a>
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
