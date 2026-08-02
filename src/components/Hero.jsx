import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Rotate3d, ShieldCheck, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { shoes } from '../data/shoes'
import confetti from 'canvas-confetti'
import './Hero.css'

export default function Hero({ onOpenQuickView }) {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0)
  const currentShoe = shoes[selectedHeroIndex] || shoes[0]
  const containerRef = useRef(null)

  // 3D tilt states
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHoveringShoe, setIsHoveringShoe] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -y * 22, y: x * 22 })
  }

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return
    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = (touch.clientX - rect.left) / rect.width - 0.5
    const y = (touch.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -y * 25, y: x * 25 })
    setIsHoveringShoe(true)
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHoveringShoe(false)
  }

  const nextShoe = (e) => {
    e?.stopPropagation()
    setSelectedHeroIndex((prev) => (prev + 1) % shoes.length)
  }

  const prevShoe = (e) => {
    e?.stopPropagation()
    setSelectedHeroIndex((prev) => (prev - 1 + shoes.length) % shoes.length)
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#a8b5a0', '#c4a99a', '#9aa8b5', '#b5a48f']
    })
  }

  return (
    <section className="hero" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="hero__container">
        {/* Left Column: Text & CTAs */}
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Sparkles className="hero__badge-icon" size={14} />
            <span>2026 Besneaky Studio Edition</span>
          </motion.div>

          <h1 className="hero__title">
            Move in silence,
            <br />
            Don't Tell Anyone<span className="hero__accent">, besneaky.</span>
          </h1>

          <p className="hero__sub">
            Curated designer sneakers engineered for quiet moves, precision, and distinct style.
          </p>

          {/* Action buttons */}
          <div className="hero__actions">
            <a
              href="#shop"
              className="hero__cta hero__cta--primary"
              onClick={triggerConfetti}
            >
              <span>Explore Collection</span>
              <ArrowRight size={15} className="hero__cta-arrow" />
            </a>

            <button
              className="hero__cta hero__cta--secondary"
              onClick={() => onOpenQuickView(currentShoe)}
            >
              <Rotate3d size={15} />
              <span>360° Quick View</span>
            </button>
          </div>

          {/* Featured Shoe Selector Pills - All Shoes */}
          <div className="hero__selector">
            <div className="hero__selector-top">
              <span className="hero__selector-label">Featured Model ({selectedHeroIndex + 1} of {shoes.length}):</span>
              <div className="hero__nav-arrows">
                <button className="hero__nav-arrow" onClick={prevShoe} aria-label="Previous shoe">
                  <ChevronLeft size={16} />
                </button>
                <button className="hero__nav-arrow" onClick={nextShoe} aria-label="Next shoe">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="hero__selector-pills">
              {shoes.map((shoe, idx) => (
                <button
                  key={shoe.id}
                  className={`hero__pill ${idx === selectedHeroIndex ? 'is-active' : ''}`}
                  onClick={() => setSelectedHeroIndex(idx)}
                >
                  <img src={shoe.image} alt={shoe.name} className="hero__pill-img" />
                  <span>{shoe.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Floating Levitating Showcase */}
        <div
          className="hero__showcase-wrap"
          ref={containerRef}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
        >
          {/* Orbital Badges */}
          <motion.div
            className="hero__orbital-badge hero__orbital-badge--1"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ShieldCheck size={14} />
            <span>100% Authentic Drop</span>
          </motion.div>

          <motion.div
            className="hero__orbital-badge hero__orbital-badge--2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <Zap size={14} />
            <span>Responsive Cushioning</span>
          </motion.div>

          {/* Floating Shoe Stage */}
          <div
            className="hero__shoe-stage"
            onMouseEnter={() => setIsHoveringShoe(true)}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHoveringShoe ? 1.04 : 1})`,
              transition: isHoveringShoe ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
            }}
          >
            {/* Stage Side Navigation Arrows */}
            <button className="hero__stage-nav hero__stage-nav--prev" onClick={prevShoe} aria-label="Previous shoe">
              <ChevronLeft size={20} />
            </button>
            <button className="hero__stage-nav hero__stage-nav--next" onClick={nextShoe} aria-label="Next shoe">
              <ChevronRight size={20} />
            </button>

            {/* Ambient Back Glow Ring */}
            <div
              className="hero__shoe-glow"
              style={{
                background: `radial-gradient(circle, var(--accent-${currentShoe.accent || 'clay'}) 0%, transparent 70%)`
              }}
            />

            {/* Levitating Floating Shoe */}
            <div className="hero__shoe-motion floating-levitate">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentShoe.id}
                  src={currentShoe.image}
                  alt={currentShoe.name}
                  className="hero__shoe-img"
                  onClick={() => onOpenQuickView(currentShoe)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>

            {/* Dynamic Ground Shadow */}
            <div
              className="hero__shoe-shadow"
              style={{
                transform: `scale(${isHoveringShoe ? 0.85 : 1})`,
                opacity: isHoveringShoe ? 0.35 : 0.5
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
