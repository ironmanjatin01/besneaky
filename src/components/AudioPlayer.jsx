import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Disc } from 'lucide-react'
import './AudioPlayer.css'

export default function AudioPlayer({ isSpidermanTheme }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [trackTitle] = useState('🌸 Ram Siya Ram, Siya Ram, Jai Jai Ram')

  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const filterRef = useRef(null)
  const timerRef = useRef(null)
  const autoPlayAttempted = useRef(false)

  // Divine Veena, Sitar & Flute Ramayan Synthesizer
  const initRamSiyaRamAudio = () => {
    if (audioCtxRef.current) return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    // Warm Lowpass Acoustic Filter
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(1350, ctx.currentTime)
    lowpass.Q.setValueAtTime(1.1, ctx.currentTime)
    filterRef.current = lowpass

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.14, ctx.currentTime)
    masterGain.connect(ctx.destination)
    lowpass.connect(masterGain)
    masterGainRef.current = masterGain

    // Harmony Drone Chords (D Major, Bm, G Major, A Major)
    const ramayanChords = [
      [293.66, 369.99, 440.00], // D Major (D4, F#4, A4)
      [246.94, 293.66, 369.99], // Bm (B3, D4, F#4)
      [196.00, 246.94, 293.66], // G Major (G3, B3, D4)
      [220.00, 277.18, 329.63]  // A Major (A3, C#4, E4)
    ]

    // "Ram Siya Ram, Siya Ram, Jai Jai Ram" Authentic Melodic Note Sequence
    const ramSiyaRamMelody = [
      // Phrase 1: "Ram Siya Ram..."
      { freq: 369.99, delay: 0.0, dur: 0.65 },  // Ram (F#4)
      { freq: 440.00, delay: 0.4, dur: 0.55 },  // Si- (A4)
      { freq: 493.88, delay: 0.75, dur: 0.65 }, // -ya (B4)
      { freq: 440.00, delay: 1.15, dur: 0.65 }, // Ram (A4)
      { freq: 369.99, delay: 1.55, dur: 0.85 }, // (F#4)

      // Phrase 2: "Siya Ram..."
      { freq: 293.66, delay: 2.1, dur: 0.55 },  // Si- (D4)
      { freq: 329.63, delay: 2.45, dur: 0.55 }, // -ya (E4)
      { freq: 369.99, delay: 2.85, dur: 0.95 }, // Ram (F#4)

      // Phrase 3: "Jai Jai Ram..."
      { freq: 440.00, delay: 3.5, dur: 0.55 },  // Jai (A4)
      { freq: 369.99, delay: 3.9, dur: 0.55 },  // Jai (F#4)
      { freq: 293.66, delay: 4.3, dur: 1.4 }   // Ram (D4)
    ]

    let step = 0

    // Synthesize Veena plucked acoustic string with overtones
    const playVeenaString = (freq, time, duration = 3.5, volume = 0.09) => {
      if (!ctx || ctx.state === 'closed') return

      const harmonics = [
        { mult: 1, gainRatio: 1.0 },
        { mult: 2, gainRatio: 0.42 },
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

    const playRamSiyaRamRoutine = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return

      const now = ctx.currentTime
      const chord = ramayanChords[step % ramayanChords.length]

      // Play ambient background Veena drone pad
      chord.forEach((freq, idx) => {
        playVeenaString(freq, now + idx * 0.1, 5.5, 0.05)
      })

      // Play "Ram Siya Ram, Siya Ram, Jai Jai Ram" lead melody
      ramSiyaRamMelody.forEach(({ freq, delay, dur }) => {
        playVeenaString(freq, now + delay, dur, 0.095)
      })

      step++
    }

    playRamSiyaRamRoutine()
    timerRef.current = setInterval(playRamSiyaRamRoutine, 5600)
  }

  const startMusic = () => {
    if (!audioCtxRef.current) {
      initRamSiyaRamAudio()
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    setIsPlaying(true)
    setIsMuted(false)
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(0.14, audioCtxRef.current.currentTime)
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
      masterGainRef.current.gain.setValueAtTime(0.14, audioCtxRef.current.currentTime)
      setIsMuted(false)
    } else {
      masterGainRef.current.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime)
      setIsMuted(true)
    }
  }

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
      title={isPlaying ? 'Pause Ram Siya Ram Chants' : 'Play Ram Siya Ram Divine Chants'}
    >
      <div className="audio-player__disc">
        <Disc size={18} className={`disc-icon ${isPlaying ? 'is-spinning' : ''}`} />
      </div>

      <div className="audio-player__info">
        <span className="audio-player__title">{trackTitle}</span>
        <span className="audio-player__status">
          {isPlaying ? (isMuted ? 'Muted' : 'Playing Ram Siya Ram Chants') : 'Click to Play Chants'}
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
