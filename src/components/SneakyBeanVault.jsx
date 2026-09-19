import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Eye, ShieldAlert, Award, Flame, Compass, Gift, Check } from 'lucide-react'
import './SneakyBeanVault.css'

const SNEAKY_BEANS = [
  {
    id: 'ninja-dark',
    name: 'Sneaky Ninja Roast',
    tagline: 'Dark as midnight, smooth as silk. High-altitude Ethiopian Heirloom.',
    roast: 'Dark Roast (Full City+)',
    elevation: '2,150m',
    intensity: '5 / 5',
    flavorNotes: ['Midnight Cacao', 'Black Cherry', 'Smokey Vanilla'],
    secretHack: 'Brew with 93°C spring water and dose 18.5g for maximum syrupy crema.',
    promoCode: 'SNEAKYNINJA15',
    iconColor: '#3b82f6',
    beanShape: '☕'
  },
  {
    id: 'secret-pour',
    name: 'Midnight Stash V60',
    tagline: 'Micro-lot light roast that sneaks floral bergamot notes into your cup.',
    roast: 'Nordic Light Roast',
    elevation: '2,200m',
    intensity: '2.5 / 5',
    flavorNotes: ['Wild Jasmine', 'Bergamot Zest', 'White Peach'],
    secretHack: 'Pulse pour 50g blooms and let draw down for 3:15 for maximum floral clarity.',
    promoCode: 'SECRETSTASH15',
    iconColor: '#f4a261',
    beanShape: '🫘'
  },
  {
    id: 'nitro-reserve',
    name: 'Sneaky Nitro Reserve',
    tagline: '20-hour cold steep lot with natural chocolate sweetness.',
    roast: 'Medium Roast',
    elevation: '1,800m',
    intensity: '4 / 5',
    flavorNotes: ['Bourbon Fudge', 'Toasted Hazelnut', 'Demerara Syrup'],
    secretHack: 'Infuse with micro-nitrogen bubbles at 2°C for a stout-like creamy head without milk.',
    promoCode: 'NITROSNEAK15',
    iconColor: '#00a86b',
    beanShape: '⚡'
  },
  {
    id: 'hidden-geisha',
    name: 'Hidden Geisha Treasure',
    tagline: 'Ultra-rare anaerobic lot hidden away in our roastery vault.',
    roast: 'Light-Medium Honey',
    elevation: '2,350m',
    intensity: '3 / 5',
    flavorNotes: ['Pink Guava', 'Meyer Lemon', 'Maple Nectar'],
    secretHack: 'Rest beans for 14 days after roast date to unlock full aromatic complexity.',
    promoCode: 'GEISHASNEAK20',
    iconColor: '#e6ccb2',
    beanShape: '✨'
  }
]

export default function SneakyBeanVault() {
  const [activeBeanId, setActiveBeanId] = useState('ninja-dark')
  const [copiedCode, setCopiedCode] = useState(false)
  const activeBean = SNEAKY_BEANS.find((b) => b.id === activeBeanId) || SNEAKY_BEANS[0]

  const triggerSneakyConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#3b82f6', '#f5e6d3', '#e6ccb2', '#00a86b']
    })
  }

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
    triggerSneakyConfetti()
  }

  return (
    <section className="sneaky-vault" id="sneaky-vault">
      <div className="sneaky-vault__container">
        {/* Header */}
        <div className="sneaky-vault__header">
          <span className="sneaky-vault__badge">
            <Eye size={14} /> Secret Roaster Stash
          </span>
          <h2 className="sneaky-vault__title">The Sneaky Bean Secret Vault 🥷☕</h2>
          <p className="sneaky-vault__desc">
            Sneak a peek into our confidential micro-lot bean reserves. Click a bean below to reveal secret roast profiles & unlock hidden barista promo codes!
          </p>
        </div>

        {/* Interactive Bean Selector Cards */}
        <div className="sneaky-vault__beans-grid">
          {SNEAKY_BEANS.map((bean) => (
            <motion.div
              key={bean.id}
              className={`sneaky-bean-card ${activeBeanId === bean.id ? 'is-selected' : ''}`}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setActiveBeanId(bean.id)
                triggerSneakyConfetti()
              }}
            >
              <div className="bean-card__badge" style={{ backgroundColor: bean.iconColor }}>
                <span className="bean-symbol">{bean.beanShape}</span>
              </div>
              <h3 className="bean-card__name">{bean.name}</h3>
              <span className="bean-card__roast">{bean.roast}</span>
            </motion.div>
          ))}
        </div>

        {/* Secret Unlocked Details Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBean.id}
            className="sneaky-vault__detail-box"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <div className="detail-box__left">
              <div className="secret-tag">
                <ShieldAlert size={15} /> CONFIDENTIAL ROAST LOG
              </div>
              <h3 className="detail-box__name">{activeBean.name}</h3>
              <p className="detail-box__tagline">{activeBean.tagline}</p>

              <div className="detail-specs">
                <div className="spec-item">
                  <Flame size={16} />
                  <div>
                    <span className="spec-label">Roast Level</span>
                    <span className="spec-val">{activeBean.roast}</span>
                  </div>
                </div>

                <div className="spec-item">
                  <Compass size={16} />
                  <div>
                    <span className="spec-label">Farm Elevation</span>
                    <span className="spec-val">{activeBean.elevation}</span>
                  </div>
                </div>

                <div className="spec-item">
                  <Award size={16} />
                  <div>
                    <span className="spec-label">Intensity</span>
                    <span className="spec-val">{activeBean.intensity}</span>
                  </div>
                </div>
              </div>

              {/* Flavor Notes */}
              <div className="detail-notes">
                <span className="notes-title">Aromatic Flavor Notes:</span>
                <div className="notes-pills">
                  {activeBean.flavorNotes.map((note, i) => (
                    <span key={i} className="note-pill">
                      <Sparkles size={12} /> {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="detail-box__right">
              {/* Secret Barista Hack */}
              <div className="barista-hack-card">
                <h4>🥷 Sneaky Barista Secret Hack:</h4>
                <p>"{activeBean.secretHack}"</p>
              </div>

              {/* Unlocked Secret Promo Code */}
              <div className="secret-code-card">
                <div className="code-info">
                  <Gift size={18} />
                  <div>
                    <span className="code-label">Unlocked Sneaky Secret Offer:</span>
                    <span className="code-discount">15% Off Next Coffee Order</span>
                  </div>
                </div>
                <button
                  className="copy-code-btn"
                  onClick={() => handleCopyCode(activeBean.promoCode)}
                >
                  {copiedCode ? (
                    <>
                      <Check size={15} /> Copied!
                    </>
                  ) : (
                    <>
                      <span>{activeBean.promoCode}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
