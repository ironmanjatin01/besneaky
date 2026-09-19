import { useState, useEffect, useRef } from 'react'
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Music,
  X,
  ChevronUp,
  Disc,
  Radio,
  Sparkles
} from 'lucide-react'
import { jazzSynth, JAZZ_PRESETS } from '../utils/jazzSynth'
import './JazzPlayer.css'

export default function JazzPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.35)
  const [presetIndex, setPresetIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const [eqLevels, setEqLevels] = useState([3, 3, 3, 3, 3])
  const animationFrameRef = useRef(null)

  // Listen to engine state updates
  useEffect(() => {
    const unsubscribe = jazzSynth.subscribe((state) => {
      setIsPlaying(state.isPlaying)
      setVolume(state.volume)
      setPresetIndex(state.presetIndex)
    })
    return () => unsubscribe()
  }, [])

  // Audio equalizer bar animation frame loop
  useEffect(() => {
    const freqData = new Uint8Array(32)

    const updateEq = () => {
      if (jazzSynth.isPlaying) {
        jazzSynth.getFrequencyData(freqData)
        // Extract 5 frequency bands
        const b1 = Math.max(4, Math.floor((freqData[1] / 255) * 16))
        const b2 = Math.max(4, Math.floor((freqData[3] / 255) * 16))
        const b3 = Math.max(4, Math.floor((freqData[6] / 255) * 16))
        const b4 = Math.max(4, Math.floor((freqData[10] / 255) * 16))
        const b5 = Math.max(4, Math.floor((freqData[14] / 255) * 16))
        setEqLevels([b1, b2, b3, b4, b5])
      } else {
        setEqLevels([3, 3, 3, 3, 3])
      }
      animationFrameRef.current = requestAnimationFrame(updateEq)
    }

    animationFrameRef.current = requestAnimationFrame(updateEq)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const handleTogglePlay = () => {
    setShowPrompt(false)
    jazzSynth.toggle()
  }

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    jazzSynth.setVolume(val)
  }

  const handlePresetSelect = (idx) => {
    setPresetIndex(idx)
    jazzSynth.setPreset(idx)
  }

  const currentPreset = JAZZ_PRESETS[presetIndex] || JAZZ_PRESETS[0]

  return (
    <>
      {/* Soft First-Visit Prompt Toast */}
      {showPrompt && !isPlaying && (
        <div className="jazz-prompt-toast">
          <Sparkles size={16} style={{ color: 'var(--sun)' }} />
          <span>Soft Jazz Lounge Tunes available</span>
          <button className="jazz-prompt-btn" onClick={handleTogglePlay}>
            Play 🎷
          </button>
          <button
            className="icon-btn"
            onClick={() => setShowPrompt(false)}
            aria-label="Dismiss prompt"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Floating Jazz Widget Container */}
      <div className="jazz-player-widget">
        {!isExpanded ? (
          /* Minimized Vinyl Disc Controller */
          <button
            className="jazz-player__minimized"
            onClick={() => setIsExpanded(true)}
            aria-label="Expand Jazz Lounge Player"
            title="Open Soft Jazz Music Controller"
          >
            <div className={`vinyl-disc ${isPlaying ? 'is-spinning' : ''}`}>
              <Disc size={18} />
            </div>

            <div className="jazz-player__mini-info">
              <span className="mini-title">
                {isPlaying ? currentPreset.name : 'Soft Jazz Lounge'}
              </span>
              <span className="mini-subtitle">
                {isPlaying ? `${Math.round(volume * 100)}% Volume` : 'Click to Play'}
              </span>
            </div>

            {/* Live Audio Equalizer Waves */}
            <div className="eq-bars">
              {eqLevels.map((lvl, idx) => (
                <div
                  key={idx}
                  className={`eq-bar ${isPlaying ? 'is-active' : ''}`}
                  style={{ height: `${lvl}px` }}
                />
              ))}
            </div>

            <ChevronUp size={16} style={{ color: 'var(--muted)', marginLeft: '0.2rem' }} />
          </button>
        ) : (
          /* Expanded Jazz Audio Card */
          <div className="jazz-player__card">
            {/* Header */}
            <div className="jazz-player__header">
              <div className="jazz-player__badge">
                <Radio size={13} />
                <span>Sneaky Jazz Lounge</span>
              </div>
              <div className="jazz-player__actions">
                <button
                  className="icon-btn"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Minimize player"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Currently Playing Track Info */}
            <div className="jazz-player__track-info">
              <div className={`vinyl-disc ${isPlaying ? 'is-spinning' : ''}`} style={{ width: 40, height: 40 }}>
                <Music size={20} />
              </div>
              <div className="track-text">
                <span className="track-title">{currentPreset.name}</span>
                <span className="track-desc">{currentPreset.description}</span>
              </div>
            </div>

            {/* Primary Controls & Volume Slider */}
            <div className="jazz-player__controls">
              <button
                className="play-main-btn"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Pause Jazz Music' : 'Play Soft Jazz Music'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
              </button>

              <div className="volume-control-wrap">
                {volume === 0 ? (
                  <VolumeX size={16} style={{ color: 'var(--muted)' }} />
                ) : volume < 0.4 ? (
                  <Volume1 size={16} style={{ color: 'var(--green)' }} />
                ) : (
                  <Volume2 size={16} style={{ color: 'var(--green)' }} />
                )}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  aria-label="Jazz Music Volume"
                />
                <span className="volume-text">{Math.round(volume * 100)}%</span>
              </div>
            </div>

            {/* Jazz Tone & Preset Picker */}
            <div className="jazz-player__presets">
              <span className="presets-label">Soft Jazz Mood presets</span>
              <div className="presets-grid">
                {JAZZ_PRESETS.map((p, idx) => (
                  <button
                    key={p.id}
                    className={`preset-pill ${presetIndex === idx ? 'is-active' : ''}`}
                    onClick={() => handlePresetSelect(idx)}
                  >
                    {p.id === 'lounge' && '🎷 Midnight'}
                    {p.id === 'bossa' && '☕ Bossa'}
                    {p.id === 'velvet' && '🌧️ Velvet'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
