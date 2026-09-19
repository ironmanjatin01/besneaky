import { useState } from 'react'
import { X, Flame, Plus, Minus, ShoppingBag, Award, Check } from 'lucide-react'
import { formatPrice } from '../data/coffeeData'
import './QuickViewModal.css'

export default function QuickViewModal({ shoe: coffee, onClose, onAddToCart }) {
  const [selectedMilk, setSelectedMilk] = useState(
    coffee?.customizations?.milkTypes?.[0] || 'Whole Milk'
  )
  const [selectedSweetness, setSelectedSweetness] = useState(
    coffee?.customizations?.sweetnessLevels?.[0] || 'Unsweetened'
  )
  const [quantity, setQuantity] = useState(1)

  if (!coffee) return null

  const handleAddCustomizedToCart = () => {
    onAddToCart({
      ...coffee,
      customOptions: {
        milk: selectedMilk,
        sweetness: selectedSweetness
      },
      selectedSize: `${selectedMilk} • ${selectedSweetness}`,
      quantity
    })
    onClose()
  }

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="quickview-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Left Column: Image & Tasting Notes */}
          <div className="quickview-media">
            <div className="quickview-image-wrap">
              <img src={coffee.image} alt={coffee.name} className="quickview-img" />
              <div className="quickview-roast-badge">
                <Flame size={12} /> {coffee.roastLevel}
              </div>
            </div>

            {/* Flavor Wheel Tags */}
            <div className="quickview-tasting-box">
              <h4 className="tasting-box-title">Sensory Flavor Notes</h4>
              <div className="tasting-pills">
                {coffee.tastingNotes?.map((note, idx) => (
                  <span key={idx} className="tasting-pill">
                    ✦ {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Customization */}
          <div className="quickview-info">
            <span className="quickview-origin">{coffee.origin}</span>
            <h2 className="quickview-title">{coffee.name}</h2>
            <p className="quickview-tagline">{coffee.tagline}</p>
            <p className="quickview-desc">{coffee.description}</p>

            {/* Extraction Specs Grid */}
            <div className="quickview-specs-box">
              <h4 className="specs-title"><Award size={14} /> Extraction Parameters</h4>
              <div className="specs-grid">
                <div className="spec-cell">
                  <span className="cell-lbl">Brew Ratio</span>
                  <span className="cell-val">{coffee.brewRatio || '1:2'}</span>
                </div>
                <div className="spec-cell">
                  <span className="cell-lbl">Water Temp</span>
                  <span className="cell-val">{coffee.waterTemp || '93°C'}</span>
                </div>
                <div className="spec-cell">
                  <span className="cell-lbl">Grind Size</span>
                  <span className="cell-val">{coffee.grindSize || 'Fine'}</span>
                </div>
                <div className="spec-cell">
                  <span className="cell-lbl">Caffeine</span>
                  <span className="cell-val">{coffee.caffeineMg || 120} mg</span>
                </div>
              </div>
            </div>

            {/* Barista Customization Section */}
            {coffee.customizations && (
              <div className="quickview-custom-section">
                {/* Milk Choice */}
                {coffee.customizations.milkTypes && (
                  <div className="custom-group">
                    <label className="custom-label">Milk / Dairy Base</label>
                    <div className="custom-options">
                      {coffee.customizations.milkTypes.map((milk) => (
                        <button
                          key={milk}
                          className={`custom-opt-btn ${selectedMilk === milk ? 'is-selected' : ''}`}
                          onClick={() => setSelectedMilk(milk)}
                        >
                          {selectedMilk === milk && <Check size={12} />}
                          <span>{milk}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sweetness Level */}
                {coffee.customizations.sweetnessLevels && (
                  <div className="custom-group">
                    <label className="custom-label">Sweetness Preference</label>
                    <div className="custom-options">
                      {coffee.customizations.sweetnessLevels.map((sweet) => (
                        <button
                          key={sweet}
                          className={`custom-opt-btn ${selectedSweetness === sweet ? 'is-selected' : ''}`}
                          onClick={() => setSelectedSweetness(sweet)}
                        >
                          {selectedSweetness === sweet && <Check size={12} />}
                          <span>{sweet}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer Pricing & Add to Cart */}
            <div className="quickview-footer">
              <div className="price-and-qty">
                <span className="modal-price">{formatPrice(coffee.price * quantity)}</span>
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-num">{quantity}</span>
                  <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button className="modal-add-btn" onClick={handleAddCustomizedToCart}>
                <ShoppingBag size={18} />
                <span>Add to Order Slip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
