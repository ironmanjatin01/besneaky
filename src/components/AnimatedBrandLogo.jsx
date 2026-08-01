import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SneakyLogo from './SneakyLogo'
import './AnimatedBrandLogo.css'

export default function AnimatedBrandLogo({ size = 30 }) {
  const [isHovered, setIsHovered] = useState(false)
  const isAnimating = useRef(false)

  const triggerAnimation = () => {
    if (isAnimating.current) return
    isAnimating.current = true

    setIsHovered(false)
    setTimeout(() => {
      setIsHovered(true)
      setTimeout(() => {
        isAnimating.current = false
      }, 850)
    }, 100)
  }

  useEffect(() => {
    // Trigger entrance animation on load
    triggerAnimation()
  }, [])

  return (
    <div
      className="animated-brand-logo"
      onMouseEnter={triggerAnimation}
      onClick={triggerAnimation}
      title="Hover or click to trigger 'be sneaky' animation"
    >
      {/* Single-line Sneaker Icon in Crisp Black Ink */}
      <SneakyLogo size={size} className="animated-brand-logo__icon" />

      {/* Brand Text Stage */}
      <div className="animated-brand-logo__stage">
        {/* Pre-allocated "be" slot on the left - "be" drops in from above */}
        <div className="be-slot">
          {isHovered && (
            <motion.span
              className="logo-text logo-text--be"
              initial={{ y: -50, opacity: 0, scale: 1.3, rotate: -12 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 450,
                damping: 17,
                mass: 0.85
              }}
            >
              be
            </motion.span>
          )}
        </div>

        {/* "sneaky" slot - "sneaky" slides in from the right with rubberband spring effect */}
        <div className="sneaky-slot">
          {isHovered && (
            <motion.span
              className="logo-text logo-text--sneaky"
              initial={{ x: 65, opacity: 0, scaleX: 1.25 }}
              animate={{ x: 0, opacity: 1, scaleX: 1 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 15,
                mass: 0.9
              }}
            >
              sneaky
            </motion.span>
          )}
        </div>

        {/* Glowing studio dot */}
        {isHovered && (
          <motion.span
            className="logo-dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 14, delay: 0.15 }}
          />
        )}
      </div>
    </div>
  )
}
