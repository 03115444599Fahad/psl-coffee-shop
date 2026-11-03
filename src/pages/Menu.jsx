import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat) {
      setSelectedCategory(paramCat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesAvailability = !onlyAvailable || product.available;

      return matchesCategory && matchesSearch && matchesAvailability;
    });
  }, [selectedCategory, searchQuery, onlyAvailable]);

  return (
    <div className="py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-4">
          <span className="text-uppercase fw-bold small" style={{ color: '#C58B52' }}>
            Freshly Prepared
          </span>
          <h1 className="fw-bold mt-1">Our Menu</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '580px' }}>
            Explore our freshly roasted coffees, signature Doodh Patti & herbal teas, and crispy snacks. Filter by category or search for your favorite item below.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-4">
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            counts={categoryCounts}
          />
        </div>

        {/* Search & Availability Filter Bar */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <div className="row g-3 align-items-center">
            <div className="col-md-7">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="search"
                  className="form-control border-start-0"
                  placeholder="Search coffee, doodh patti, chips, sandwiches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search menu items"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="col-md-5 d-flex justify-content-md-end align-items-center justify-content-between">
              <div className="form-check form-switch mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="availableOnlySwitch"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                />
                <label className="form-check-label small fw-medium" htmlFor="availableOnlySwitch">
                  In-stock items only
                </label>
              </div>

              <span className="badge bg-psl-cream text-dark px-3 py-2">
                Showing {filteredProducts.length} item{filteredProducts.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-sm-6 col-lg-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm p-4">
            <i className="bi bi-cup-hot display-4 text-muted"></i>
            <h4 className="fw-bold mt-3">No matching menu items found</h4>
            <p className="text-muted mb-3">
              Try clearing your search filter or switching to "All Items".
            </p>
            <button
              type="button"
              className="btn btn-psl-primary"
              onClick={() => {
                handleCategoryChange('All');
                setSearchQuery('');
                setOnlyAvailable(false);
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

