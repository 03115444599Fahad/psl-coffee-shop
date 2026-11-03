import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { shopConfig } from '../data/categories';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const lineTotal = item.price * item.quantity;

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="card-body p-3">
        <div className="row align-items-center g-3">
          <div className="col-3 col-sm-2">
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded-3"
                style={{ height: '75px', width: '100%', objectFit: 'cover' }}
              />
            </Link>
          </div>

          <div className="col-9 col-sm-4">
            <span className="badge bg-secondary bg-opacity-10 text-dark mb-1">
              {item.category}
            </span>
            <h6 className="mb-1 fw-bold">
              <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                {item.name}
              </Link>
            </h6>
            <div className="small text-muted">
              Option: <span className="fw-medium text-dark">{item.size}</span>
            </div>
            <div className="small text-muted">
              Unit Price: {shopConfig.currency} {item.price.toLocaleString()}
            </div>
          </div>

          <div className="col-6 col-sm-3">
            <div className="input-group input-group-sm" style={{ maxWidth: '130px' }}>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                aria-label="Decrease quantity"
              >
                <i className="bi bi-dash"></i>
              </button>
              <span className="form-control text-center fw-bold bg-white">
                {item.quantity}
              </span>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>

          <div className="col-6 col-sm-3 text-end">
            <div className="fw-bold fs-6 mb-1" style={{ color: '#5B3424' }}>
              {shopConfig.currency} {lineTotal.toLocaleString()}
            </div>
            <button
              type="button"
              className="btn btn-sm btn-link text-danger text-decoration-none p-0"
              onClick={() => removeFromCart(item.cartKey)}
            >
              <i className="bi bi-trash3 me-1"></i>Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

