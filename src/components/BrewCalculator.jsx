import { useState } from 'react'
import { BREWING_METHODS } from '../data/coffeeData'
import { Droplets, Clock, Thermometer, Sliders, CheckCircle2, Play, Pause, RotateCcw } from 'lucide-react'
import './BrewCalculator.css'

export default function BrewCalculator() {
  const [selectedMethodId, setSelectedMethodId] = useState('v60')
  const [coffeeGrams, setCoffeeGrams] = useState(15)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const method = BREWING_METHODS.find((m) => m.id === selectedMethodId) || BREWING_METHODS[0]
  const calculatedWaterMl = Math.round(coffeeGrams * method.ratio)

  // Timer helper
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimerSeconds(0)
  }

  // Timer effect
  useState(() => {
    let interval = null
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <section className="brew-calc" id="brewlab">
      <div className="brew-calc__container">
        <div className="brew-calc__header">
          <span className="brew-calc__badge">
            <Sliders size={14} /> The Barista Lab
          </span>
          <h2 className="brew-calc__title">Precision Brew Ratio Calculator</h2>
          <p className="brew-calc__desc">
            Dial in your daily pour-over, immersion, or espresso extractions with Golden Ratio water measurements and step-by-step brew guides.
          </p>
        </div>

        {/* Method Selection Grid */}
        <div className="brew-calc__methods">
          {BREWING_METHODS.map((m) => (
            <button
              key={m.id}
              className={`brew-calc__method-card ${selectedMethodId === m.id ? 'is-selected' : ''}`}
              onClick={() => {
                setSelectedMethodId(m.id)
                if (m.id === 'espresso') setCoffeeGrams(18)
                else setCoffeeGrams(15)
                resetTimer()
              }}
            >
              <h4 className="method-name">{m.name}</h4>
              <span className="method-ratio">Ratio 1:{m.ratio}</span>
            </button>
          ))}
        </div>

        {/* Main Calculator Workspace */}
        <div className="brew-calc__workspace">
          {/* Controls Column */}
          <div className="brew-calc__controls">
            <h3 className="workspace-title">Adjust Dose & Ratio</h3>

            <div className="control-group">
              <div className="control-header">
                <label htmlFor="coffee-dose-slider">Coffee Dose (Grams)</label>
                <span className="control-val">{coffeeGrams} g</span>
              </div>
              <input
                id="coffee-dose-slider"
                type="range"
                min={selectedMethodId === 'espresso' ? 12 : 10}
                max={selectedMethodId === 'espresso' ? 22 : 60}
                step={1}
                value={coffeeGrams}
                onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                className="brew-slider"
              />
              <div className="slider-range-labels">
                <span>{selectedMethodId === 'espresso' ? '12g' : '10g'}</span>
                <span>{selectedMethodId === 'espresso' ? '22g' : '60g'}</span>
              </div>
            </div>

            {/* Calculated Output Cards */}
            <div className="output-grid">
              <div className="output-card highlight">
                <Droplets size={22} className="output-icon" />
                <div className="output-text">
                  <span className="output-label">Target Water Weight</span>
                  <span className="output-val">{calculatedWaterMl} ml / g</span>
                </div>
              </div>

              <div className="output-card">
                <Thermometer size={20} className="output-icon" />
                <div className="output-text">
                  <span className="output-label">Water Temp</span>
                  <span className="output-val">{method.idealTemp}</span>
                </div>
              </div>

              <div className="output-card">
                <Sliders size={20} className="output-icon" />
                <div className="output-text">
                  <span className="output-label">Grind Size</span>
                  <span className="output-val">{method.grind}</span>
                </div>
              </div>

              <div className="output-card">
                <Clock size={20} className="output-icon" />
                <div className="output-text">
                  <span className="output-label">Target Brew Time</span>
                  <span className="output-val">{formatTime(method.timeSec)}</span>
                </div>
              </div>
            </div>

            {/* Built-in Barista Timer */}
            <div className="barista-timer">
              <div className="timer-display">
                <span className="timer-clock">{formatTime(timerSeconds)}</span>
                <span className="timer-target">/ {formatTime(method.timeSec)} target</span>
              </div>
              <div className="timer-actions">
                <button
                  className={`timer-btn ${isTimerRunning ? 'is-pause' : 'is-start'}`}
                  onClick={toggleTimer}
                >
                  {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                </button>
                <button className="timer-reset-btn" onClick={resetTimer} title="Reset Timer">
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Steps & Guide Column */}
          <div className="brew-calc__steps-panel">
            <h3 className="workspace-title">Pouring & Extraction Sequence</h3>
            <div className="steps-list">
              {method.steps.map((stepText, idx) => (
                <div key={idx} className="step-item">
                  <div className="step-number">{idx + 1}</div>
                  <div className="step-content">
                    <p>{stepText}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="brew-completion-note">
              <CheckCircle2 size={18} />
              <span>Pour slowly and enjoy the rich aromatic fragrance of fresh coffee extraction!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
