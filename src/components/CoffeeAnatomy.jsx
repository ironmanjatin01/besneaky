import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COFFEE_LAYERS_DATA } from '../data/coffeeData'
import { Coffee, Flame, Gauge, Info, Sparkles } from 'lucide-react'
import './CoffeeAnatomy.css'

export default function CoffeeAnatomy() {
  const [selectedId, setSelectedId] = useState('flatwhite')
  const currentCoffee = COFFEE_LAYERS_DATA.find((c) => c.id === selectedId) || COFFEE_LAYERS_DATA[2]

  // Calculate cumulative layer heights for inner chamber (y=40 to y=304, total height 264px)
  const totalChamberHeight = 264
  const baseChamberY = 304

  let currentY = baseChamberY
  const animatedLayers = currentCoffee.layers.map((layer) => {
    const layerH = (layer.percentage / 100) * totalChamberHeight
    const layerY = currentY - layerH
    currentY = layerY
    return {
      ...layer,
      height: layerH,
      y: layerY
    }
  })

  return (
    <section className="coffee-anatomy" id="anatomy">
      <div className="coffee-anatomy__container">
        <div className="coffee-anatomy__header">
          <span className="coffee-anatomy__badge">
            <Sparkles size={14} /> Interactive Coffee Vault
          </span>
          <h2 className="coffee-anatomy__title">Coffee Anatomy & Layer Explorer</h2>
          <p className="coffee-anatomy__desc">
            Select a barista recipe below to explore its exact layer composition inside our minimalist artisan glass tumbler.
          </p>
        </div>

        {/* Coffee Selector Tabs */}
        <div className="coffee-anatomy__tabs">
          {COFFEE_LAYERS_DATA.map((coffee) => (
            <button
              key={coffee.id}
              className={`coffee-anatomy__tab ${selectedId === coffee.id ? 'is-active' : ''}`}
              onClick={() => setSelectedId(coffee.id)}
            >
              {coffee.name}
            </button>
          ))}
        </div>

        {/* Interactive Minimalist Coffee Glass & Breakdown Grid */}
        <div className="coffee-anatomy__content">
          {/* Minimalist Glass Tumbler Visualizer */}
          <div className="coffee-anatomy__glass-wrapper">
            <div className="svg-mug-container">
              {/* Steam Particles */}
              <div className="glass-cup__steam steam-1" style={{ top: '-10px', left: '105px' }} />
              <div className="glass-cup__steam steam-2" style={{ top: '-15px', left: '140px' }} />
              <div className="glass-cup__steam steam-3" style={{ top: '-10px', left: '175px' }} />

              <svg
                width="280"
                height="360"
                viewBox="0 0 280 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="liquid-glass-svg-mug"
              >
                <defs>
                  {/* Minimalist Inner Chamber Mask/Clip */}
                  <clipPath id="minimalistInnerClip">
                    <path d="M 60 40 C 60 122, 74 228, 88 304 C 97 312, 183 312, 192 304 C 206 228, 220 122, 220 40 Z" />
                  </clipPath>

                  {/* Clean Minimalist Glass Fill Gradient */}
                  <linearGradient id="minimalistGlassFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                    <stop offset="50%" stopColor="rgba(230, 245, 255, 0.15)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" />
                  </linearGradient>

                  {/* Microfoam Milk Bubble Texture Pattern */}
                  <pattern id="microfoamBubblesPattern" width="28" height="28" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="2.2" fill="rgba(255, 255, 255, 0.7)" stroke="rgba(195, 175, 160, 0.45)" strokeWidth="0.5" />
                    <circle cx="16" cy="7" r="3.2" fill="rgba(255, 255, 255, 0.6)" stroke="rgba(185, 165, 150, 0.4)" strokeWidth="0.6" />
                    <circle cx="24" cy="3" r="1.5" fill="rgba(255, 255, 255, 0.8)" stroke="rgba(205, 185, 170, 0.5)" strokeWidth="0.5" />
                    <circle cx="9" cy="18" r="2.8" fill="rgba(255, 255, 255, 0.65)" stroke="rgba(190, 170, 155, 0.45)" strokeWidth="0.5" />
                    <circle cx="21" cy="20" r="2.0" fill="rgba(255, 255, 255, 0.75)" stroke="rgba(200, 180, 165, 0.4)" strokeWidth="0.5" />
                    <circle cx="3" cy="25" r="1.6" fill="rgba(255, 255, 255, 0.6)" stroke="rgba(210, 190, 175, 0.5)" strokeWidth="0.5" />
                    <circle cx="27" cy="14" r="2.5" fill="rgba(255, 255, 255, 0.7)" stroke="rgba(180, 160, 145, 0.45)" strokeWidth="0.5" />
                    <circle cx="14" cy="26" r="1.8" fill="rgba(255, 255, 255, 0.65)" stroke="rgba(200, 180, 165, 0.4)" strokeWidth="0.5" />
                  </pattern>
                </defs>

                {/* Minimalist Outer Glass Shell */}
                <path
                  d="M 55 35 C 55 120, 70 230, 85 310 C 95 320, 185 320, 195 310 C 210 230, 225 120, 225 35 Z"
                  fill="url(#minimalistGlassFill)"
                  stroke="var(--mug-outline, #1f2925)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                {/* Minimalist Flared Outer Glass Lip Rim */}
                <ellipse cx="140" cy="35" rx="85" ry="8" fill="rgba(255,255,255,0.6)" stroke="var(--mug-outline, #1f2925)" strokeWidth="2.5" />

                {/* Thin Double Wall Inner Chamber Line */}
                <path
                  d="M 60 40 C 60 122, 74 228, 88 304 C 97 312, 183 312, 192 304 C 206 228, 220 122, 220 40 Z"
                  fill="rgba(255, 255, 255, 0.08)"
                  stroke="rgba(31, 41, 37, 0.25)"
                  strokeWidth="1.5"
                />

                {/* Animated Opaque Composition Layers inside Minimalist Inner Chamber */}
                <g clipPath="url(#minimalistInnerClip)">
                  <AnimatePresence mode="wait">
                    <g key={selectedId}>
                      {animatedLayers.map((layer, index) => {
                        const isFoam = /foam|crema|aerated|cloud|micro/i.test(layer.name)
                        return (
                          <g key={index}>
                            <motion.rect
                              x="50"
                              width="180"
                              initial={{ y: baseChamberY, height: 0 }}
                              animate={{ y: layer.y, height: layer.height }}
                              transition={{
                                duration: 0.7,
                                delay: index * 0.18,
                                ease: [0.16, 1, 0.3, 1]
                              }}
                              fill={layer.color}
                              fillOpacity={1}
                            />
                            {isFoam && (
                              <>
                                {/* Microfoam Bubble Texture Overlay */}
                                <motion.rect
                                  x="50"
                                  width="180"
                                  initial={{ y: baseChamberY, height: 0 }}
                                  animate={{ y: layer.y, height: layer.height }}
                                  transition={{
                                    duration: 0.7,
                                    delay: index * 0.18,
                                    ease: [0.16, 1, 0.3, 1]
                                  }}
                                  fill="url(#microfoamBubblesPattern)"
                                  pointerEvents="none"
                                />
                                {/* Surface Froth Bubbles along top edge */}
                                <motion.g
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.18 + 0.5, duration: 0.4 }}
                                >
                                  {Array.from({ length: 16 }).map((_, bIdx) => {
                                    const bubbleX = 65 + bIdx * 9.5
                                    const bubbleR = 1.8 + ((bIdx * 7) % 3.5)
                                    const offsetY = (bIdx % 3) * 0.8
                                    return (
                                      <circle
                                        key={bIdx}
                                        cx={bubbleX}
                                        cy={layer.y + 2 + offsetY}
                                        r={bubbleR}
                                        fill="rgba(255, 255, 255, 0.85)"
                                        stroke="rgba(200, 180, 165, 0.5)"
                                        strokeWidth="0.5"
                                      />
                                    )
                                  })}
                                </motion.g>
                              </>
                            )}
                          </g>
                        )
                      })}
                    </g>
                  </AnimatePresence>
                </g>

                {/* Minimalist Glass Specular Shimmer Highlight */}
                <path
                  d="M 57 50 C 56 120, 70 230, 83 306"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.75)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Chunky beSneaky Etch Typography (Positioned near opening rim with original subtle tilt) */}
                <g transform="rotate(-2 140 85)">
                  <text
                    x="140"
                    y="85"
                    textAnchor="middle"
                    fill="rgba(255, 255, 255, 0.98)"
                    fontSize="31"
                    fontWeight="900"
                    fontFamily="DM Sans, sans-serif"
                    letterSpacing="-1.5"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
                  >
                    beSneaky
                  </text>
                </g>
              </svg>

              {/* Minimalist Emerald Coaster Base */}
              <div className="double-wall-coaster" style={{ width: '190px' }} />
            </div>
          </div>

          {/* Details & Ratio Metrics */}
          <div className="coffee-anatomy__details">
            <h3 className="coffee-anatomy__name">{currentCoffee.name}</h3>
            <p className="coffee-anatomy__tagline">{currentCoffee.tagline}</p>

            <div className="coffee-anatomy__metrics">
              <div className="metric-box">
                <Gauge size={18} className="metric-icon" />
                <div>
                  <span className="metric-label">Extraction Ratio</span>
                  <span className="metric-value">{currentCoffee.ratioText}</span>
                </div>
              </div>

              <div className="metric-box">
                <Flame size={18} className="metric-icon" />
                <div>
                  <span className="metric-label">Serving Temp</span>
                  <span className="metric-value">{currentCoffee.tempText}</span>
                </div>
              </div>

              <div className="metric-box">
                <Coffee size={18} className="metric-icon" />
                <div>
                  <span className="metric-label">Coffee Strength</span>
                  <span className="metric-value">{currentCoffee.intensityText}</span>
                </div>
              </div>
            </div>

            {/* Layer Breakdown Progress Bars */}
            <div className="coffee-anatomy__breakdown">
              <h4 className="breakdown-title">Proportion Breakdown</h4>
              {currentCoffee.layers.map((layer, idx) => (
                <div key={idx} className="breakdown-row">
                  <div className="breakdown-info">
                    <span className="breakdown-dot" style={{ backgroundColor: layer.color }} />
                    <span className="breakdown-name">{layer.name}</span>
                    <span className="breakdown-pct">{layer.percentage}%</span>
                  </div>
                  <div className="breakdown-bar-bg">
                    <motion.div
                      className="breakdown-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${layer.percentage}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.15 }}
                      style={{ backgroundColor: layer.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="coffee-anatomy__tip">
              <Info size={16} />
              <span>
                <strong>Barista Tip:</strong> Double-wall thermal borosilicate glass keeps outer walls cool to touch while maintaining ideal extraction temp.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
