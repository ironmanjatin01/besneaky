import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
      {/* Brand Icon & Animated besneaky Text */}
      <AnimatedBrandLogo size={32} />

      <nav className="header__nav">
        <a href="#shop" className="header__link">Shop</a>
        <a href="#about" className="header__link">About</a>
        <a href="#about" className="header__link">Studio</a>

        {/* Cart Toggle Button */}
        <button className="header__cart-btn" onClick={onOpenCart}>
          <ShoppingBag size={18} />
          <span>Bag</span>
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
