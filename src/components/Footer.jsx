import React from 'react';
import { Link } from 'react-router-dom';
import { shopConfig } from '../data/categories';

export default function Footer() {
  return (
    <footer className="footer-psl pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4 pb-4 border-bottom border-secondary border-opacity-25">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-3"
                style={{ width: '36px', height: '36px', backgroundColor: '#C58B52', color: '#fff' }}
              >
                <i className="bi bi-cup-hot-fill"></i>
              </span>
              <h4 className="mb-0 text-white">{shopConfig.name}</h4>
            </div>
            <p className="small text-light opacity-75 mb-3">
              Freshly roasted Arabica coffee, traditional slow-brewed Karak Doodh Patti, and crispy snacks. Browse online and send your order straight to our counter via WhatsApp.
            </p>
            <div className="d-flex gap-2">
              <a
                href={`https://wa.me/${shopConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-psl-accent"
              >
                <i className="bi bi-whatsapp me-1"></i> WhatsApp Order
              </a>
              <Link to="/menu" className="btn btn-sm btn-outline-light">
                Explore Menu
              </Link>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: '#C58B52' }}>
              Quick Links
            </h6>
            <ul className="list-unstyled d-grid gap-2 small">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Full Menu</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact & Location</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: '#C58B52' }}>
              Opening Hours
            </h6>
            <ul className="list-unstyled small d-grid gap-2 mb-0">
              {shopConfig.openingHours.map((slot, index) => (
                <li key={index} className="text-light opacity-85">
                  <div className="fw-semibold text-white">{slot.days}</div>
                  <div className="opacity-75">{slot.hours}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: '#C58B52' }}>
              Contact Us
            </h6>
            <ul className="list-unstyled small d-grid gap-2 mb-0">
              <li className="d-flex gap-2 align-items-start">
                <i className="bi bi-geo-alt-fill text-warning mt-1"></i>
                <span>{shopConfig.address}</span>
              </li>
              <li className="d-flex gap-2 align-items-center">
                <i className="bi bi-telephone-fill text-warning"></i>
                <a href={`tel:${shopConfig.phoneDisplay}`}>{shopConfig.phoneDisplay}</a>
              </li>
              <li className="d-flex gap-2 align-items-center">
                <i className="bi bi-whatsapp text-success"></i>
                <a
                  href={`https://wa.me/${shopConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shopConfig.phoneDisplay} (WhatsApp)
                </a>
              </li>
              <li className="d-flex gap-2 align-items-center">
                <i className="bi bi-envelope-fill text-warning"></i>
                <a href={`mailto:${shopConfig.email}`}>{shopConfig.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-3 small opacity-75">
          <div>
            &copy; {new Date().getFullYear()} {shopConfig.name}. All rights reserved.
          </div>
          <div className="mt-2 mt-sm-0">
            Built with React & Bootstrap 5 • Hosted on Cloudflare Pages
          </div>
        </div>
      </div>
    </footer>
  );
}

