import React from 'react';
import { categories } from '../data/categories';

export default function CategoryTabs({ selectedCategory, onSelectCategory, counts = {} }) {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center" role="tablist" aria-label="Menu Categories">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        const count = counts[cat.id];
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`category-pill d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <i className={`bi ${cat.icon}`}></i>
            <span>{cat.name}</span>
            {typeof count === 'number' && (
              <span
                className={`badge rounded-pill ${
                  isActive ? 'bg-light text-dark' : 'bg-secondary bg-opacity-25 text-dark'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

