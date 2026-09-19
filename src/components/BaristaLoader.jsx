import { useEffect, useState } from 'react'
import { Coffee, Flame, Award, Sparkles } from 'lucide-react'
import './BaristaLoader.css'

export default function BaristaLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0)
  const [phaseText, setPhaseText] = useState('Warming grouphead boilers to 93°C...')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsDone(true)
            onLoadingComplete?.()
          }, 400)
          return 100
        }
        const next = prev + 2
        if (next === 26) setPhaseText('Grinding single-origin Ethiopian Yirgacheffe...')
        if (next === 52) setPhaseText('Tamping with 30lbs precision pressure...')
        if (next === 78) setPhaseText('Extracting golden liquid crema under 9 bars...')
        if (next === 96) setPhaseText('BeSneaky Cafe is ready!')
        return next
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  if (isDone) return null

  return (
    <div className={`barista-loader ${progress === 100 ? 'is-fading' : ''}`}>
      <div className="barista-loader__card">
        {/* Steam Animation Header */}
        <div className="barista-loader__icon-wrap">
          <div className="steam-wave steam-wave-1"></div>
          <div className="steam-wave steam-wave-2"></div>
          <div className="steam-wave steam-wave-3"></div>
          <Coffee size={48} className="loader-coffee-icon" />
        </div>

        <h2 className="barista-loader__title">BESNEAKY CAFE</h2>
        <p className="barista-loader__subtitle">Artisan Specialty Coffee & Roastery</p>

        {/* Crema Drip Animation Progress Bar */}
        <div className="barista-loader__bar-outer">
          <div
            className="barista-loader__bar-inner"
            style={{ width: `${progress}%` }}
          />
          <div
            className="barista-loader__drip"
            style={{ left: `${Math.min(progress, 98)}%` }}
          />
        </div>

        <div className="barista-loader__status">
          <span className="loader-percentage">{progress}%</span>
          <span className="loader-phase">{phaseText}</span>
        </div>

        <div className="barista-loader__badges">
          <span><Flame size={12} /> 93°C Extraction</span>
          <span><Award size={12} /> 100% Arabica</span>
          <span><Sparkles size={12} /> Fresh Roast</span>
        </div>
      </div>
    </div>
  )
}
