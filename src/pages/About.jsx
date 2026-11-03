import React from 'react';
import { Link } from 'react-router-dom';
import { shopConfig } from '../data/categories';

export default function About() {
  return (
    <div className="py-5">
      <div className="container">
        {/* Hero Story */}
        <div className="row g-5 align-items-center mb-5">
          <div className="col-lg-6">
            <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
              About {shopConfig.name}
            </span>
            <h1 className="fw-bold mt-1 mb-3">
              Bringing People Together Over Great Coffee, Karak Chai & Snacks
            </h1>
            <p className="text-muted">
              Founded with a love for both specialty café culture and Pakistan's timeless chai traditions, <strong>{shopConfig.name}</strong> is your neighborhood spot for energizing mornings, relaxed work sessions, and lively evening hangouts.
            </p>
            <p className="text-muted">
              Whether you're a purist who craves a double shot of 100% Arabica espresso, a fan of rich slow-brewed Doodh Patti in a clay matka, or looking for crispy hand-cut kettle chips and club sandwiches, our menu is crafted to delight every palate.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/menu" className="btn btn-psl-primary">
                Explore Our Menu
              </Link>
              <Link to="/contact" className="btn btn-psl-outline">
                Find Our Shop
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80"
                  alt="Barista pouring latte art at PSL Coffee Shop"
                  className="img-fluid rounded-4 shadow-sm w-100"
                  style={{ height: '260px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-6 mt-4">
                <img
                  src="https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=700&q=80"
                  alt="Traditional Karak Doodh Patti tea"
                  className="img-fluid rounded-4 shadow-sm w-100"
                  style={{ height: '260px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service Promise & Pillars */}
        <div className="bg-psl-cream rounded-4 p-4 p-lg-5 mb-5">
          <div className="text-center mb-4">
            <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
              Why Customers Love Us
            </span>
            <h2 className="fw-bold mt-1">Our Quality & Service Promise</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 rounded-4 h-100 p-4 shadow-sm">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{ width: '48px', height: '48px', backgroundColor: '#5B3424', color: '#fff' }}
                >
                  <i className="bi bi-cup-hot-fill fs-4"></i>
                </div>
                <h5 className="fw-bold">Freshly Brewed Every Time</h5>
                <p className="text-muted small mb-0">
                  We grind our coffee beans right before pulling each espresso shot and simmer our Doodh Patti in small batches with pure milk and whole green cardamom.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 rounded-4 h-100 p-4 shadow-sm">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{ width: '48px', height: '48px', backgroundColor: '#C58B52', color: '#fff' }}
                >
                  <i className="bi bi-shield-check fs-4"></i>
                </div>
                <h5 className="fw-bold">Hygiene & Crisp Quality</h5>
                <p className="text-muted small mb-0">
                  Our potato chips, masala fries, and toasted club sandwiches are prepared in a spotless kitchen using fresh oil and locally sourced produce.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 rounded-4 h-100 p-4 shadow-sm">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{ width: '48px', height: '48px', backgroundColor: '#1FAF54', color: '#fff' }}
                >
                  <i className="bi bi-whatsapp fs-4"></i>
                </div>
                <h5 className="fw-bold">Fast WhatsApp Ordering</h5>
                <p className="text-muted small mb-0">
                  Skip complicated apps and passwords. Browse our live menu, customize your quantities, and send your order directly to our counter on WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

