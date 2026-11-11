import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  shopConfig as defaultConfig,
  categories as defaultCategories,
  specialCombos as defaultDeals,
  heroSlides as defaultSlides
} from '../data/categories';
import { products as defaultProducts } from '../data/products';

const CMS_STORAGE_KEY = 'psl_cloudflare_cms_v1';
const CMS_AUTH_KEY = 'psl_cloudflare_cms_auth';

export function getCmsData() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        shopConfig: { ...defaultConfig, ...(parsed.shopConfig || {}) },
        categories: parsed.categories?.length ? parsed.categories : defaultCategories,
        products: parsed.products?.length ? parsed.products : defaultProducts,
        specialCombos: parsed.specialCombos?.length ? parsed.specialCombos : defaultDeals,
        heroSlides: parsed.heroSlides?.length ? parsed.heroSlides : defaultSlides
      };
    }
  } catch (e) {
    console.error(e);
  }
  return {
    shopConfig: defaultConfig,
    categories: defaultCategories,
    products: defaultProducts,
    specialCombos: defaultDeals,
    heroSlides: defaultSlides
  };
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(CMS_AUTH_KEY) === 'true'
  );
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('psl123');
  const [loginError, setLoginError] = useState('');

  const [cms, setCms] = useState(() => getCmsData());
  const [activeTab, setActiveTab] = useState('menu');
  const [bannerMsg, setBannerMsg] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Menu Item Form State
  const [itemForm, setItemForm] = useState({
    id: '',
    name: '',
    category: 'Coffee',
    price: 499,
    description: '',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    badge: '',
    available: true,
    featured: false
  });

  // Category Form State
  const [catForm, setCatForm] = useState({
    id: '',
    name: '',
    icon: 'bi-cup-hot-fill',
    description: '',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
  });

  // Deal Form State
  const [dealForm, setDealForm] = useState({
    id: '',
    title: '',
    comboPrice: 1599,
    originalPrice: 1850,
    badge: 'Special Combo',
    itemsText: ''
  });

  // Slider Form State
  const [slideForm, setSlideForm] = useState({
    id: '',
    title: '',
    subtitle: '',
    badge: 'PSL Coffee Bar • Pour, Sip & Leaf',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80'
  });

  const saveCms = (nextCms, message = 'Changes saved to CMS!') => {
    setCms(nextCms);
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(nextCms));
    window.dispatchEvent(new Event('psl-cms-updated'));
    setBannerMsg(message);
    setTimeout(() => setBannerMsg(''), 3500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const expectedUser = cms.shopConfig.adminUsername || 'admin';
    const expectedPass = cms.shopConfig.adminPassword || 'psl123';
    if (username.toLowerCase() === expectedUser.toLowerCase() && password === expectedPass) {
      sessionStorage.setItem(CMS_AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Default is admin / psl123');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(CMS_AUTH_KEY);
    setIsAuthenticated(false);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const priceNum = Number(itemForm.price) || 0;
    const newItem = {
      ...itemForm,
      id: itemForm.id || `item-${Date.now()}`,
      price: priceNum,
      sizes: [{ label: 'Standard', price: priceNum }]
    };

    const exists = cms.products.some((p) => p.id === newItem.id);
    const nextProducts = exists
      ? cms.products.map((p) => (p.id === newItem.id ? newItem : p))
      : [newItem, ...cms.products];

    saveCms({ ...cms, products: nextProducts }, exists ? `Updated "${newItem.name}"` : `Added "${newItem.name}"`);
    setEditingItem(null);
    setItemForm({
      id: '',
      name: '',
      category: 'Coffee',
      price: 499,
      description: '',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      badge: '',
      available: true,
      featured: false
    });
  };

  const startEditItem = (item) => {
    setEditingItem(item);
    setItemForm({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description || '',
      image: item.image || '',
      badge: item.badge || '',
      available: item.available !== false,
      featured: !!item.featured
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteItem = (id, name) => {
    if (!window.confirm(`Delete "${name}" from the menu?`)) return;
    const nextProducts = cms.products.filter((p) => p.id !== id);
    saveCms({ ...cms, products: nextProducts }, `Deleted "${name}"`);
  };

  const handleToggleStock = (id) => {
    const nextProducts = cms.products.map((p) =>
      p.id === id ? { ...p, available: !p.available } : p
    );
    saveCms({ ...cms, products: nextProducts }, 'Updated item stock status');
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    const id = catForm.name.trim();
    const newCat = { ...catForm, id, name: id };
    const exists = cms.categories.some((c) => c.id.toLowerCase() === id.toLowerCase());
    const nextCats = exists
      ? cms.categories.map((c) => (c.id.toLowerCase() === id.toLowerCase() ? newCat : c))
      : [...cms.categories, newCat];
    saveCms({ ...cms, categories: nextCats }, `Saved category "${id}"`);
    setCatForm({
      id: '',
      name: '',
      icon: 'bi-cup-hot-fill',
      description: '',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
    });
  };

  const handleDeleteCategory = (id) => {
    if (id === 'All') return;
    const nextCats = cms.categories.filter((c) => c.id !== id);
    saveCms({ ...cms, categories: nextCats }, `Deleted category "${id}"`);
  };

  const handleSaveDeal = (e) => {
    e.preventDefault();
    const items = dealForm.itemsText
      .split('\n')
      .map((s) => s.trim().replace(/^[✓•-]\s*/, ''))
      .filter(Boolean);
    const newDeal = {
      id: dealForm.id || `deal-${Date.now()}`,
      title: dealForm.title,
      comboPrice: Number(dealForm.comboPrice) || 1199,
      originalPrice: Number(dealForm.originalPrice) || 1450,
      badge: dealForm.badge || 'Special Deal',
      items,
      subtitle: items.map((i) => `✓ ${i}`).join(' • ')
    };
    const nextDeals = [...cms.specialCombos, newDeal];
    saveCms({ ...cms, specialCombos: nextDeals }, `Added deal "${newDeal.title}"`);
    setDealForm({ id: '', title: '', comboPrice: 1599, originalPrice: 1850, badge: 'Special Combo', itemsText: '' });
  };

  const handleDeleteDeal = (id) => {
    const nextDeals = cms.specialCombos.filter((d) => d.id !== id);
    saveCms({ ...cms, specialCombos: nextDeals }, 'Removed deal');
  };

  const handleSaveSlide = (e) => {
    e.preventDefault();
    const newSlide = {
      id: `slide-${Date.now()}`,
      title: slideForm.title,
      subtitle: slideForm.subtitle,
      badge: slideForm.badge,
      image: slideForm.image,
      ctaText: 'Explore Menu',
      ctaLink: '/menu'
    };
    saveCms({ ...cms, heroSlides: [...cms.heroSlides, newSlide] }, `Added slider "${newSlide.title}"`);
    setSlideForm({
      id: '',
      title: '',
      subtitle: '',
      badge: 'PSL Coffee Bar • Pour, Sip & Leaf',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80'
    });
  };

  const handleDeleteSlide = (id) => {
    const nextSlides = cms.heroSlides.filter((s) => s.id !== id);
    saveCms({ ...cms, heroSlides: nextSlides }, 'Removed hero slide');
  };

  const handleResetDefaults = () => {
    if (!window.confirm('Reset all CMS data back to PSL Web publish.doc defaults?')) return;
    localStorage.removeItem(CMS_STORAGE_KEY);
    const fresh = {
      shopConfig: defaultConfig,
      categories: defaultCategories,
      products: defaultProducts,
      specialCombos: defaultDeals,
      heroSlides: defaultSlides
    };
    setCms(fresh);
    window.dispatchEvent(new Event('psl-cms-updated'));
    setBannerMsg('Reset to default PSL Web publish.doc data!');
  };

  if (!isAuthenticated) {
    return (
      <div className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                <div className="text-center mb-4">
                  <img
                    src={cms.shopConfig.logo || '/logo.png'}
                    alt={cms.shopConfig.name}
                    className="rounded-circle border border-warning shadow-sm mb-3"
                    style={{ width: '84px', height: '84px', objectFit: 'cover' }}
                  />
                  <h3 className="fw-bold mb-1">{cms.shopConfig.name} CMS</h3>
                  <p className="text-muted small mb-0">
                    Sign in to manage menu items, categories, sliders, deals & settings
                  </p>
                </div>

                {loginError && <div className="alert alert-danger small py-2">{loginError}</div>}

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="p-2 rounded-3 bg-psl-cream small mb-3 text-center">
                    Default Credentials: <strong>admin</strong> / <strong>psl123</strong>
                  </div>
                  <button type="submit" className="btn btn-psl-primary w-100 py-2">
                    <i className="bi bi-unlock-fill me-2"></i>Login to CMS Dashboard
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const realCategories = cms.categories.filter((c) => c.id !== 'All');

  return (
    <div className="py-4">
      <div className="container">
        {/* Top CMS Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center bg-psl-brown text-white p-4 rounded-4 shadow-sm mb-4">
          <div className="d-flex align-items-center gap-3">
            <img
              src={cms.shopConfig.logo || '/logo.png'}
              alt="Logo"
              className="rounded-circle border border-warning"
              style={{ width: '56px', height: '56px', objectFit: 'cover' }}
            />
            <div>
              <span className="badge bg-warning text-dark mb-1">PSL Coffee Bar — CMS Portal</span>
              <h3 className="fw-bold mb-0 text-white">{cms.shopConfig.name} — Content Management System</h3>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2 mt-3 mt-lg-0">
            <Link to="/" className="btn btn-outline-light">
              <i className="bi bi-box-arrow-up-right me-1"></i>View Live Website
            </Link>
            <button type="button" className="btn btn-outline-warning" onClick={handleResetDefaults}>
              <i className="bi bi-arrow-counterclockwise me-1"></i>Reset Defaults
            </button>
            <button type="button" className="btn btn-danger" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
          </div>
        </div>

        {bannerMsg && (
          <div className="alert alert-success rounded-3 shadow-sm">
            <i className="bi bi-check-circle-fill me-2"></i>
            {bannerMsg}
          </div>
        )}

        {/* Stats Row */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="text-muted small">Total Menu Items</div>
              <div className="fs-2 fw-bold" style={{ color: '#0E2A1E' }}>{cms.products.length}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="text-muted small">Categories</div>
              <div className="fs-2 fw-bold" style={{ color: '#D4AF37' }}>{realCategories.length}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="text-muted small">Hero Sliders</div>
              <div className="fs-2 fw-bold text-success">{cms.heroSlides.length}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="text-muted small">Active Deals</div>
              <div className="fs-2 fw-bold text-primary">{cms.specialCombos.length}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-pills gap-2 mb-4 bg-white p-2 rounded-4 shadow-sm">
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'menu' ? 'active bg-dark text-white' : 'text-dark'}`}
              onClick={() => setActiveTab('menu')}
            >
              <i className="bi bi-cup-hot-fill me-1"></i>Menu Items ({cms.products.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'categories' ? 'active bg-dark text-white' : 'text-dark'}`}
              onClick={() => setActiveTab('categories')}
            >
              <i className="bi bi-tags-fill me-1"></i>Categories ({realCategories.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'deals' ? 'active bg-dark text-white' : 'text-dark'}`}
              onClick={() => setActiveTab('deals')}
            >
              <i className="bi bi-stars me-1"></i>Deals ({cms.specialCombos.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'sliders' ? 'active bg-dark text-white' : 'text-dark'}`}
              onClick={() => setActiveTab('sliders')}
            >
              <i className="bi bi-images me-1"></i>Hero Sliders ({cms.heroSlides.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === 'settings' ? 'active bg-dark text-white' : 'text-dark'}`}
              onClick={() => setActiveTab('settings')}
            >
              <i className="bi bi-gear-fill me-1"></i>Branding & Contact
            </button>
          </li>
        </ul>

        {/* TAB 1: MENU ITEMS */}
        {activeTab === 'menu' && (
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-3">
                  {editingItem ? `Edit: ${editingItem.name}` : 'Add New Menu Item'}
                </h5>
                <form onSubmit={handleSaveItem}>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Item Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={itemForm.name}
                      onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="row g-2 mb-2">
                    <div className="col-7">
                      <label className="form-label small fw-semibold">Category</label>
                      <select
                        className="form-select form-select-sm"
                        value={itemForm.category}
                        onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                      >
                        {realCategories.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-5">
                      <label className="form-label small fw-semibold">Price ({cms.shopConfig.currency})</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={itemForm.price}
                        onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea
                      rows="2"
                      className="form-control form-control-sm"
                      value={itemForm.description}
                      onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Image URL</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={itemForm.image}
                      onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Badge (optional)</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={itemForm.badge}
                      onChange={(e) => setItemForm({ ...itemForm, badge: e.target.value })}
                    />
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={itemForm.available}
                        onChange={(e) => setItemForm({ ...itemForm, available: e.target.checked })}
                        id="chkStock"
                      />
                      <label className="form-check-label small" htmlFor="chkStock">In Stock</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={itemForm.featured}
                        onChange={(e) => setItemForm({ ...itemForm, featured: e.target.checked })}
                        id="chkFeat"
                      />
                      <label className="form-check-label small" htmlFor="chkFeat">Featured</label>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-psl-primary btn-sm w-100">
                      {editingItem ? 'Update Item' : 'Add Item'}
                    </button>
                    {editingItem && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setEditingItem(null)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-3">All Menu Items ({cms.products.length})</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle small">
                    <thead className="table-light">
                      <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cms.products.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="rounded-2"
                                style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                              />
                              <span className="fw-bold">{item.name}</span>
                            </div>
                          </td>
                          <td><span className="badge bg-secondary bg-opacity-25 text-dark">{item.category}</span></td>
                          <td className="fw-bold">{cms.shopConfig.currency} {item.price}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleToggleStock(item.id)}
                              className={`btn btn-sm py-0 px-2 ${item.available ? 'btn-outline-success' : 'btn-outline-danger'}`}
                            >
                              {item.available ? 'In Stock' : 'Sold Out'}
                            </button>
                          </td>
                          <td className="text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary py-0 px-2 me-1"
                              onClick={() => startEditItem(item)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger py-0 px-2"
                              onClick={() => handleDeleteItem(item.id, item.name)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-3">Add / Update Category</h5>
                <form onSubmit={handleSaveCategory}>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Category Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={catForm.name}
                      onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea
                      rows="2"
                      className="form-control form-control-sm"
                      value={catForm.description}
                      onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-psl-primary btn-sm w-100">Save Category</button>
                </form>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-3">Menu Categories ({realCategories.length})</h5>
                <div className="table-responsive">
                  <table className="table align-middle small">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {realCategories.map((c) => (
                        <tr key={c.id}>
                          <td className="fw-bold">{c.name}</td>
                          <td className="text-muted">{c.description}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger py-0 px-2"
                              onClick={() => handleDeleteCategory(c.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEALS */}
        {activeTab === 'deals' && (
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-3">Add Special Deal</h5>
                <form onSubmit={handleSaveDeal}>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Deal Title</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={dealForm.title}
                      onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Deal Price ({cms.shopConfig.currency})</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={dealForm.comboPrice}
                      onChange={(e) => setDealForm({ ...dealForm, comboPrice: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Included Items (one per line)</label>
                    <textarea
                      rows="4"
                      className="form-control form-control-sm"
                      value={dealForm.itemsText}
                      onChange={(e) => setDealForm({ ...dealForm, itemsText: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-psl-primary btn-sm w-100">Save Deal</button>
                </form>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {cms.specialCombos.map((d) => (
                  <div className="col-12" key={d.id}>
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="fw-bold mb-0">{d.title} — {cms.shopConfig.currency} {d.comboPrice}</h5>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteDeal(d.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                      <p className="small text-muted mb-0">{d.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SLIDERS */}
        {activeTab === 'sliders' && (
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-3">Add Hero Slider</h5>
                <form onSubmit={handleSaveSlide}>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Title</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={slideForm.title}
                      onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Subtitle</label>
                    <textarea
                      rows="3"
                      className="form-control form-control-sm"
                      value={slideForm.subtitle}
                      onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-psl-primary btn-sm w-100">Add Slider</button>
                </form>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-3">
                {cms.heroSlides.map((s) => (
                  <div className="col-md-6" key={s.id}>
                    <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
                      <h6 className="fw-bold">{s.title}</h6>
                      <p className="small text-muted flex-grow-1">{s.subtitle}</p>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger align-self-start"
                        onClick={() => handleDeleteSlide(s.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-bold mb-3">Company Branding & Contact Settings</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveCms(cms, 'Updated Company Branding & Contact settings!');
              }}
            >
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cms.shopConfig.name}
                    onChange={(e) =>
                      setCms({ ...cms, shopConfig: { ...cms.shopConfig, name: e.target.value } })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Phone Display</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cms.shopConfig.phoneDisplay}
                    onChange={(e) =>
                      setCms({ ...cms, shopConfig: { ...cms.shopConfig, phoneDisplay: e.target.value } })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">WhatsApp Number (Intl)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cms.shopConfig.whatsappNumber}
                    onChange={(e) =>
                      setCms({ ...cms, shopConfig: { ...cms.shopConfig, whatsappNumber: e.target.value } })
                    }
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-psl-primary px-4">
                    Save Settings
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
