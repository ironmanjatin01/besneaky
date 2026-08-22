import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Disc } from 'lucide-react'
import './AudioPlayer.css'

export default function AudioPlayer({ isSpidermanTheme }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [trackTitle] = useState('🌸 Shri Ram Jai Ram — Divine Ambient Chants')

  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const filterRef = useRef(null)
  const timerRef = useRef(null)
  const autoPlayAttempted = useRef(false)

  // Divine Veena & Flute Ramayan Synthesizer
  const initDivineRamayanAudio = () => {
    if (audioCtxRef.current) return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    // Warm Lowpass Filter for Veena & Sitar acoustics
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(1200, ctx.currentTime)
    lowpass.Q.setValueAtTime(1.2, ctx.currentTime)
    filterRef.current = lowpass

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.12, ctx.currentTime)
    masterGain.connect(ctx.destination)
    lowpass.connect(masterGain)
    masterGainRef.current = masterGain

    // Raga Bhupali / Yaman Divine Chants Frequencies
    const ramayanChords = [
      [293.66, 369.99, 440.00], // D Major (D4, F#4, A4)
      [220.00, 277.18, 329.63], // A Major (A3, C#4, E4)
      [246.94, 311.13, 369.99], // Bm (B3, D#4, F#4)
      [196.00, 246.94, 293.66]  // G Major (G3, B3, D4)
    ]

    // "Shri Ram Jai Ram Jai Jai Ram" Veena Melody
    const chantMelody = [
      [
        { freq: 293.66, delay: 0.0, dur: 0.8 }, // Shri
        { freq: 369.99, delay: 0.45, dur: 0.8 }, // Ram
        { freq: 440.00, delay: 0.9, dur: 1.0 }, // Jai
        { freq: 493.88, delay: 1.45, dur: 0.8 }, // Ram
        { freq: 440.00, delay: 1.9, dur: 0.8 }, // Jai
        { freq: 369.99, delay: 2.35, dur: 0.8 }, // Jai
        { freq: 293.66, delay: 2.8, dur: 1.4 }  // Ram
      ]
    ]

    let step = 0

    // Synthesize Veena plucked string timbre with resonance overtones
    const playVeenaString = (freq, time, duration = 4.0, volume = 0.08) => {
      if (!ctx || ctx.state === 'closed') return

      const harmonics = [
        { mult: 1, gainRatio: 1.0 },
        { mult: 2, gainRatio: 0.4 },
        { mult: 3, gainRatio: 0.18 }
      ]

      harmonics.forEach(({ mult, gainRatio }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq * mult, time)

        const peakVol = volume * gainRatio
        gain.gain.setValueAtTime(0.0001, time)
        gain.gain.linearRampToValueAtTime(peakVol, time + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)

        osc.connect(gain)
        gain.connect(lowpass)

        osc.start(time)
        osc.stop(time + duration)
      })
    }

    const playRamayanRoutine = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return

      const now = ctx.currentTime
      const chord = ramayanChords[step % ramayanChords.length]
      const melody = chantMelody[0]

      // Play ambient background Veena drone
      chord.forEach((freq, idx) => {
        playVeenaString(freq, now + idx * 0.12, 4.8, 0.05)
      })

      // Play "Shri Ram Jai Ram" melodic chant notes
      melody.forEach(({ freq, delay, dur }) => {
        playVeenaString(freq, now + delay, dur, 0.085)
      })

      step++
    }

    playRamayanRoutine()
    timerRef.current = setInterval(playRamayanRoutine, 4200)
  }

  const startMusic = () => {
    if (!audioCtxRef.current) {
      initDivineRamayanAudio()
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    setIsPlaying(true)
    setIsMuted(false)
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime)
    }
  }

  const togglePlay = () => {
    if (!isPlaying) {
      startMusic()
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend()
      }
      setIsPlaying(false)
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    if (!audioCtxRef.current) return

    if (isMuted) {
      masterGainRef.current.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime)
      setIsMuted(false)
    } else {
      masterGainRef.current.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime)
      setIsMuted(true)
    }
  }

  // Auto-start music on first user interaction or when Gold Mode is clicked!
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (!autoPlayAttempted.current) {
        autoPlayAttempted.current = true
        startMusic()
      }
    }

    window.addEventListener('click', handleFirstUserInteraction, { once: true })
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction)
      window.removeEventListener('touchstart', handleFirstUserInteraction)
    }
  }, [])

  useEffect(() => {
    if (isSpidermanTheme && !isPlaying) {
      startMusic()
    }
  }, [isSpidermanTheme])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioCtxRef.current) audioCtxRef.current.close()
    }
  }, [])

  return (
    <motion.div
      className={`audio-player-widget ${isPlaying ? 'is-playing' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={togglePlay}
      title={isPlaying ? 'Pause Divine Chants' : 'Play Shri Ram Divine Ambient Chants'}
    >
      <div className="audio-player__disc">
        <Disc size={18} className={`disc-icon ${isPlaying ? 'is-spinning' : ''}`} />
      </div>

      <div className="audio-player__info">
        <span className="audio-player__title">{trackTitle}</span>
        <span className="audio-player__status">
          {isPlaying ? (isMuted ? 'Muted' : 'Playing Divine Chants') : 'Click to Play Divine Chants'}
        </span>
      </div>

      {/* Animated Equalizer Bars */}
      {isPlaying && !isMuted && (
        <div className="equalizer">
          <span className="eq-bar eq-bar--1" />
          <span className="eq-bar eq-bar--2" />
          <span className="eq-bar eq-bar--3" />
          <span className="eq-bar eq-bar--4" />
        </div>
      )}

      {/* Volume / Mute Button */}
      {isPlaying && (
        <button
          className="audio-player__mute-btn"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      )}
    </motion.div>
  )
}
