import { Eye, Plus, Star, Flame, Zap } from 'lucide-react'
import './ProductCard.css'

export default function ProductCard({ coffee, onOpenQuickView, onAddToCart }) {
  const isBakery = coffee.category === 'bakery'

  return (
    <div className="product-card">
      {/* Card Header Image */}
      <div className="product-card__image-container">
        <img
          src={coffee.image}
          alt={coffee.name}
          className="product-card__image"
          loading="lazy"
        />

        <div className="product-card__badges">
          {coffee.isPopular && (
            <span className="badge badge--popular">★ Popular</span>
          )}
          <span className="badge badge--roast">
            <Flame size={11} /> {coffee.roastLevel}
          </span>
        </div>

        {/* Floating Quick View Overlay Button */}
        <button
          className="product-card__quick-view"
          onClick={() => onOpenQuickView(coffee)}
          title="Quick View Specs"
        >
          <Eye size={16} />
          <span>Quick Specs</span>
        </button>
      </div>

      {/* Card Body Details */}
      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__origin">{coffee.origin}</span>
          <span className="product-card__rating">
            <Star size={13} className="star-icon" /> {coffee.rating} ({coffee.reviewsCount})
          </span>
        </div>

        <h3 className="product-card__title" onClick={() => onOpenQuickView(coffee)}>
          {coffee.name}
        </h3>
        <p className="product-card__tagline">{coffee.tagline}</p>

        {/* Tasting Notes */}
        <div className="product-card__notes">
          {coffee.tastingNotes.slice(0, 3).map((note, idx) => (
            <span key={idx} className="product-card__note-tag">
              {note}
            </span>
          ))}
        </div>

        {/* Coffee Metrics bar */}
        {!isBakery && (
          <div className="product-card__specs">
            <div className="spec-item" title="Caffeine Content">
              <Zap size={12} className="spec-icon" />
              <span>{coffee.caffeineMg}mg</span>
            </div>
            <div className="spec-item" title="Intensity Level">
              <span className="spec-label">Intensity:</span>
              <div className="intensity-dots">
                {[1, 2, 3, 4, 5].map((level) => (
                  <span
                    key={level}
                    className={`dot ${level <= coffee.intensity ? 'is-active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Price & Add Button */}
        <div className="product-card__footer">
          <div className="product-card__price-wrap">
            <span className="price-label">Price</span>
            <span className="price-value">${coffee.price.toFixed(2)}</span>
          </div>

          <button
            className="product-card__add-btn"
            onClick={() => onAddToCart(coffee)}
            title="Add to Order Slip"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}
