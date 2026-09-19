import { useState, useMemo } from 'react'
import { COFFEE_CATEGORIES, COFFEE_ITEMS } from '../data/coffeeData'
import ProductCard from './ProductCard'
import { Search, Filter, Coffee, Sparkles } from 'lucide-react'
import './ProductGrid.css'

export default function ProductGrid({ onOpenQuickView, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  // Filter & Sort items
  const filteredItems = useMemo(() => {
    return COFFEE_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tastingNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'intensity') return (b.intensity || 0) - (a.intensity || 0)
      return b.rating - a.rating // popular
    })
  }, [activeCategory, searchQuery, sortBy])

  return (
    <section className="product-grid" id="shop">
      <div className="product-grid__container">
        {/* Section Header */}
        <div className="product-grid__header">
          <span className="product-grid__badge">
            <Coffee size={14} /> Artisan Menu
          </span>
          <h2 className="product-grid__title">The Coffee Vault & Bakery</h2>
          <p className="product-grid__desc">
            Explore single-origin espresso roasts, slow cold brew extractions, precision pour-overs, and daily French baked pairings.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="product-grid__controls">
          {/* Category Tabs */}
          <div className="product-grid__categories">
            {COFFEE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="product-grid__search-sort">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search roasts, notes, origins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                  ×
                </button>
              )}
            </div>

            <div className="sort-box">
              <Filter size={14} className="sort-icon" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popular">Most Popular ★</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="intensity">Highest Intensity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredItems.length > 0 ? (
          <div className="product-grid__cards">
            {filteredItems.map((coffee) => (
              <ProductCard
                key={coffee.id}
                coffee={coffee}
                onOpenQuickView={onOpenQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="product-grid__empty">
            <Sparkles size={40} className="empty-icon" />
            <h3>No Coffees Found</h3>
            <p>We couldn't find any coffee matching "{searchQuery}". Try resetting your search filter.</p>
            <button className="reset-btn" onClick={() => { setActiveCategory('all'); setSearchQuery('') }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
