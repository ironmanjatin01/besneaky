import { useState } from 'react'
import { ArrowUp, Send, Check } from 'lucide-react'
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
              <AnimatedBrandLogo size={36} />
            </div>
            <p className="footer-tagline">
              Curated designer footwear for those who move differently.
            </p>
          </div>

          <div className="footer-newsletter">
            <span className="footer-newsletter-label">Subscribe for drop access</span>
            <form className="footer-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" aria-label="Subscribe">
                {subscribed ? <Check size={16} /> : <Send size={16} />}
              </button>
            </form>
            {subscribed && <span className="footer-success">Registered for early access!</span>}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 besneaky.com — All rights reserved.</p>
          <button className="footer-top-btn" onClick={scrollToTop}>
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
