import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import './HanumanLoader.css'

export default function HanumanLoader({ onLoadingComplete }) {
  const [stage, setStage] = useState('flying') // 'flying' | 'zooming' | 'done'

  useEffect(() => {
    // Stage 1: 7.5 seconds of cinematic flight across screen staying nicely centered
    const timer1 = setTimeout(() => {
      setStage('zooming')
    }, 7500)

    // Stage 2: Deep zoom into Sanjeevani mountain peak ending at 10.0 seconds
    const timer2 = setTimeout(() => {
      setStage('done')
      if (onLoadingComplete) onLoadingComplete()
    }, 10000)

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
        transition={{ duration: 1.0, times: [0, 0.7, 1] }}
      >
        {/* Starry Night Sky Canvas */}
        <div className="hanuman-loader__stars" />

        {/* Top Divine Title Badge */}
        <motion.div
          className="hanuman-loader__badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: stage === 'zooming' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles size={16} className="loader-star-icon" />
          <span>जय श्री राम • JAI SHRI RAM</span>
        </motion.div>

        {/* Pure 100% Isolated Flying Hanumanji & Mountain Stage */}
        <div className="hanuman-loader__viewport">
          <motion.div
            className="hanuman-loader__character-wrap"
            initial={{ x: '-110vw', y: '5vh', scale: 0.7, rotate: -4 }}
            animate={
              stage === 'flying'
                ? {
                    x: '10vw',
                    y: ['2vh', '-3vh', '2vh', '-3vh', '0vh'],
                    scale: 2.2,
                    rotate: 0
                  }
                : {
                    scale: 40,
                    x: '30vw',
                    y: '-32vh',
                    opacity: [1, 1, 0.8, 0]
                  }
            }
            transition={
              stage === 'flying'
                ? {
                    x: { duration: 7.5, ease: [0.25, 1, 0.5, 1] },
                    y: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' },
                    scale: { duration: 7.5, ease: [0.25, 1, 0.5, 1] }
                  }
                : {
                    duration: 1.8,
                    ease: [0.7, 0, 0.84, 0]
                  }
            }
          >
            {/* Sanjeevani Mountain Glow Aura */}
            <div className="hanuman-loader__sanjeevani-glow" />

            {/* Pure 100% Cutout PNG Artwork (ONLY Hanumanji & Mountain) */}
            <img
              src="/ramayan/hanuman_pure.png"
              alt="Lord Hanuman Flying with Sanjeevani Mountain"
              className="hanuman-loader__png-img"
            />
          </motion.div>
        </div>

        {/* Blinding Golden Flash Transition */}
        {stage === 'zooming' && (
          <motion.div
            className="hanuman-loader__flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 2.2, times: [0, 0.4, 0.75, 0.9, 1] }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
