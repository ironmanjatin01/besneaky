import { motion } from 'framer-motion'
import { Feather, ShieldCheck, Truck, Sparkles, Compass } from 'lucide-react'
import './About.css'

const marqueeItems = [
  "MEN'S GARMENTS",
  "WOMEN'S COSMETICS",
  "BOTANICAL RADIANCE",
  "ATELIER TAILORING",
  "CURATED STUDIO DROPS",
  "SILK & CASHMERE"
]

const features = [
  {
    icon: Feather,
    title: 'Atelier Tailoring',
    desc: 'Crafted from pure French linen, Italian camel wool, and Mongolian cashmere for quiet elegance.'
  },
  {
    icon: ShieldCheck,
    title: 'Botanical Radiance',
    desc: 'Dermatologist-tested formulas enriched with cold-pressed Damask Rose and Hyaluronic Acid.'
  },
  {
    icon: Truck,
    title: 'Global Priority Express',
    desc: 'Double-boxed priority express shipping delivered worldwide within 48 hours of release.'
  }
]

export default function About() {
  return (
    <section id="about" className="about-section">
      {/* Infinite Horizontal Marquee Banner */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="marquee-item">
              <span>{item}</span>
              <Sparkles size={14} className="marquee-star" />
            </div>
          ))}
        </div>
      </div>

      <div className="about-container">
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="about__badge">
            <Compass size={12} />
            <span>Our Philosophy</span>
          </div>
          <h2 className="about__title">Couture garments & botanical beauty built for quiet elegance.</h2>
          <p className="about__subtitle">
            Besneaky is a curated design house for fashion and beauty connoisseurs. We collaborate directly with independent ateliers and botanical laboratories to bring limited edition drops to those who move differently.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="about__grid">
          {features.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                className="about-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="about-card__icon-wrap">
                  <Icon size={24} className="about-card__icon" />
                </div>
                <h3 className="about-card__title">{item.title}</h3>
                <p className="about-card__desc">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats bar */}
        <motion.div
          className="about-stats"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Authentic Studio Drops</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">48hr</span>
            <span className="stat-label">Express Worldwide Shipping</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">4.9/5</span>
            <span className="stat-label">Collector Satisfaction</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
