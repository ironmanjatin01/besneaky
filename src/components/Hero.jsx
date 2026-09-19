import { COFFEE_ITEMS, formatPrice } from '../data/coffeeData'
import { ArrowRight, ArrowUpRight, Coffee, Sparkles } from 'lucide-react'
import './Hero.css'

export default function Hero({ onOpenQuickView, onAddToCart }) {
  const featuredCoffee = COFFEE_ITEMS.find((item) => item.id === 'esp-03') || COFFEE_ITEMS[0]
  const coldBrew = COFFEE_ITEMS.find((item) => item.id === 'cld-01') || COFFEE_ITEMS[1]

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span>Neighbourhood coffee, made thoughtfully</span>
          </div>

          <h1 className="hero__title">
            Take a little <em>joy</em><br />with your coffee.
          </h1>

          <p className="hero__subtitle">
            Beautifully balanced drinks, small-batch beans, and a place to stay awhile. Every cup is made with care—from the first pour to the last sip.
          </p>

          <div className="hero__actions">
            <a href="#shop" className="hero__cta-primary">
              <span>Explore the menu</span>
              <ArrowRight size={18} />
            </a>
            <button className="hero__cta-secondary" onClick={() => onOpenQuickView(featuredCoffee)}>
              Our house favourite <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="hero__micro-copy">
            <Coffee size={16} />
            <span>Open daily from 7am · Gurugram & delivery</span>
          </div>
        </div>

        <div className="hero__stage">
          <div className="hero__shape hero__shape--coral" />
          <div className="hero__shape hero__shape--sun" />
          <div className="hero__image-frame">
            <img src={featuredCoffee.image} alt={featuredCoffee.name} />
            <div className="hero__image-caption">
              <span>Made for unhurried mornings</span>
              <Sparkles size={17} />
            </div>
          </div>

          <button className="hero__drink-card" onClick={() => onAddToCart(coldBrew)}>
            <span className="hero__drink-label">Seasonal sip</span>
            <strong>{coldBrew.name}</strong>
            <span className="hero__drink-detail">{coldBrew.tastingNotes.slice(0, 2).join(' · ')}</span>
            <span className="hero__drink-price">{formatPrice(coldBrew.price)} <ArrowUpRight size={15} /></span>
          </button>

          <div className="hero__roundel">
            <span>small batch</span>
            <strong>•</strong>
            <span>good coffee</span>
          </div>
        </div>
      </div>
    </section>
  )
}
