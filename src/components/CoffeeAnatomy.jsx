import { useState } from 'react'
import { COFFEE_LAYERS_DATA } from '../data/coffeeData'
import { Coffee, Flame, Gauge, Info } from 'lucide-react'
import './CoffeeAnatomy.css'

export default function CoffeeAnatomy() {
  const [selectedId, setSelectedId] = useState('flatwhite')
  const currentCoffee = COFFEE_LAYERS_DATA.find((c) => c.id === selectedId) || COFFEE_LAYERS_DATA[2]

  return (
    <section className="coffee-anatomy" id="anatomy">
      <div className="coffee-anatomy__container">
        <div className="coffee-anatomy__header">
          <span className="coffee-anatomy__badge">
            <Coffee size={14} /> Interactive Coffee Vault
          </span>
          <h2 className="coffee-anatomy__title">Coffee Anatomy & Layer Explorer</h2>
          <p className="coffee-anatomy__desc">
            Explore the exact structural composition, liquid ratios, and microfoam textures that define world-class barista coffee crafts.
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

        {/* Interactive Cup Display & Breakdown Grid */}
        <div className="coffee-anatomy__content">
          {/* Glass Cup Visualizer */}
          <div className="coffee-anatomy__glass-wrapper">
            <div className="glass-cup">
              {/* Handles */}
              <div className="glass-cup__handle" />

              {/* Steam Particles */}
              <div className="glass-cup__steam steam-1" />
              <div className="glass-cup__steam steam-2" />
              <div className="glass-cup__steam steam-3" />

              {/* Liquid Layers */}
              <div className="glass-cup__inner">
                {currentCoffee.layers.map((layer, index) => (
                  <div
                    key={index}
                    className="glass-cup__layer"
                    style={{
                      height: `${layer.percentage}%`,
                      backgroundColor: layer.color
                    }}
                  >
                    <span className="glass-cup__layer-label">
                      {layer.name} ({layer.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-cup__saucer" />
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
                    <div
                      className="breakdown-bar-fill"
                      style={{
                        width: `${layer.percentage}%`,
                        backgroundColor: layer.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="coffee-anatomy__tip">
              <Info size={16} />
              <span>
                <strong>Barista Tip:</strong> For optimum flavor, consume within 3 minutes of pour while microfoam holds its velvety creaminess.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
