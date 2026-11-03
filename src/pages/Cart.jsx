import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { shopConfig } from '../data/categories';

export default function Cart() {
  const { cartItems, subtotal, totalItems, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="py-5">
        <div className="container">
          <div className="bg-white rounded-4 shadow-sm p-5 text-center mx-auto" style={{ maxWidth: '550px' }}>
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{ width: '80px', height: '80px', backgroundColor: '#F5EBDD', color: '#5B3424' }}
            >
              <i className="bi bi-cart-x display-5"></i>
            </div>
            <h2 className="fw-bold">Your Shopping Cart is Empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added any coffee, tea, or snacks yet. Explore our menu to get started!
            </p>
            <Link to="/menu" className="btn btn-psl-primary btn-lg px-4">
              <i className="bi bi-journal-richtext me-2"></i>Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
              Review Your Selection
            </span>
            <h1 className="fw-bold mb-0">Shopping Cart ({totalItems} items)</h1>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger mt-2 mt-sm-0"
            onClick={clearCart}
          >
            <i className="bi bi-trash3 me-1"></i>Clear Cart
          </button>
        </div>

        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <CartItem key={item.cartKey} item={item} />
            ))}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <Link to="/menu" className="btn btn-psl-outline">
                <i className="bi bi-arrow-left me-2"></i>Continue Shopping
              </Link>
              <span className="small text-muted">
                <i className="bi bi-shield-check text-success me-1"></i>
                Saved automatically in your browser
              </span>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: '95px' }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Order Summary</h4>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Items ({totalItems})</span>
                  <span className="fw-semibold">
                    {shopConfig.currency} {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Pickup Option</span>
                  <span className="text-success fw-semibold">Free</span>
                </div>

                <div className="p-3 rounded-3 bg-psl-cream small mb-3">
                  <i className="bi bi-truck me-1" style={{ color: '#5B3424' }}></i>
                  {subtotal >= shopConfig.freeDeliveryThreshold ? (
                    <span className="fw-semibold text-success">
                      Yay! Your order qualifies for FREE home delivery!
                    </span>
                  ) : (
                    <span>
                      Add <strong>{shopConfig.currency} {(shopConfig.freeDeliveryThreshold - subtotal).toLocaleString()}</strong> more for Free Delivery (or choose Free Shop Pickup at checkout).
                    </span>
                  )}
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fw-bold fs-5">Subtotal</span>
                  <span className="fw-bold fs-4" style={{ color: '#5B3424' }}>
                    {shopConfig.currency} {subtotal.toLocaleString()}
                  </span>
                </div>

                <Link to="/checkout" className="btn btn-psl-primary w-100 py-3 fs-6">
                  Proceed to Order <i className="bi bi-arrow-right ms-2"></i>
                </Link>

                <div className="text-center mt-3 small text-muted">
                  <i className="bi bi-whatsapp text-success me-1"></i>
                  Next step: Enter details & send via WhatsApp
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

