import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Sparkles } from 'lucide-react'
import './ProductCard.css'

export default function ProductCard({ shoe, onOpenQuickView }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -y * 10, y: x * 10 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.article
      ref={cardRef}
      className="product-card ramayan-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35 }}
      onClick={() => onOpenQuickView(shoe)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -6 : 0}px)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out'
      }}
    >
      <div className="product-card__image-wrap ramayan-card__image-wrap">
        <span className="product-card__tag ramayan-card__kanda-badge">
          {shoe.kanda}
        </span>

        {/* Story Illustration Image */}
        <img
          src={shoe.image}
          alt={shoe.title}
          className="product-card__image ramayan-card__img"
          style={{
            transform: isHovered ? 'scale(1.06)' : 'scale(1)'
          }}
        />

        {/* Read Time Tag */}
        <div className="ramayan-card__read-time">
          <Clock size={12} />
          <span>{shoe.readTime || '6 min read'}</span>
        </div>
      </div>

      <div className="product-card__info ramayan-card__info">
        <div className="ramayan-card__shloka-preview">
          <Sparkles size={12} className="shloka-star" />
          <span>{shoe.sanskritShloka}</span>
        </div>

        <h3 className="product-card__name ramayan-card__title">{shoe.title}</h3>
        <p className="ramayan-card__subtitle">{shoe.subtitle}</p>

        <div className="ramayan-card__footer">
          <button className="ramayan-card__read-btn">
            <BookOpen size={14} />
            <span>Read Chapter</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
