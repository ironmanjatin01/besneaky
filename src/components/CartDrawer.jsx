import { useState } from 'react'
import { X, Trash2, Plus, Minus, ShoppingBag, Coffee, CheckCircle, Sparkles, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'
import './CartDrawer.css'

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [tipPct, setTipPct] = useState(15)
  const [isOrdered, setIsOrdered] = useState(false)
  const [orderType, setOrderType] = useState('pickup')

  if (!isOpen) return null

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const tipAmount = subtotal * (tipPct / 100)
  const total = subtotal + tax + tipAmount

  const handlePlaceOrder = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#d97706', '#fbbf24', '#fef3c7']
    })
    setIsOrdered(true)
  }

  const handleCloseSuccess = () => {
    setIsOrdered(false)
    onClearCart()
    onClose()
  }

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header__title-wrap">
            <Coffee size={22} className="cart-coffee-icon" />
            <div>
              <h3 className="cart-title">Your Order Ticket</h3>
              <span className="cart-subtitle">BeSneaky Specialty Roastery</span>
            </div>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close Order Slip">
            <X size={20} />
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="order-type-toggle">
          <button
            className={`type-btn ${orderType === 'pickup' ? 'is-active' : ''}`}
            onClick={() => setOrderType('pickup')}
          >
            ⚡ Express Pickup (10 mins)
          </button>
          <button
            className={`type-btn ${orderType === 'delivery' ? 'is-active' : ''}`}
            onClick={() => setOrderType('delivery')}
          >
            🛵 Roastery Courier
          </button>
        </div>

        {/* Items List */}
        <div className="cart-items-list">
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${idx}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item__img" />

                <div className="cart-item__details">
                  <h4 className="cart-item__name">{item.name}</h4>
                  {item.customOptions ? (
                    <span className="cart-item__custom">
                      {item.customOptions.milk} • {item.customOptions.sweetness}
                    </span>
                  ) : (
                    <span className="cart-item__custom">{item.selectedSize}</span>
                  )}
                  <span className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                {/* Qty & Remove */}
                <div className="cart-item__actions">
                  <div className="cart-qty">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                    >
                      <Minus size={12} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => onRemoveItem(item.id, item.selectedSize)}
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty-state">
              <ShoppingBag size={48} className="empty-bag-icon" />
              <h4>Your Order Slip is Empty</h4>
              <p>Explore our coffee vault and add your favorite roasts to get started.</p>
            </div>
          )}
        </div>

        {/* Order Summary & Checkout Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Barista Tip Selector */}
            <div className="tip-selector">
              <span className="tip-label"><Heart size={12} /> Barista Love Tip:</span>
              <div className="tip-btns">
                {[0, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    className={`tip-btn ${tipPct === pct ? 'is-active' : ''}`}
                    onClick={() => setTipPct(pct)}
                  >
                    {pct === 0 ? 'No Tip' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Bill Calculations */}
            <div className="bill-calc">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="bill-row">
                <span>Local Sales Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {tipPct > 0 && (
                <div className="bill-row">
                  <span>Barista Tip ({tipPct}%)</span>
                  <span>${tipAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="bill-row bill-total">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button className="checkout-btn" onClick={handlePlaceOrder}>
              <span>Place Coffee Order</span>
              <span>${total.toFixed(2)}</span>
            </button>
          </div>
        )}

        {/* Success Modal Overlay */}
        {isOrdered && (
          <div className="order-success-modal">
            <CheckCircle size={56} className="success-icon" />
            <h2>Order Confirmed!</h2>
            <p className="order-ticket-id">Ticket #BS-{Math.floor(1000 + Math.random() * 9000)}</p>
            <div className="success-box">
              <p>
                <strong>Estimated Time:</strong> Ready in 10-12 mins
              </p>
              <p>Our head barista is grinding your fresh beans right now. See you at the counter!</p>
            </div>
            <div className="trivia-quote">
              <Sparkles size={14} />
              <span>Did you know? Light roasts actually retain slightly more caffeine than dark roasts!</span>
            </div>
            <button className="success-done-btn" onClick={handleCloseSuccess}>
              Back to Coffee Vault
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
