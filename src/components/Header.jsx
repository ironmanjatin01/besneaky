import { useState, useEffect } from 'react'
import { ShoppingBag, Sun, Moon, Disc, Music } from 'lucide-react'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import { jazzSynth } from '../utils/jazzSynth'
import './Header.css'

export default function Header({ cartCount, onOpenCart, isDarkMode, onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isJazzPlaying, setIsJazzPlaying] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const unsubscribe = jazzSynth.subscribe((state) => {
      setIsJazzPlaying(state.isPlaying)
    })
    return () => unsubscribe()
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
        <a href="#anatomy" className="header__link">Coffee Vault</a>
        <a href="#visit" className="header__link">Visit us</a>

        {/* Quick Jazz Lounge Toggle Button */}
        <button
          className={`header__jazz-btn ${isJazzPlaying ? 'is-playing' : ''}`}
          onClick={() => jazzSynth.toggle()}
          aria-label="Toggle Soft Jazz Music"
          title={isJazzPlaying ? 'Pause Soft Jazz Lounge' : 'Play Soft Jazz Lounge'}
        >
          {isJazzPlaying ? (
            <Disc size={16} className="jazz-disc-icon is-spinning" />
          ) : (
            <Music size={16} />
          )}
          <span className="header__jazz-text">{isJazzPlaying ? 'Jazz ON 🎷' : 'Jazz 🎷'}</span>
        </button>

        {/* Dark / Light Theme Toggle Button */}
        <button
          className="header__theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun size={18} className="theme-icon sun" /> : <Moon size={18} className="theme-icon moon" />}
        </button>

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
