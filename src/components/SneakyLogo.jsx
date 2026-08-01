import { motion } from 'framer-motion'

export default function SneakyLogo({ size = 36, className = '' }) {
  return (
    <motion.div
      className={`sneaky-png-logo ${className}`}
      whileHover={{ scale: 1.1, rotate: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 16 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: size,
        flexShrink: 0
      }}
    >
      <img
        src="/sneaker.png"
        alt="sneaker logo"
        style={{
          height: '100%',
          width: 'auto',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
          mixBlendMode: 'multiply'
        }}
      />
    </motion.div>
  )
}
