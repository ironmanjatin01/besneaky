import { useState } from 'react'
import { COFFEE_ITEMS } from '../data/coffeeData'
import { Sparkles, ArrowRight, Eye, Flame, Coffee, Zap, Shield, Search, Check } from 'lucide-react'
import './Hero.css'

const SECRET_VIBES = [
  { id: 'code', label: '🚀 Late Night Code Sprint', itemId: 'cld-01', desc: 'High caffeine 20h Nitro Cold Brew for 3 AM flow state.' },
  { id: 'zen', label: '🧘 Zen Focus Mode', itemId: 'man-01', desc: 'Elegantly bright Ethiopian V60 Pour-Over with jasmine tea notes.' },
  { id: 'buzz', label: '⚡ 9 AM Standup Buzz', itemId: 'esp-01', desc: 'Syrupy double espresso shot with vibrant citrus zest.' },
  { id: 'cozy', label: '🌙 Cozy Midnight Chill', itemId: 'sig-01', desc: 'Decadent 72% Belgian chocolate dark mocha with warm spices.' }
]

export default function Hero({ onOpenQuickView, onAddToCart }) {
  const [activeVibeId, setActiveVibeId] = useState('code')

  const activeVibe = SECRET_VIBES.find((v) => v.id === activeVibeId) || SECRET_VIBES[0]
  const matchedCoffee = COFFEE_ITEMS.find((item) => item.id === activeVibe.itemId) || COFFEE_ITEMS[0]

  return (
    <section className="hero">
      <div className="hero__container">
        {/* Left Column: Creative Title & Interactive Secret Roast Matcher */}
        <div className="hero__content">
          <div className="hero__badge">
            <Shield size={14} className="hero__badge-icon" />
            <span>BeSneaky • Secret Specialty Bean Vault</span>
          </div>

          <h1 className="hero__title">
            Sneak Into The <span className="hero__title-accent">Secret World</span> of Specialty Coffee.
          </h1>

          <p className="hero__subtitle">
            Where stealth roasts, single-origin bean micro-lots, and liquid cold extractions blend into an ultra-modern cafe experience crafted for code crafters & night owls.
          </p>

          {/* Interactive "Find Your Secret Vibe Roast" Selector */}
          <div className="secret-vibe-box">
            <div className="secret-vibe-header">
              <Sparkles size={14} />
              <span>Select Your Vibe • Sneak The Perfect Roast</span>
            </div>

            <div className="secret-vibe-buttons">
              {SECRET_VIBES.map((vibe) => (
                <button
                  key={vibe.id}
                  className={`vibe-btn ${activeVibeId === vibe.id ? 'is-active' : ''}`}
                  onClick={() => setActiveVibeId(vibe.id)}
                >
                  {vibe.label}
                </button>
              ))}
            </div>

            <p className="secret-vibe-desc">{activeVibe.desc}</p>
          </div>

          {/* Liquid Glass CTAs */}
          <div className="hero__actions">
            <a href="#shop" className="hero__cta-primary">
              <span>Explore All Roasts</span>
              <ArrowRight size={18} />
            </a>
            <a href="#anatomy" className="hero__cta-secondary">
              <Coffee size={18} />
              <span>Liquid Layer Explorer</span>
            </a>
          </div>
        </div>

        {/* Right Column: Liquid Glass Coffee Bean Showcase Chamber */}
        <div className="hero__stage">
          <div className="liquid-glass-glow" />

          <div className="liquid-glass-card">
            <div className="liquid-card__header">
              <span className="stealth-tag">🕵️‍♂️ Sneaky Secret Match</span>
              <span className="intensity-tag">
                <Zap size={12} /> {matchedCoffee.caffeineMg}mg Caffeine
              </span>
            </div>

            <div className="liquid-card__media">
              <img
                src={matchedCoffee.image}
                alt={matchedCoffee.name}
                className="liquid-card__img"
              />
              <div className="liquid-card__roast-pill">
                <Flame size={12} /> {matchedCoffee.roastLevel}
              </div>
            </div>

            <div className="liquid-card__body">
              <div className="liquid-card__meta">
                <span className="liquid-card__origin">{matchedCoffee.origin}</span>
                <span className="liquid-card__price">${matchedCoffee.price.toFixed(2)}</span>
              </div>

              <h3 className="liquid-card__title">{matchedCoffee.name}</h3>
              <p className="liquid-card__tagline">{matchedCoffee.tagline}</p>

              {/* Flavor Tags */}
              <div className="liquid-card__notes">
                {matchedCoffee.tastingNotes.slice(0, 3).map((note, idx) => (
                  <span key={idx} className="liquid-note-pill">
                    ✦ {note}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="liquid-card__btns">
                <button
                  className="liquid-card__btn-view"
                  onClick={() => onOpenQuickView(matchedCoffee)}
                >
                  <Eye size={15} /> Quick Specs
                </button>
                <button
                  className="liquid-card__btn-add"
                  onClick={() => onAddToCart(matchedCoffee)}
                >
                  Sneak to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
