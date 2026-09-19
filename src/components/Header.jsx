import { useState, useEffect } from 'react'
import { Sun, Moon, ShoppingBag } from 'lucide-react'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import './Header.css'

export default function Header({ isSpidermanTheme, onToggleSpidermanTheme, cartCount, onOpenCart }) {
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
        <a href="#shop" className="header__link">Coffee Vault</a>
        <a href="#anatomy" className="header__link">Layer Explorer</a>
        <a href="#brewlab" className="header__link">Brew Lab</a>
        <a href="#about" className="header__link">Roastery Philosophy</a>

        {/* Theme Mode Toggle */}
        <button
          className={`header__theme-btn ${isSpidermanTheme ? 'is-spiderman' : ''}`}
          onClick={onToggleSpidermanTheme}
          title="Toggle Day Roast / Midnight Espresso Mode"
        >
          {isSpidermanTheme ? (
            <Sun size={15} className="theme-zap-icon" />
          ) : (
            <Moon size={15} className="theme-zap-icon" />
          )}
          <span className="theme-btn-text">
            {isSpidermanTheme ? 'Day Roast' : 'Midnight Espresso'}
          </span>
        </button>

        {/* Order Ticket Drawer */}
        <button className="header__cart-btn" onClick={onOpenCart} aria-label="View Order Ticket">
          <ShoppingBag size={18} />
          <span className="header__cart-text">Order Ticket</span>
          {cartCount > 0 && <span className="header__cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </header>
  )
}
