import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, Plus } from 'lucide-react'
import './ProductCard.css'

const accentMap = {
  sage: 'var(--accent-sage)',
  clay: 'var(--accent-clay)',
  slate: 'var(--accent-slate)',
  taupe: 'var(--accent-taupe)',
}

export default function ProductCard({ shoe, onOpenQuickView, onAddToCart }) {
  const accent = accentMap[shoe.accent] || accentMap.sage
  const cardRef = useRef(null)

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -y * 12, y: x * 12 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.article
      ref={cardRef}
      className="product-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -6 : 0}px)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out'
      }}
    >
      <div className="product-card__image-wrap">
        {shoe.tag && (
          <span className="product-card__tag" style={{ color: accent, borderColor: accent }}>
            {shoe.tag}
          </span>
        )}

        {/* Ambient card back glow */}
        <div
          className="product-card__glow"
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
        />

        {/* Shoe Image */}
        <img
          src={shoe.image}
          alt={shoe.name}
          className="product-card__image"
          style={{
            transform: isHovered ? 'translateY(-6px) scale(1.06)' : 'translateY(0) scale(1)'
          }}
        />

        {/* Floating Shadow */}
        <div className={`product-card__shadow ${isHovered ? 'is-lifted' : ''}`} />

        {/* Quick View & Add Hover Actions */}
        <div className={`product-card__actions ${isHovered ? 'is-visible' : ''}`}>
          <button
            className="product-card__action-btn"
            onClick={(e) => {
              e.stopPropagation()
              onOpenQuickView(shoe)
            }}
            title="Quick View"
          >
            <Eye size={16} />
            <span>Quick View</span>
          </button>
          <button
            className="product-card__action-btn product-card__action-btn--icon"
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(shoe)
            }}
            title="Add to Cart"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="product-card__info" onClick={() => onOpenQuickView(shoe)}>
        <p className="product-card__brand">{shoe.brand}</p>
        <h3 className="product-card__name">{shoe.name}</h3>
        <p className="product-card__price" style={{ color: accent }}>
          ${shoe.price}
        </p>
      </div>
    </motion.article>
  )
}
