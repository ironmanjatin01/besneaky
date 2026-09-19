import { COFFEE_ITEMS, CAFE_METRICS } from '../data/coffeeData'
import { Sparkles, ArrowRight, Eye, Flame, Coffee, Award } from 'lucide-react'
import './Hero.css'

export default function Hero({ onOpenQuickView, onAddToCart }) {
  const featuredCoffee = COFFEE_ITEMS.find((item) => item.isFeatured) || COFFEE_ITEMS[0]

  return (
    <section className="hero">
      <div className="hero__container">
        {/* Left Column: Text & CTAs */}
        <div className="hero__content">
          <div className="hero__badge">
            <Sparkles size={14} className="hero__badge-icon" />
            <span>Specialty Coffee & Micro-Lot Roastery</span>
          </div>

          <h1 className="hero__title">
            Crafted for <span className="hero__title-accent">Night Owls</span>, Code Crafters & Coffee Connoisseurs.
          </h1>

          <p className="hero__subtitle">
            Experience hand-selected 100% single-origin Arabica beans, 20-hour nitro extractions, and precision grouphead temperature profiles tailored for those who move differently.
          </p>

          {/* Quick Filter Tags */}
          <div className="hero__tags">
            <span className="hero__tag">☕ 93°C Grouphead</span>
            <span className="hero__tag">⚡ Double Ristretto</span>
            <span className="hero__tag">❄️ 20h Nitro Steep</span>
            <span className="hero__tag">🌱 Direct Trade</span>
          </div>

          <div className="hero__actions">
            <a href="#shop" className="hero__cta-primary">
              <span>Explore Coffee Vault</span>
              <ArrowRight size={18} />
            </a>
            <a href="#brewlab" className="hero__cta-secondary">
              <Coffee size={18} />
              <span>Barista Ratio Lab</span>
            </a>
          </div>

          {/* Metrics bar */}
          <div className="hero__metrics">
            {CAFE_METRICS.map((metric, index) => (
              <div key={index} className="hero__metric-item">
                <span className="metric-val">{metric.value}</span>
                <span className="metric-lbl">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Featured Roasters Card */}
        <div className="hero__stage">
          <div className="hero__card-glow" />
          <div className="hero__featured-card">
            <div className="featured-card__badge">
              <Award size={13} /> Roast of the Day
            </div>

            <div className="featured-card__image-wrap">
              <img
                src={featuredCoffee.image}
                alt={featuredCoffee.name}
                className="featured-card__img"
              />
              <div className="featured-card__roast-pill">
                <Flame size={12} /> {featuredCoffee.roastLevel}
              </div>
            </div>

            <div className="featured-card__body">
              <div className="featured-card__meta">
                <span className="featured-card__origin">{featuredCoffee.origin}</span>
                <span className="featured-card__price">${featuredCoffee.price.toFixed(2)}</span>
              </div>

              <h3 className="featured-card__title">{featuredCoffee.name}</h3>
              <p className="featured-card__tagline">{featuredCoffee.tagline}</p>

              <div className="featured-card__notes">
                {featuredCoffee.tastingNotes.slice(0, 3).map((note, idx) => (
                  <span key={idx} className="note-pill">{note}</span>
                ))}
              </div>

              <div className="featured-card__btns">
                <button
                  className="featured-card__quickview-btn"
                  onClick={() => onOpenQuickView(featuredCoffee)}
                >
                  <Eye size={16} /> Quick View Specs
                </button>
                <button
                  className="featured-card__order-btn"
                  onClick={() => onAddToCart(featuredCoffee)}
                >
                  Quick Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
