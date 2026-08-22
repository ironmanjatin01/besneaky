import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import { ramayanPosts } from '../data/ramayanPosts'
import { Sparkles, BookOpen, Scroll, Flame, Sun } from 'lucide-react'
import './ProductGrid.css'

const kandaTabs = [
  { id: 'All', label: 'All Chapters', icon: Sparkles },
  { id: 'Bala Kanda', label: 'Bala Kanda', icon: BookOpen },
  { id: 'Ayodhya Kanda', label: 'Ayodhya Kanda', icon: Scroll },
  { id: 'Aranya Kanda', label: 'Aranya Kanda', icon: Flame },
  { id: 'Sundara Kanda', label: 'Sundara Kanda', icon: Sparkles },
  { id: 'Yuddha Kanda', label: 'Yuddha Kanda', icon: Flame },
  { id: 'Uttara Kanda', label: 'Ramrajya', icon: Sun }
]

export default function ProductGrid({ onOpenQuickView }) {
  const [activeTab, setActiveTab] = useState('All')

  const filteredPosts = activeTab === 'All'
    ? ramayanPosts
    : ramayanPosts.filter((p) => p.kanda.toLowerCase().includes(activeTab.toLowerCase()) || p.tags.includes(activeTab))

  return (
    <section id="shop" className="product-grid-section">
      <div className="product-grid__header">
        <div className="product-grid__title-wrap">
          <div className="product-grid__badge">
            <Sparkles size={12} />
            <span>Sacred Verses & Stories</span>
          </div>
          <h2 className="product-grid__title">The Seven Kandas</h2>
        </div>

        {/* Kanda Filter Tabs */}
        <div className="product-grid__filters">
          {kandaTabs.map((tab) => {
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

      {/* Ramayan Story Cards Grid */}
      <motion.div className="product-grid" layout>
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <ProductCard
              key={post.id}
              shoe={post}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
