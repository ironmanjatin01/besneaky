import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Moon } from 'lucide-react'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import './Header.css'

export default function Header({ cartCount, onOpenCart, isSpidermanTheme, onToggleSpidermanTheme }) {
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
      {/* Brand Icon & Animated besneaky Text */}
      <div className="header__brand-wrap">
        <AnimatedBrandLogo size={30} />
      </div>

      <nav className="header__nav">
        {/* Dark Mode Toggle */}
        <button
          className={`header__theme-btn ${isSpidermanTheme ? 'is-spiderman' : ''}`}
          onClick={onToggleSpidermanTheme}
          title="Toggle Dark Mode"
        >
          <Moon size={14} className="theme-zap-icon" />
          <span className="theme-btn-text">{isSpidermanTheme ? 'Dark Mode' : 'Dark Mode'}</span>
        </button>

        <a href="#shop" className="header__link">Shop</a>
        <a href="#about" className="header__link">About</a>
        <a href="#about" className="header__link">Studio</a>

        {/* Cart Toggle Button - Icon + Badge Only on Mobile */}
        <button className="header__cart-btn" onClick={onOpenCart} aria-label="Shopping Bag">
          <ShoppingBag size={18} />
          <span className="header__cart-text">Bag</span>
          <motion.span
            className="header__cart-badge"
            key={cartCount}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            {cartCount}
          </motion.span>
        </button>
      </nav>
    </header>
  )
}
