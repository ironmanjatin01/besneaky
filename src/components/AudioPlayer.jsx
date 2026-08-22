import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Disc, Sparkles, Music, ChevronUp, ChevronDown } from 'lucide-react'
import './AudioPlayer.css'

const mantras = [
  {
    id: 'ram_siya_ram',
    title: 'Ram Siya Ram, Siya Ram, Jai Jai Ram',
    raga: 'Raga Bhupali',
    tempo: 5200,
    chords: [[293.66, 369.99, 440.00], [246.94, 293.66, 369.99], [196.00, 246.94, 293.66], [220.00, 277.18, 329.63]],
    melody: [
      { freq: 369.99, delay: 0.0, dur: 0.7 },  // Ram (F#4)
      { freq: 440.00, delay: 0.45, dur: 0.6 }, // Si- (A4)
      { freq: 493.88, delay: 0.85, dur: 0.7 }, // -ya (B4)
      { freq: 440.00, delay: 1.25, dur: 0.7 }, // Ram (A4)
      { freq: 369.99, delay: 1.65, dur: 0.9 }, // (F#4)
      { freq: 293.66, delay: 2.25, dur: 0.6 }, // Si- (D4)
      { freq: 329.63, delay: 2.65, dur: 0.6 }, // -ya (E4)
      { freq: 369.99, delay: 3.05, dur: 1.0 }, // Ram (F#4)
      { freq: 440.00, delay: 3.75, dur: 0.6 }, // Jai (A4)
      { freq: 369.99, delay: 4.15, dur: 0.6 }, // Jai (F#4)
      { freq: 293.66, delay: 4.55, dur: 1.5 }  // Ram (D4)
    ]
  },
  {
    id: 'shri_ram_jai_ram',
    title: 'Shri Ram Jai Ram Jai Jai Ram',
    raga: 'Raga Yaman',
    tempo: 4400,
    chords: [[293.66, 369.99, 440.00], [220.00, 277.18, 329.63], [246.94, 311.13, 369.99]],
    melody: [
      { freq: 293.66, delay: 0.0, dur: 0.8 },
      { freq: 369.99, delay: 0.45, dur: 0.8 },
      { freq: 440.00, delay: 0.9, dur: 1.0 },
      { freq: 493.88, delay: 1.45, dur: 0.8 },
      { freq: 440.00, delay: 1.9, dur: 0.8 },
      { freq: 369.99, delay: 2.35, dur: 0.8 },
      { freq: 293.66, delay: 2.8, dur: 1.4 }
    ]
  },
  {
    id: 'hanuman_chalisa',
    title: 'Hanuman Chalisa Ambient Reverence',
    raga: 'Raga Malkauns',
    tempo: 4800,
    chords: [[196.00, 246.94, 293.66], [293.66, 369.99, 440.00]],
    melody: [
      { freq: 440.00, delay: 0.0, dur: 0.8 },
      { freq: 493.88, delay: 0.5, dur: 0.8 },
      { freq: 587.33, delay: 1.0, dur: 1.2 },
      { freq: 493.88, delay: 1.6, dur: 0.8 },
      { freq: 440.00, delay: 2.1, dur: 1.4 }
    ]
  }
]

export default function AudioPlayer({ isSpidermanTheme }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.25)
  const [isMuted, setIsMuted] = useState(false)
  const [activeMantraIndex, setActiveMantraIndex] = useState(0)
  const [showSelector, setShowSelector] = useState(false)

  const activeMantra = mantras[activeMantraIndex]

  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const tanpuraGainRef = useRef(null)
  const filterRef = useRef(null)
  const timerRef = useRef(null)

  // Initialize High-Fidelity Indian Classical Audio Engine
  const initAudioEngine = () => {
    if (audioCtxRef.current) return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    // Warm Resonant Acoustic Filter
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(1400, ctx.currentTime)
    lowpass.Q.setValueAtTime(1.1, ctx.currentTime)
    filterRef.current = lowpass

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(volume, ctx.currentTime)
    masterGain.connect(ctx.destination)
    lowpass.connect(masterGain)
    masterGainRef.current = masterGain

    // Continuous Tanpura Drone Generator (Sa-Pa-Sa / D3 - A3 - D4)
    const tanpuraGain = ctx.createGain()
    tanpuraGain.gain.setValueAtTime(0.04, ctx.currentTime)
    tanpuraGain.connect(lowpass)
    tanpuraGainRef.current = tanpuraGain

    const tanpuraFreqs = [146.83, 220.00, 293.66] // D3, A3, D4
    tanpuraFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      g.gain.setValueAtTime(0.02 / (i + 1), ctx.currentTime)
      osc.connect(g)
      g.connect(tanpuraGain)
      osc.start()
    })
  }

  // Play Sitar / Bansuri Flute pluck with natural vibrato & overtones
  const playOrganicInstrument = (freq, time, duration = 3.5, baseVol = 0.12) => {
    const ctx = audioCtxRef.current
    if (!ctx || ctx.state === 'closed') return

    // Multi-harmonic overtone spectrum for authentic Indian acoustic instruments
    const harmonics = [
      { mult: 1.0, type: 'triangle', gain: 1.0 },
      { mult: 2.0, type: 'sine', gain: 0.35 },
      { mult: 3.0, type: 'sine', gain: 0.15 },
      { mult: 0.5, type: 'sine', gain: 0.2 } // Warm sub octave
    ]

    harmonics.forEach(({ mult, type, gain: gainRatio }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq * mult, time)

      // Add gentle Bansuri flute vibrato
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.setValueAtTime(5.2, time) // 5.2Hz vibrato
      lfoGain.gain.setValueAtTime(freq * 0.008, time) // subtle pitch bend
      lfo.connect(osc.frequency)
      lfo.start(time)
      lfo.stop(time + duration)

      const peakVol = baseVol * gainRatio
      gain.gain.setValueAtTime(0.0001, time)
      gain.gain.linearRampToValueAtTime(peakVol, time + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)

      osc.connect(gain)
      if (filterRef.current) gain.connect(filterRef.current)

      osc.start(time)
      osc.stop(time + duration)
    })
  }

  // Play Temple Bell Chime
  const playTempleBell = (time) => {
    const ctx = audioCtxRef.current
    if (!ctx || ctx.state === 'closed') return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1174.66, time) // D6 bell
    gain.gain.setValueAtTime(0.04, time)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.5)
    osc.connect(gain)
    if (filterRef.current) gain.connect(filterRef.current)
    osc.start(time)
    osc.stop(time + 2.5)
  }

  // Mantra playback loop
  const startMantraLoop = () => {
    if (timerRef.current) clearInterval(timerRef.current)

    const playRoutine = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return
      const ctx = audioCtxRef.current
      const now = ctx.currentTime
      const m = mantras[activeMantraIndex]

      // Ring gentle temple chime at beginning of round
      playTempleBell(now)

      // Play backing chord pad
      const chord = m.chords[Math.floor(Math.random() * m.chords.length)]
      chord.forEach((f, idx) => {
        playOrganicInstrument(f, now + idx * 0.12, 5.0, 0.05)
      })

      // Play lead melody
      m.melody.forEach(({ freq, delay, dur }) => {
        playOrganicInstrument(freq, now + delay, dur, 0.1)
      })
    }

    playRoutine()
    timerRef.current = setInterval(playRoutine, activeMantra.tempo)
  }

  const startMusic = () => {
    if (!audioCtxRef.current) {
      initAudioEngine()
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    startMantraLoop()
    setIsPlaying(true)
    setIsMuted(false)
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime)
    }
  }

  const togglePlay = () => {
    if (!isPlaying) {
      startMusic()
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend()
      }
      setIsPlaying(false)
    }
  }

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value)
    setVolume(newVol)
    setIsMuted(newVol === 0)
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime)
    }
  }

  const toggleMute = () => {
    if (!masterGainRef.current || !audioCtxRef.current) return
    if (isMuted) {
      masterGainRef.current.gain.setValueAtTime(volume || 0.25, audioCtxRef.current.currentTime)
      setIsMuted(false)
    } else {
      masterGainRef.current.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime)
      setIsMuted(true)
    }
  }

  const selectMantra = (index) => {
    setActiveMantraIndex(index)
    setShowSelector(false)
    if (isPlaying) {
      setTimeout(() => startMantraLoop(), 100)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      startMantraLoop()
    }
  }, [activeMantraIndex])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioCtxRef.current) audioCtxRef.current.close()
    }
  }, [])

  return (
    <div className="audio-player-container">
      {/* Selector Dropdown Panel */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            className="audio-player__mantra-menu"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="menu-header">
              <Sparkles size={13} className="header-sparkle" />
              <span>Select Sacred Ambient Chant</span>
            </div>
            {mantras.map((m, idx) => (
              <button
                key={m.id}
                className={`menu-item ${idx === activeMantraIndex ? 'is-active' : ''}`}
                onClick={() => selectMantra(idx)}
              >
                <Music size={14} className="menu-item-icon" />
                <div className="menu-item-text">
                  <span className="m-title">{m.title}</span>
                  <span className="m-raga">{m.raga}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Renewed Audio Player Bar */}
      <div className={`audio-player-bar ${isPlaying ? 'is-active' : ''}`}>
        {/* Play/Pause Pulse Control */}
        <button
          className="audio-player__play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="play-icon-offset" />}
        </button>

        {/* Track Details & Selector Trigger */}
        <div className="audio-player__content" onClick={() => setShowSelector(!showSelector)}>
          <div className="track-title-wrap">
            <span className="track-title">{activeMantra.title}</span>
            <span className="track-raga">{activeMantra.raga}</span>
          </div>
          {showSelector ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>

        {/* Dynamic 6-Bar Equalizer */}
        {isPlaying && !isMuted && (
          <div className="audio-player__eq">
            <span className="eq-bar eq-bar--1" />
            <span className="eq-bar eq-bar--2" />
            <span className="eq-bar eq-bar--3" />
            <span className="eq-bar eq-bar--4" />
            <span className="eq-bar eq-bar--5" />
            <span className="eq-bar eq-bar--6" />
          </div>
        )}

        {/* Volume Controls */}
        <div className="audio-player__vol-wrap">
          <button className="audio-player__mute-btn" onClick={toggleMute} aria-label="Mute">
            {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="audio-player__slider"
            title="Adjust Volume"
          />
        </div>
      </div>
    </div>
  )
}
