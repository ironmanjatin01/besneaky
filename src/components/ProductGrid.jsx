import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import { products } from '../data/shoes'
import { Sparkles, Shirt, Sparkle } from 'lucide-react'
import './ProductGrid.css'

const mainTabs = [
  { id: 'All', label: 'All Catalog', icon: Sparkles },
  { id: 'garments', label: "Men's Garments", icon: Shirt },
  { id: 'cosmetics', label: "Women's Cosmetics", icon: Sparkle }
]

export default function ProductGrid({ onOpenQuickView, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('All')

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter((p) => p.type === activeTab || p.category === activeTab)

  return (
    <section id="shop" className="product-grid-section">
      <div className="product-grid__header">
        <div className="product-grid__title-wrap">
          <div className="product-grid__badge">
            <Sparkles size={12} />
            <span>Curated Collection</span>
          </div>
          <h2 className="product-grid__title">Studio Collection</h2>
        </div>

        {/* Primary Category Tabs: Garments (Clothes) & Cosmetics */}
        <div className="product-grid__filters">
          {mainTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                className={`product-grid__filter-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {isActive && (
                  <motion.div
                    className="product-grid__filter-active-pill"
                    layoutId="activeFilterPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={14} className="filter-tab-icon" />
                <span className="product-grid__filter-text">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Product Cards Grid */}
      <motion.div className="product-grid" layout>
        <AnimatePresence>
          {filteredProducts.map((shoe) => (
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
