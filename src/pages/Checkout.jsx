import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { shopConfig } from '../data/categories';

export default function Checkout() {
  const { cartItems, subtotal, totalItems, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [orderType, setOrderType] = useState('Pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [orderSent, setOrderSent] = useState(false);

  if (cartItems.length === 0 && !orderSent) {
    return (
      <div className="container py-5 text-center">
        <div className="bg-white rounded-4 shadow-sm p-5 mx-auto" style={{ maxWidth: '540px' }}>
          <i className="bi bi-bag-x display-4 text-muted"></i>
          <h2 className="fw-bold mt-3">No Items to Checkout</h2>
          <p className="text-muted mb-4">
            Please add items from our menu before proceeding to checkout.
          </p>
          <Link to="/menu" className="btn btn-psl-primary">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  const deliveryCharge =
    orderType === 'Delivery'
      ? subtotal >= shopConfig.freeDeliveryThreshold
        ? 0
        : shopConfig.deliveryFee
      : 0;

  const grandTotal = subtotal + deliveryCharge;

  const validateForm = () => {
    const newErrors = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.customerName = 'Please enter your full name.';
    }
    const cleanPhone = mobileNumber.replace(/[\s-]/g, '');
    if (!cleanPhone || !/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number (e.g. 03001234567).';
    }
    if (orderType === 'Delivery' && (!deliveryAddress.trim() || deliveryAddress.trim().length < 8)) {
      newErrors.deliveryAddress = 'Please enter your complete delivery address and landmark.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `*NEW ORDER - ${shopConfig.name.toUpperCase()}*`,
      `----------------------------------`,
      `*Customer:* ${customerName.trim()}`,
      `*Mobile:* ${mobileNumber.trim()}`,
      `*Order Type:* ${orderType}`,
      orderType === 'Delivery' ? `*Delivery Address:* ${deliveryAddress.trim()}` : null,
      orderNotes.trim() ? `*Notes:* ${orderNotes.trim()}` : null,
      `----------------------------------`,
      `*ORDER ITEMS:*`,
      ...cartItems.map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (${item.size}) x ${item.quantity} = ${shopConfig.currency} ${(
            item.price * item.quantity
          ).toLocaleString()}`
      ),
      `----------------------------------`,
      `Subtotal: ${shopConfig.currency} ${subtotal.toLocaleString()}`,
      orderType === 'Delivery'
        ? `Delivery Charges: ${
            deliveryCharge === 0 ? 'FREE' : `${shopConfig.currency} ${deliveryCharge}`
          }`
        : null,
      `*GRAND TOTAL: ${shopConfig.currency} ${grandTotal.toLocaleString()}*`,
      `----------------------------------`,
      `Please confirm availability and estimated preparation time. Thank you!`
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const messageText = buildWhatsAppMessage();
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${shopConfig.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setOrderSent(true);
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="mb-4">
          <Link to="/cart" className="text-decoration-none small fw-semibold" style={{ color: '#5B3424' }}>
            <i className="bi bi-arrow-left me-1"></i> Back to Shopping Cart
          </Link>
          <h1 className="fw-bold mt-2">Checkout & Place Order</h1>
          <p className="text-muted mb-0">
            Enter your contact details below to generate a pre-filled WhatsApp order message.
          </p>
        </div>

        {orderSent && (
          <div className="alert alert-success rounded-4 shadow-sm p-4 mb-4">
            <div className="d-flex align-items-start gap-3">
              <i className="bi bi-whatsapp fs-2 text-success"></i>
              <div>
                <h5 className="fw-bold mb-1">WhatsApp Order Window Opened!</h5>
                <p className="mb-2 small">
                  Please remember to press <strong>Send</strong> inside WhatsApp so our counter receives your order. Our team will reply to confirm availability and your final total.
                </p>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      clearCart();
                      setOrderSent(false);
                    }}
                  >
                    Clear Cart & Start Fresh
                  </button>
                  <Link to="/menu" className="btn btn-sm btn-outline-dark">
                    Back to Menu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row g-4">
          {/* Customer Details Form */}
          <div className="col-lg-7">
            <form onSubmit={handleSendWhatsApp} noValidate className="card border-0 shadow-sm rounded-4 p-4">
              <h4 className="fw-bold mb-3">1. Customer & Delivery Details</h4>

              <div className="mb-3">
                <label htmlFor="customerName" className="form-label fw-semibold">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  id="customerName"
                  type="text"
                  className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
                  placeholder="e.g. Ahmed Khan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                {errors.customerName && (
                  <div className="invalid-feedback">{errors.customerName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label fw-semibold">
                  Mobile / WhatsApp Number <span className="text-danger">*</span>
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                  placeholder="e.g. 0300 1234567"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
                {errors.mobileNumber && (
                  <div className="invalid-feedback">{errors.mobileNumber}</div>
                )}
              </div>

              {/* Pickup or Delivery Selection */}
              <div className="mb-3">
                <label className="form-label fw-semibold d-block">
                  Order Method <span className="text-danger">*</span>
                </label>
                <div className="row g-2">
                  <div className="col-6">
                    <button
                      type="button"
                      className={`btn w-100 py-3 rounded-3 d-flex flex-column align-items-center ${
                        orderType === 'Pickup' ? 'btn-psl-primary' : 'btn-outline-secondary'
                      }`}
                      onClick={() => setOrderType('Pickup')}
                    >
                      <i className="bi bi-shop fs-4 mb-1"></i>
                      <span className="fw-bold">Shop Pickup</span>
                      <span className="small opacity-75">Free • Ready in 15 mins</span>
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className={`btn w-100 py-3 rounded-3 d-flex flex-column align-items-center ${
                        orderType === 'Delivery' ? 'btn-psl-primary' : 'btn-outline-secondary'
                      }`}
                      onClick={() => setOrderType('Delivery')}
                    >
                      <i className="bi bi-bicycle fs-4 mb-1"></i>
                      <span className="fw-bold">Home Delivery</span>
                      <span className="small opacity-75">
                        {subtotal >= shopConfig.freeDeliveryThreshold
                          ? 'Free Delivery Qualified!'
                          : `${shopConfig.currency} ${shopConfig.deliveryFee} Fee`}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {orderType === 'Delivery' && (
                <div className="mb-3">
                  <label htmlFor="deliveryAddress" className="form-label fw-semibold">
                    Complete Delivery Address <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="deliveryAddress"
                    rows="2"
                    className={`form-control ${errors.deliveryAddress ? 'is-invalid' : ''}`}
                    placeholder="House/Flat #, Street, Block, Sector & nearby landmark"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  />
                  {errors.deliveryAddress && (
                    <div className="invalid-feedback">{errors.deliveryAddress}</div>
                  )}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="orderNotes" className="form-label fw-semibold">
                  Special Instructions / Order Notes <span className="text-muted fw-normal">(Optional)</span>
                </label>
                <textarea
                  id="orderNotes"
                  rows="2"
                  className="form-control"
                  placeholder="e.g. Less sugar in Doodh Patti, extra garlic dip with chips..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>

              <div className="p-3 rounded-3 bg-psl-cream small mb-4">
                <div className="fw-bold mb-1">
                  <i className="bi bi-info-circle-fill me-1" style={{ color: '#5B3424' }}></i>
                  External Service & Confirmation Notice
                </div>
                <p className="mb-0 text-muted">
                  Clicking the button below opens <strong>WhatsApp</strong> (an external service) with your formatted order summary. A WhatsApp link does not automatically submit an order—you must press <strong>Send</strong> in WhatsApp, and our shop will reply to confirm item availability and your final order.
                </p>
              </div>

              <button type="submit" className="btn btn-whatsapp w-100 fs-5">
                <i className="bi bi-whatsapp me-2"></i>
                Send Order on WhatsApp ({shopConfig.currency} {grandTotal.toLocaleString()})
              </button>
            </form>
          </div>

          {/* Order Summary & Message Preview */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h4 className="fw-bold mb-3">2. Order Summary ({totalItems} items)</h4>

              <div className="d-grid gap-3 mb-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartKey}
                    className="d-flex justify-content-between align-items-start pb-2 border-bottom"
                  >
                    <div>
                      <div className="fw-semibold">{item.name}</div>
                      <div className="small text-muted">
                        {item.size} × {item.quantity}
                      </div>
                    </div>
                    <div className="fw-bold">
                      {shopConfig.currency} {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-semibold">
                  {shopConfig.currency} {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">
                  {orderType === 'Delivery' ? 'Delivery Fee' : 'Shop Pickup'}
                </span>
                <span className="fw-semibold text-success">
                  {deliveryCharge === 0
                    ? 'FREE'
                    : `${shopConfig.currency} ${deliveryCharge.toLocaleString()}`}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                <span className="fw-bold fs-5">Grand Total</span>
                <span className="fw-bold fs-4" style={{ color: '#5B3424' }}>
                  {shopConfig.currency} {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Live WhatsApp Message Preview */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">
                  <i className="bi bi-chat-left-text-fill text-success me-2"></i>
                  WhatsApp Message Preview
                </h6>
                <span className="badge bg-light text-dark border">Auto-Generated</span>
              </div>
              <pre
                className="p-3 rounded-3 mb-0 small"
                style={{
                  backgroundColor: '#E8F5E9',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  fontSize: '0.82rem',
                  borderLeft: '4px solid #25D366'
                }}
              >
                {buildWhatsAppMessage()}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

