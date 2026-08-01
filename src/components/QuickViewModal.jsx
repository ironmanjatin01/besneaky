import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Check, Sparkles, Star } from 'lucide-react'
import confetti from 'canvas-confetti'
import './QuickViewModal.css'

export default function QuickViewModal({ shoe, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(shoe?.sizes ? shoe.sizes[2] || shoe.sizes[0] : 9)
  const [added, setAdded] = useState(false)

  if (!shoe) return null

  const handleAdd = () => {
    onAddToCart({ ...shoe, selectedSize })
    setAdded(true)
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    })
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <AnimatePresence>
      <div className="quickview-overlay" onClick={onClose}>
        <motion.div
          className="quickview-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="quickview-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          <div className="quickview-grid">
            {/* Visual Stage */}
            <div className="quickview-stage">
              <div
                className="quickview-glow"
                style={{ background: `radial-gradient(circle, var(--accent-${shoe.accent}) 0%, transparent 70%)` }}
              />

              {shoe.tag && <span className="quickview-tag">{shoe.tag}</span>}

              <motion.img
                src={shoe.image}
                alt={shoe.name}
                className="quickview-img"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="quickview-shadow" />
            </div>

            {/* Product Details */}
            <div className="quickview-details">
              <span className="quickview-brand">{shoe.brand}</span>
              <h2 className="quickview-title">{shoe.name}</h2>
              <div className="quickview-price">${shoe.price}</div>

              <p className="quickview-desc">{shoe.description}</p>

              {/* Specs */}
              {shoe.details && (
                <div className="quickview-specs">
                  {shoe.details.map((spec, i) => (
                    <div key={i} className="quickview-spec-item">
                      <Sparkles size={12} className="quickview-spec-icon" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Sizes */}
              {shoe.sizes && (
                <div className="quickview-size-section">
                  <div className="quickview-size-header">
                    <span>Select Size (US)</span>
                    <span className="quickview-size-guide">True to size</span>
                  </div>

                  <div className="quickview-sizes">
                    {shoe.sizes.map((sz) => (
                      <button
                        key={sz}
                        className={`quickview-size-btn ${selectedSize === sz ? 'is-selected' : ''}`}
                        onClick={() => setSelectedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <button
                className={`quickview-add-btn ${added ? 'is-added' : ''}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Cart — ${shoe.price}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
