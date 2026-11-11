import React from 'react';
import { Link } from 'react-router-dom';
import { shopConfig, heroSlides } from '../data/categories';

export default function About() {
  return (
    <div className="py-5">
      <div className="container">
        {/* Hero Story */}
        <div className="row g-5 align-items-center mb-5">
          <div className="col-lg-7">
            <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
              About Us • {shopConfig.name}
            </span>
            <h1 className="fw-bold mt-1 mb-3">
              Welcome to PSL – Your Everyday Cafe
            </h1>
            <p className="lead text-dark fw-medium">
              At PSL, we believe that great coffee is more than just a drink – it's an experience, a moment of relaxation and a reason to smile.
            </p>
            <p className="text-muted">
              Our journey is inspired by a passion for premium coffee, delicious food and the simple pleasure of bringing people together. We aim to create a welcoming space where every cup tells a story, every flavour creates a memory and every visit feels special.
            </p>
            <p className="text-muted">
              From rich, freshly prepared Espresso and creamy Cappuccino to our signature Spanish Lattes, refreshing Margaritas, flavorful shakes and delicious food, we bring together quality, taste and creativity under one roof.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/menu" className="btn btn-psl-primary">
                Explore Our Menu
              </Link>
              <Link to="/contact" className="btn btn-psl-outline">
                Contact Us ({shopConfig.phoneDisplay})
              </Link>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <div className="p-4 rounded-4 bg-psl-cream shadow-sm border">
              <img
                src={shopConfig.logo || '/logo.png'}
                alt="PSL Coffee Bar Monogram"
                className="img-fluid rounded-4 shadow mb-3"
                style={{ maxHeight: '320px', objectFit: 'contain' }}
              />
              <h4 className="fw-bold mb-1">{shopConfig.brandFull}</h4>
              <p className="text-muted small mb-0">POUR • SIP • STAY</p>
            </div>
          </div>
        </div>

        {/* Service Promise & Pillars (from Sliders) */}
        <div className="bg-psl-cream rounded-4 p-4 p-lg-5 mb-5">
          <div className="text-center mb-4">
            <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
              Why Customers Love Us
            </span>
            <h2 className="fw-bold mt-1">What Makes PSL Special</h2>
          </div>

          <div className="row g-4">
            {heroSlides.map((slide, idx) => (
              <div className="col-md-6" key={slide.id}>
                <div className="card border-0 rounded-4 h-100 p-4 shadow-sm">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-3 fw-bold"
                      style={{ width: '44px', height: '44px', backgroundColor: '#5B3424', color: '#fff' }}
                    >
                      0{idx + 1}
                    </div>
                    <h5 className="fw-bold mb-0">{slide.title}</h5>
                  </div>
                  <p className="text-muted small mb-0">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
