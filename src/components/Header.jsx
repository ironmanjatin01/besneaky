import { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import './Header.css'

export default function Header({ cartCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* Brand Icon & Logo */}
      <div className="header__brand-wrap">
        <AnimatedBrandLogo size={32} />
      </div>

      <nav className="header__nav">
        <a href="#shop" className="header__link">Menu</a>
        <a href="#about" className="header__link">Our coffee</a>
        <a href="#visit" className="header__link">Visit us</a>

        {/* Order Ticket Drawer */}
        <button className="header__cart-btn" onClick={onOpenCart} aria-label="View Order Ticket">
          <ShoppingBag size={18} />
          <span className="header__cart-text">Order</span>
          {cartCount > 0 && <span className="header__cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </header>
  )
}
