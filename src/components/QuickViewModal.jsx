import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, Sparkles, Check, Bookmark, Share2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import './QuickViewModal.css'

export default function QuickViewModal({ shoe, onClose }) {
  const [bookmarked, setBookmarked] = useState(false)

  if (!shoe) return null

  const handleBookmark = () => {
    setBookmarked((prev) => !prev)
    if (!bookmarked) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#fbbf24']
      })
    }
  }

  return (
    <AnimatePresence>
      <div className="quickview-overlay" onClick={onClose}>
        <motion.div
          className="quickview-card ramayan-story-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="quickview-close" onClick={onClose} aria-label="Close chapter modal">
            <X size={20} />
          </button>

          <div className="quickview-grid">
            {/* Visual Stage */}
            <div className="quickview-stage ramayan-modal__stage">
              <div
                className="quickview-glow"
                style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)' }}
              />

              <span className="quickview-tag">{shoe.kanda}</span>

              <motion.img
                src={shoe.image}
                alt={shoe.title}
                className="quickview-img ramayan-modal__img"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="quickview-shadow" />
            </div>

            {/* Product / Story Details */}
            <div className="quickview-details ramayan-modal__details">
              <span className="quickview-brand">{shoe.author}</span>
              <h2 className="quickview-title">{shoe.title}</h2>
              <div className="quickview-price">{shoe.readTime || '6 min read'}</div>

              {/* Shloka Box */}
              {shoe.sanskritShloka && (
                <div className="ramayan-modal__shloka-box">
                  <div className="shloka-title">
                    <Sparkles size={14} />
                    <span>Sanskrit Verse & Chaupai</span>
                  </div>
                  <p className="sanskrit-text">"{shoe.sanskritShloka}"</p>

                  {shoe.hindiChaupai && (
                    <p className="hindi-text">"{shoe.hindiChaupai}"</p>
                  )}

                  <p className="english-translation">{shoe.englishMeaning}</p>
                </div>
              )}

              {/* Narrative Story */}
              <div className="ramayan-modal__story-text">
                <h3>Chapter Narrative</h3>
                <p>{shoe.fullStory}</p>
              </div>

              {/* Life Lessons & Dharma */}
              {shoe.lessons && (
                <div className="quickview-specs ramayan-modal__lessons">
                  <h3>Eternal Lessons of Dharma</h3>
                  {shoe.lessons.map((lesson, i) => (
                    <div key={i} className="quickview-spec-item">
                      <Sparkles size={12} className="quickview-spec-icon" />
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="ramayan-modal__actions">
                <button
                  className={`quickview-add-btn ${bookmarked ? 'is-added' : ''}`}
                  onClick={handleBookmark}
                >
                  {bookmarked ? (
                    <>
                      <Check size={18} />
                      <span>Bookmarked Chapter</span>
                    </>
                  ) : (
                    <>
                      <Bookmark size={18} />
                      <span>Save Chapter Verse</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
