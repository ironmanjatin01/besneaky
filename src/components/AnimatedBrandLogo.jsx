import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import './AnimatedBrandLogo.css'

export default function AnimatedBrandLogo({ size = 30 }) {
  return (
    <a href="#" className="animated-brand-logo" title="RAMAYANA — The Eternal Epic of Dharma">
      <motion.div
        className="ramayan-logo__emblem"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        <Sparkles size={size * 0.75} className="ramayan-logo__star" />
      </motion.div>

      <div className="ramayan-logo__text-wrap">
        <span className="ramayan-logo__hindi">श्री रामायण</span>
        <span className="ramayan-logo__english">RAMAYANA</span>
      </div>
    </a>
  )
}
