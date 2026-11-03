import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { shopConfig } from '../data/categories';

export default function Navbar() {
  const { totalItems } = useCart();
  const [expanded, setExpanded] = useState(false);

  const closeMenu = () => setExpanded(false);

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark navbar-psl" aria-label="Main navigation">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={closeMenu}>
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-3"
              style={{
                width: '38px',
                height: '38px',
                backgroundColor: '#C58B52',
                color: '#fff'
              }}
            >
              <i className="bi bi-cup-hot-fill fs-5"></i>
            </span>
            <span>{shopConfig.name}</span>
          </Link>

          <div className="d-flex align-items-center gap-2 order-lg-3">
            <Link
              to="/cart"
              className="btn btn-psl-accent position-relative d-flex align-items-center gap-2 py-2 px-3"
              onClick={closeMenu}
              aria-label={`Shopping Cart with ${totalItems} items`}
            >
              <i className="bi bi-bag-check-fill"></i>
              <span className="d-none d-sm-inline">Cart</span>
              <span className="badge rounded-pill bg-dark text-white">
                {totalItems}
              </span>
            </Link>

            <button
              className="navbar-toggler border-0"
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-controls="pslNavbar"
              aria-expanded={expanded}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className={`collapse navbar-collapse order-lg-2 ${expanded ? 'show' : ''}`} id="pslNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1 mt-3 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/menu" onClick={closeMenu}>
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" onClick={closeMenu}>
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" onClick={closeMenu}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

