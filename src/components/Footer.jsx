import { useState } from 'react'
import { ArrowUp, Sparkles, Send, Heart } from 'lucide-react'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <AnimatedBrandLogo size={32} />
            </div>
            <p className="footer-tagline">
              An eternal digital sanctuary celebrating the life, teachings, and divine journey of Lord Shri Rama, Mata Sita, and Hanumanji.
            </p>
          </div>

          {/* Daily Chaupai Newsletter */}
          <div className="footer-newsletter">
            <span className="footer-newsletter-label">Receive Daily Ramayan Chaupai</span>
            {subscribed ? (
              <p className="footer-success">🌸 Jai Shri Ram! Subscribed to Daily Verses.</p>
            ) : (
              <form className="footer-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="Subscribe to Chaupais">
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 RAMAYANA. Dedicated with devotion (Bhakti) to the eternal ideal of Dharma.</p>
          <button className="footer-top-btn" onClick={scrollToTop}>
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
