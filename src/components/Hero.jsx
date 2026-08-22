import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, BookOpen, ShieldCheck, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { ramayanPosts } from '../data/ramayanPosts'
import confetti from 'canvas-confetti'
import './Hero.css'

export default function Hero({ onOpenQuickView }) {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0)
  const currentPost = ramayanPosts[selectedHeroIndex] || ramayanPosts[0]
  const containerRef = useRef(null)

  // 3D tilt states
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHoveringShoe, setIsHoveringShoe] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -y * 20, y: x * 20 })
  }

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return
    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = (touch.clientX - rect.left) / rect.width - 0.5
    const y = (touch.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -y * 22, y: x * 22 })
    setIsHoveringShoe(true)
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHoveringShoe(false)
  }

  const nextPost = (e) => {
    e?.stopPropagation()
    setSelectedHeroIndex((prev) => (prev + 1) % ramayanPosts.length)
  }

  const prevPost = (e) => {
    e?.stopPropagation()
    setSelectedHeroIndex((prev) => (prev - 1 + ramayanPosts.length) % ramayanPosts.length)
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#d97706', '#fbbf24', '#fef3c7']
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
            <span>✦ RAMCHARITMANAS & VALMIKI RAMAYANA ✦</span>
          </motion.div>

          <h1 className="hero__title">
            The Eternal Journey of
            <br />
            <span className="hero__accent">Truth & Dharma</span>, Shri Rama.
          </h1>

          <p className="hero__sub">
            Explore the timeless epic of Lord Shri Rama, Mata Sita, and Hanumanji through animated story chapters, ancient Sanskrit Shlokas, and eternal life lessons.
          </p>

          {/* Action buttons */}
          <div className="hero__actions">
            <a
              href="#shop"
              className="hero__cta hero__cta--primary"
              onClick={triggerConfetti}
            >
              <span>Read Story Chapters</span>
              <ArrowRight size={15} className="hero__cta-arrow" />
            </a>

            <button
              className="hero__cta hero__cta--secondary"
              onClick={() => onOpenQuickView(currentPost)}
            >
              <BookOpen size={15} />
              <span>Read Featured Chapter</span>
            </button>
          </div>

          {/* Featured Post Selector Pills */}
          <div className="hero__selector">
            <div className="hero__selector-top">
              <span className="hero__selector-label">Epic Chapters ({selectedHeroIndex + 1} of {ramayanPosts.length}):</span>
              <div className="hero__nav-arrows">
                <button className="hero__nav-arrow" onClick={prevPost} aria-label="Previous chapter">
                  <ChevronLeft size={16} />
                </button>
                <button className="hero__nav-arrow" onClick={nextPost} aria-label="Next chapter">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="hero__selector-pills">
              {ramayanPosts.map((post, idx) => (
                <button
                  key={post.id}
                  className={`hero__pill ${idx === selectedHeroIndex ? 'is-active' : ''}`}
                  onClick={() => setSelectedHeroIndex(idx)}
                >
                  <img src={post.image} alt={post.title} className="hero__pill-img" />
                  <span>{post.kanda}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Animated 3D Floating Chapter Card */}
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
            <span>Satyapalana & Ethics</span>
          </motion.div>

          <motion.div
            className="hero__orbital-badge hero__orbital-badge--2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <Heart size={14} />
            <span>Pure Bhakti & Faith</span>
          </motion.div>

          {/* Floating Product Stage */}
          <div
            className="hero__shoe-stage"
            onMouseEnter={() => setIsHoveringShoe(true)}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHoveringShoe ? 1.03 : 1})`,
              transition: isHoveringShoe ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
            }}
          >
            {/* Stage Side Navigation Arrows */}
            <button className="hero__stage-nav hero__stage-nav--prev" onClick={prevPost} aria-label="Previous chapter">
              <ChevronLeft size={20} />
            </button>
            <button className="hero__stage-nav hero__stage-nav--next" onClick={nextPost} aria-label="Next chapter">
              <ChevronRight size={20} />
            </button>

            {/* Ambient Back Glow Ring */}
            <div
              className="hero__shoe-glow"
              style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)'
              }}
            />

            {/* Floating Animated Illustration Card */}
            <div className="hero__shoe-motion floating-levitate">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPost.id}
                  src={currentPost.image}
                  alt={currentPost.title}
                  className="hero__shoe-img ramayan-hero-img"
                  onClick={() => onOpenQuickView(currentPost)}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.35 }}
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
