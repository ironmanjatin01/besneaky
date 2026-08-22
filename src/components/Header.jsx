import { useState, useEffect } from 'react'
import { BookOpen, Moon, Sun, BookMarked } from 'lucide-react'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import './Header.css'

export default function Header({ isSpidermanTheme, onToggleSpidermanTheme, onOpenCart }) {
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
      {/* Brand Icon & Animated Ramayan Title */}
      <div className="header__brand-wrap">
        <AnimatedBrandLogo size={32} />
      </div>

      <nav className="header__nav">
        <a href="#shop" className="header__link">Chapters</a>
        <a href="#about" className="header__link">Philosophy</a>
        <a href="#about" className="header__link">Shlokas</a>

        {/* Theme Mode Toggle */}
        <button
          className={`header__theme-btn ${isSpidermanTheme ? 'is-spiderman' : ''}`}
          onClick={onToggleSpidermanTheme}
          title="Toggle Divine Gold / Midnight Mode"
        >
          {isSpidermanTheme ? <Sun size={14} className="theme-zap-icon" /> : <Moon size={14} className="theme-zap-icon" />}
          <span className="theme-btn-text">{isSpidermanTheme ? 'Gold Mode' : 'Night Mode'}</span>
        </button>

        {/* Saved Verses / Quick Bookmark Drawer */}
        <button className="header__cart-btn" onClick={onOpenCart} aria-label="Ramayan Chapters">
          <BookMarked size={16} />
          <span className="header__cart-text">Verses</span>
        </button>
      </nav>
    </header>
  )
}
