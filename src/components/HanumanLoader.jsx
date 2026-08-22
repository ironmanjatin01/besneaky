import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import './HanumanLoader.css'

export default function HanumanLoader({ onLoadingComplete }) {
  const [stage, setStage] = useState('flying') // 'flying' | 'zooming' | 'done'

  useEffect(() => {
    // Stage 1: Flying across sky (0s to 2.2s)
    const timer1 = setTimeout(() => {
      setStage('zooming')
    }, 2200)

    // Stage 2: Mountain zoom transition & reveal main site (3.4s)
    const timer2 = setTimeout(() => {
      setStage('done')
      if (onLoadingComplete) onLoadingComplete()
    }, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onLoadingComplete])

  if (stage === 'done') return null

  return (
    <AnimatePresence>
      <motion.div
        className="hanuman-loader-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'zooming' ? [1, 1, 0] : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, times: [0, 0.7, 1] }}
      >
        {/* Starry Night Canvas Background */}
        <div className="hanuman-loader__stars" />

        {/* Top Divine Title Badge */}
        <motion.div
          className="hanuman-loader__badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: stage === 'zooming' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={16} className="loader-star-icon" />
          <span>जय श्री राम • JAI SHRI RAM</span>
        </motion.div>

        {/* Flying Hanumanji Stage */}
        <div className="hanuman-loader__viewport">
          <motion.div
            className="hanuman-loader__character-wrap"
            initial={{ x: '-110vw', y: '10vh', scale: 0.65, rotate: -5 }}
            animate={
              stage === 'flying'
                ? { x: '0vw', y: '0vh', scale: 1, rotate: 0 }
                : { scale: 28, x: '15vw', y: '-30vh', opacity: [1, 1, 0.9, 0] }
            }
            transition={
              stage === 'flying'
                ? { duration: 2.1, ease: [0.16, 1, 0.3, 1] }
                : { duration: 1.3, ease: [0.7, 0, 0.84, 0] }
            }
          >
            {/* Glowing Sanjeevani Mountain Backlight Aura */}
            <div className="hanuman-loader__sanjeevani-aura" />

            {/* Hanumanji Artwork */}
            <img
              src="/ramayan/hanuman_leap.jpg"
              alt="Lord Hanuman Flying with Sanjeevani Mountain"
              className="hanuman-loader__img"
            />
          </motion.div>
        </div>

        {/* Blinding Golden Flash Transition */}
        {stage === 'zooming' && (
          <motion.div
            className="hanuman-loader__flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.3, times: [0, 0.5, 0.8, 1] }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
