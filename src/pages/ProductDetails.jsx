import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { shopConfig } from '../data/categories';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedSize(
        product.sizes && product.sizes.length > 0
          ? product.sizes[0]
          : { label: 'Standard', price: product.price }
      );
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="bg-white rounded-4 shadow-sm p-5 mx-auto" style={{ maxWidth: '520px' }}>
          <i className="bi bi-exclamation-circle display-4 text-warning"></i>
          <h2 className="fw-bold mt-3">Product Not Found</h2>
          <p className="text-muted mb-4">
            We couldn't find the menu item you're looking for.
          </p>
          <Link to="/menu" className="btn btn-psl-primary">
            Back to Full Menu
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = selectedSize ? selectedSize.price : product.price;
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAdd = () => {
    if (!product.available) return;
    addToCart(product, quantity, selectedSize);
  };

  const handleOrderNow = () => {
    if (!product.available) return;
    addToCart(product, quantity, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none" style={{ color: '#5B3424' }}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/menu?category=${encodeURIComponent(product.category)}`}
                className="text-decoration-none"
                style={{ color: '#5B3424' }}
              >
                {product.category}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
          <div className="row g-0">
            <div className="col-lg-6 bg-psl-cream">
              <img
                src={product.image}
                alt={product.name}
                className="w-100 h-100"
                style={{ objectFit: 'cover', minHeight: '340px', maxHeight: '500px' }}
              />
            </div>

            <div className="col-lg-6">
              <div className="card-body p-4 p-lg-5 d-flex flex-column h-100">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-dark">{product.category}</span>
                  {product.available ? (
                    <span className="badge bg-success">
                      <i className="bi bi-check-circle me-1"></i>Available
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      <i className="bi bi-x-circle me-1"></i>Sold Out
                    </span>
                  )}
                  {product.badge && (
                    <span className="badge" style={{ backgroundColor: '#C58B52' }}>
                      {product.badge}
                    </span>
                  )}
                </div>

                <h1 className="fw-bold h2 mb-2">{product.name}</h1>

                <div className="fs-3 fw-bold mb-3" style={{ color: '#5B3424' }}>
                  {shopConfig.currency} {(currentPrice * quantity).toLocaleString()}
                  {quantity > 1 && (
                    <span className="fs-6 text-muted fw-normal ms-2">
                      ({shopConfig.currency} {currentPrice} each)
                    </span>
                  )}
                </div>

                <p className="text-muted mb-4">
                  {product.longDescription || product.description}
                </p>

                {/* Serving Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">
                      Select Size / Serving Option
                    </label>
                    <div className="d-flex flex-wrap gap-2">
                      {product.sizes.map((size) => {
                        const isSelected = selectedSize?.label === size.label;
                        return (
                          <button
                            key={size.label}
                            type="button"
                            className={`btn btn-sm rounded-3 px-3 py-2 ${
                              isSelected ? 'btn-psl-primary' : 'btn-outline-secondary'
                            }`}
                            onClick={() => setSelectedSize(size)}
                          >
                            <div>{size.label}</div>
                            <div className="small opacity-85">
                              {shopConfig.currency} {size.price}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity & Actions */}
                <div className="row g-3 align-items-end mt-auto pt-3 border-top">
                  <div className="col-sm-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">
                      Quantity
                    </label>
                    <div className="input-group">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={!product.available || quantity <= 1}
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="form-control text-center fw-bold">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={!product.available}
                        onClick={() => setQuantity((q) => q + 1)}
                        aria-label="Increase quantity"
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-sm-8 d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-psl-primary flex-grow-1"
                      disabled={!product.available}
                      onClick={handleAdd}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      {product.available ? 'Add to Cart' : 'Sold Out'}
                    </button>
                    {product.available && (
                      <button
                        type="button"
                        className="btn btn-psl-accent"
                        onClick={handleOrderNow}
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="fw-bold mb-3">More from {product.category}</h3>
            <div className="row g-4">
              {relatedProducts.map((rel) => (
                <div className="col-sm-6 col-lg-4" key={rel.id}>
                  <ProductCard product={rel} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

