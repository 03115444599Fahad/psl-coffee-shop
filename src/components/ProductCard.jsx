import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { shopConfig } from '../data/categories';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleQuickAdd = () => {
    if (!product.available) return;
    const defaultSize = product.sizes?.[0] || { label: 'Standard', price: product.price };
    addToCart(product, 1, defaultSize);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <div className="product-card-img-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
          />
          <div className="position-absolute top-0 start-0 p-2 d-flex gap-1 flex-wrap">
            <span className="badge bg-dark bg-opacity-75 text-light">
              {product.category}
            </span>
            {product.badge && (
              <span
                className="badge"
                style={{
                  backgroundColor: product.available ? '#C58B52' : '#dc3545',
                  color: '#fff'
                }}
              >
                {product.badge}
              </span>
            )}
          </div>
          <div className="position-absolute bottom-0 end-0 p-2">
            {product.available ? (
              <span className="badge bg-success">Available</span>
            ) : (
              <span className="badge bg-danger">Sold Out</span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-3 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
          <h5 className="mb-0 fw-bold fs-6">
            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
              {product.name}
            </Link>
          </h5>
        </div>

        <p className="text-muted small mb-3 flex-grow-1">
          {product.description}
        </p>

        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
          <div>
            <span className="text-muted small d-block" style={{ fontSize: '0.72rem' }}>
              Starting at
            </span>
            <span className="product-price-tag">
              {shopConfig.currency} {product.price.toLocaleString()}
            </span>
          </div>

          <div className="d-flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="btn btn-sm btn-outline-secondary rounded-3 px-2"
              title="View Options & Details"
            >
              Details
            </Link>
            <button
              type="button"
              className="btn btn-sm btn-psl-primary px-3"
              disabled={!product.available}
              onClick={handleQuickAdd}
            >
              {product.available ? (
                <>
                  <i className="bi bi-cart-plus me-1"></i> Add
                </>
              ) : (
                'Unavailable'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

