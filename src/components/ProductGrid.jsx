import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import { shoes } from '../data/shoes'
import { Sparkles, SlidersHorizontal } from 'lucide-react'
import './ProductGrid.css'

const categories = ['All', 'New', 'Limited', 'Drop', 'Classic']

export default function ProductGrid({ onOpenQuickView, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredShoes = activeCategory === 'All'
    ? shoes
    : shoes.filter((shoe) => shoe.category === activeCategory || shoe.tag === activeCategory)

  return (
    <section id="shop" className="product-grid-section">
      <div className="product-grid__header">
        <div className="product-grid__title-wrap">
          <div className="product-grid__badge">
            <Sparkles size={12} />
            <span>Curated Catalog</span>
          </div>
          <h2 className="product-grid__title">Studio Collection</h2>
        </div>

        {/* Category Filter Tabs with Sliding Active Pill */}
        <div className="product-grid__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`product-grid__filter-btn ${activeCategory === cat ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {activeCategory === cat && (
                <motion.div
                  className="product-grid__filter-active-pill"
                  layoutId="activeFilterPill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="product-grid__filter-text">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <motion.div className="product-grid" layout>
        <AnimatePresence>
          {filteredShoes.map((shoe) => (
            <ProductCard
              key={shoe.id}
              shoe={shoe}
              onOpenQuickView={onOpenQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
