import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import { useCart } from './context/CartContext';

export default function App() {
  const { toastMessage, setToastMessage } = useCart();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Floating Cart / Toast Notification */}
      {toastMessage && (
        <div className="psl-toast-container" role="status" aria-live="polite">
          <div className="psl-toast d-flex align-items-center justify-content-between gap-3">
            <div className="small">
              <i className="bi bi-check-circle-fill text-warning me-2"></i>
              {toastMessage}
            </div>
            <div className="d-flex align-items-center gap-2">
              <Link
                to="/cart"
                className="btn btn-sm btn-psl-accent py-1 px-2"
                onClick={() => setToastMessage(null)}
              >
                View Cart
              </Link>
              <button
                type="button"
                className="btn-close btn-close-white btn-sm"
                aria-label="Close notification"
                onClick={() => setToastMessage(null)}
              ></button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

