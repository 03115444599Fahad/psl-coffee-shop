import React, { useState } from 'react';
import { shopConfig } from '../data/categories';

export default function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleDirectWhatsAppInquiry = (e) => {
    e.preventDefault();
    const text = `Assalam-o-Alaikum ${shopConfig.name}!\nMy Name: ${name || 'Customer'}\nInquiry: ${message}`;
    window.open(
      `https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
            Get In Touch
          </span>
          <h1 className="fw-bold mt-1">Contact & Visit Us</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '580px' }}>
            Have a question about bulk orders, catering, or today's specials? Reach out via phone, WhatsApp, or visit our café.
          </p>
        </div>

        <div className="row g-4">
          {/* Contact Information Cards */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <h4 className="fw-bold mb-4">Shop Information</h4>

              <div className="d-flex gap-3 mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                  style={{ width: '46px', height: '46px', backgroundColor: '#F5EBDD', color: '#5B3424' }}
                >
                  <i className="bi bi-geo-alt-fill fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Shop Address</h6>
                  <p className="text-muted small mb-2">{shopConfig.address}</p>
                  <a
                    href={shopConfig.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-psl-outline py-1 px-3"
                  >
                    <i className="bi bi-map me-1"></i> Open in Google Maps
                  </a>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                  style={{ width: '46px', height: '46px', backgroundColor: '#E8F5E9', color: '#1FAF54' }}
                >
                  <i className="bi bi-whatsapp fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">WhatsApp & Phone</h6>
                  <p className="text-muted small mb-1">
                    Call or message us directly for instant orders and support:
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    <a
                      href={`https://wa.me/${shopConfig.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-success"
                    >
                      <i className="bi bi-whatsapp me-1"></i> Chat on WhatsApp
                    </a>
                    <a href={`tel:${shopConfig.phoneDisplay}`} className="btn btn-sm btn-outline-dark">
                      <i className="bi bi-telephone me-1"></i> {shopConfig.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                  style={{ width: '46px', height: '46px', backgroundColor: '#F5EBDD', color: '#5B3424' }}
                >
                  <i className="bi bi-envelope-fill fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Email Address</h6>
                  <a href={`mailto:${shopConfig.email}`} className="text-decoration-none" style={{ color: '#5B3424' }}>
                    {shopConfig.email}
                  </a>
                </div>
              </div>

              <div className="d-flex gap-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                  style={{ width: '46px', height: '46px', backgroundColor: '#F5EBDD', color: '#5B3424' }}
                >
                  <i className="bi bi-clock-fill fs-5"></i>
                </div>
                <div className="w-100">
                  <h6 className="fw-bold mb-2">Opening Hours</h6>
                  <ul className="list-unstyled small mb-0 d-grid gap-1">
                    {shopConfig.openingHours.map((slot, i) => (
                      <li key={i} className="d-flex justify-content-between border-bottom pb-1">
                        <span className="text-muted">{slot.days}</span>
                        <span className="fw-semibold">{slot.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Inquiry Card */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-psl-cream">
              <h4 className="fw-bold mb-2">Send a Quick Message</h4>
              <p className="text-muted small mb-4">
                Have feedback or a custom event inquiry? Send us a message directly on WhatsApp.
              </p>

              <form onSubmit={handleDirectWhatsAppInquiry}>
                <div className="mb-3">
                  <label htmlFor="contactName" className="form-label fw-semibold">
                    Your Name
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    className="form-control bg-white"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contactMsg" className="form-label fw-semibold">
                    Your Question or Feedback
                  </label>
                  <textarea
                    id="contactMsg"
                    rows="4"
                    className="form-control bg-white"
                    placeholder="How can we help you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-whatsapp w-100">
                  <i className="bi bi-whatsapp me-2"></i> Send Inquiry via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

