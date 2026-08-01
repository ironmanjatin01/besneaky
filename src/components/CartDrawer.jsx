import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import './CartDrawer.css'

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [isCheckedOut, setIsCheckedOut] = useState(false)

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? (subtotal > 300 ? 0 : 25) : 0
  const total = subtotal + shipping

  const handleCheckout = () => {
    setIsCheckedOut(true)
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    })
    setTimeout(() => {
      onClearCart()
      setIsCheckedOut(false)
      onClose()
    }, 2800)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="cart-overlay" onClick={onClose}>
        <motion.div
          className="cart-drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cart-drawer__header">
            <div className="cart-drawer__title">
              <ShoppingBag size={20} />
              <h3>Your Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
            </div>
            <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
              <X size={20} />
            </button>
          </div>

          {/* Checkout Success View */}
          {isCheckedOut ? (
            <div className="cart-drawer__success">
              <CheckCircle2 size={54} className="cart-drawer__success-icon" />
              <h3>Order Confirmed!</h3>
              <p>Thank you for stepping sneaky. Your order details have been dispatched.</p>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-circle">
                <ShoppingBag size={32} />
              </div>
              <h4>Your bag is empty</h4>
              <p>Explore our curated designer collection to find your next pair.</p>
              <button className="cart-drawer__shop-btn" onClick={onClose}>
                Browse Shoes
              </button>
            </div>
          ) : (
            /* Cart Items List */
            <>
              <div className="cart-drawer__body">
                {cartItems.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize || 'default'}-${idx}`}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                  >
                    <div className="cart-item__img-wrap">
                      <img src={item.image} alt={item.name} className="cart-item__img" />
                    </div>

                    <div className="cart-item__info">
                      <div className="cart-item__top">
                        <div>
                          <h4 className="cart-item__name">{item.name}</h4>
                          <span className="cart-item__size">Size: US {item.selectedSize || 9}</span>
                        </div>
                        <button
                          className="cart-item__remove"
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="cart-item__bottom">
                        <div className="cart-item__qty">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="cart-item__price">${item.price * item.quantity}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary Footer */}
              <div className="cart-drawer__footer">
                <div className="cart-drawer__row">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="cart-drawer__row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
                </div>
                <div className="cart-drawer__row cart-drawer__row--total">
                  <span>Total</span>
                  <span>${total}</span>
                </div>

                <button className="cart-drawer__checkout-btn" onClick={handleCheckout}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
