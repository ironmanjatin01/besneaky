import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'
import './AnimatedBrandLogo.css'

export default function AnimatedBrandLogo({ size = 30 }) {
  return (
    <a href="#" className="animated-brand-logo" title="BeSneaky Cafe — Specialty Coffee & Artisan Roastery">
      <motion.div
        className="coffee-logo__emblem"
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Coffee size={size * 0.8} className="coffee-logo__icon" />
      </motion.div>

      <div className="coffee-logo__text-wrap">
        <span className="coffee-logo__title">BESNEAKY</span>
        <span className="coffee-logo__sub">ARTISAN CAFE</span>
      </div>
    </a>
  )
}
