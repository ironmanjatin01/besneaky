import { useState } from 'react'
import { Coffee, ShieldCheck, MapPin, Send, Check } from 'lucide-react'
import './About.css'

export default function About() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <section className="about" id="about">
      <div className="about__container">
        {/* Philosophy Header */}
        <div className="about__grid">
          <div className="about__content">
            <span className="about__badge">
              <Coffee size={14} /> Sourcing & Roastery Philosophy
            </span>
            <h2 className="about__title">Direct Trade, Sustainable Sourcing & Precision Roasting</h2>
            <p className="about__desc">
              At BeSneaky Cafe, coffee is both an exact science and a sensory art. We partner directly with micro-lot farmers across Ethiopia, Colombia, Guatemala, and Sumatra to pay 40% above fair-trade market prices, ensuring ethical farming and unmatched cup clarity.
            </p>

            <div className="about__features">
              <div className="feature-item">
                <ShieldCheck size={20} className="feat-icon" />
                <div>
                  <h4>100% Single-Origin Lots</h4>
                  <p>Never blended with low-grade robusta fill. Pure, traceable arabicas.</p>
                </div>
              </div>

              <div className="feature-item">
                <Coffee size={20} className="feat-icon" />
                <div>
                  <h4>Small Batch Loring Roasting</h4>
                  <p>Eco-friendly convection roasting that seals in delicate floral aromas.</p>
                </div>
              </div>

              <div className="feature-item">
                <MapPin size={20} className="feat-icon" />
                <div>
                  <h4>Gurugram Coffee Bar</h4>
                  <p>Visit our DLF Phase IV coffee bar or order fresh beans anywhere in Gurugram.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sourcing Visual / Card */}
          <div className="about__card">
            <div className="card-inner">
              <span className="card-tag">Roaster's Promise</span>
              <h3>Freshly Roasted Every Tuesday</h3>
              <p>
                Every bag ordered from BeSneaky is roasted within 48 hours of dispatch, complete with roast date stamps and elevation specs on every pouch.
              </p>
              <div className="stat-pills">
                <div className="stat-pill">
                  <span className="stat-num">40%+</span>
                  <span className="stat-txt">Above Fair Trade</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-num">48 Hours</span>
                  <span className="stat-txt">Roast Freshness</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coffee Club Newsletter */}
        <div className="newsletter-box">
          <div className="newsletter-content">
            <h3>Join The Sneaky Coffee Club</h3>
            <p>Get weekly barista brew tips, rare micro-lot drops, and 15% off your first coffee order.</p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="subscribed-msg">
                <Check size={18} /> Welcome to the Sneaky Coffee Club!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  <span>Subscribe</span>
                  <Send size={15} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
