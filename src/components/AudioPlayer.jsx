import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Disc } from 'lucide-react'
import './AudioPlayer.css'

export default function AudioPlayer({ isSpidermanTheme }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [trackTitle] = useState('🕷️ Spider-Man Piano Theme')

  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const filterRef = useRef(null)
  const timerRef = useRef(null)
  const autoPlayAttempted = useRef(false)

  // Spider-Man Piano Theme Synthesizer
  const initSpidermanPianoAudio = () => {
    if (audioCtxRef.current) return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    // Warm Lowpass Filter for felt acoustic piano warmth
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(1050, ctx.currentTime)
    lowpass.Q.setValueAtTime(1.2, ctx.currentTime)
    filterRef.current = lowpass

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.05, ctx.currentTime)
    masterGain.connect(ctx.destination)
    lowpass.connect(masterGain)
    masterGainRef.current = masterGain

    // Spider-Man Theme Accompaniment Chords (Gm -> Cm -> Eb -> D7)
    const spidermanChords = [
      [196.00, 293.66, 392.00], // Gm (G3, D4, G4)
      [130.81, 261.63, 311.13], // Cm (C3, C4, Eb4)
      [155.56, 311.13, 392.00], // Eb (Eb3, Eb4, G4)
      [146.83, 293.66, 369.99]  // D7 (D3, D4, F#4)
    ]

    // Spider-Man Piano Theme Melody Sequences
    const melodyPhrases = [
      // Phrase 1 (Gm): G4 -> Bb4 -> C5 -> C5 -> C5 -> Bb4 -> G4
      [
        { freq: 392.00, delay: 0.0, dur: 0.6 },
        { freq: 466.16, delay: 0.35, dur: 0.6 },
        { freq: 523.25, delay: 0.7, dur: 0.9 },
        { freq: 523.25, delay: 1.1, dur: 0.6 },
        { freq: 523.25, delay: 1.45, dur: 0.6 },
        { freq: 466.16, delay: 1.8, dur: 0.6 },
        { freq: 392.00, delay: 2.15, dur: 1.2 }
      ],
      // Phrase 2 (Cm): F4 -> Ab4 -> Bb4 -> Bb4 -> Bb4 -> Ab4 -> F4
      [
        { freq: 349.23, delay: 0.0, dur: 0.6 },
        { freq: 415.30, delay: 0.35, dur: 0.6 },
        { freq: 466.16, delay: 0.7, dur: 0.9 },
        { freq: 466.16, delay: 1.1, dur: 0.6 },
        { freq: 466.16, delay: 1.45, dur: 0.6 },
        { freq: 415.30, delay: 1.8, dur: 0.6 },
        { freq: 349.23, delay: 2.15, dur: 1.2 }
      ],
      // Phrase 3 (Eb): Eb4 -> G4 -> Ab4 -> Ab4 -> Ab4 -> G4 -> Eb4
      [
        { freq: 311.13, delay: 0.0, dur: 0.6 },
        { freq: 392.00, delay: 0.35, dur: 0.6 },
        { freq: 415.30, delay: 0.7, dur: 0.9 },
        { freq: 415.30, delay: 1.1, dur: 0.6 },
        { freq: 415.30, delay: 1.45, dur: 0.6 },
        { freq: 392.00, delay: 1.8, dur: 0.6 },
        { freq: 311.13, delay: 2.15, dur: 1.2 }
      ],
      // Phrase 4 (D7): D4 -> F#4 -> A4 -> C5 -> D5 -> C5 -> A4
      [
        { freq: 293.66, delay: 0.0, dur: 0.6 },
        { freq: 369.99, delay: 0.35, dur: 0.6 },
        { freq: 440.00, delay: 0.7, dur: 0.9 },
        { freq: 523.25, delay: 1.1, dur: 0.6 },
        { freq: 587.33, delay: 1.45, dur: 0.6 },
        { freq: 523.25, delay: 1.8, dur: 0.6 },
        { freq: 440.00, delay: 2.15, dur: 1.2 }
      ]
    ]

    let step = 0

    // Synthesize warm acoustic piano key strike
    const playPianoKey = (freq, time, duration = 3.5, volume = 0.035) => {
      if (!ctx || ctx.state === 'closed') return

      const harmonics = [
        { mult: 1, gainRatio: 1.0 },
        { mult: 2, gainRatio: 0.3 },
        { mult: 3, gainRatio: 0.12 }
      ]

      harmonics.forEach(({ mult, gainRatio }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq * mult, time)

        const peakVol = volume * gainRatio
        gain.gain.setValueAtTime(0.0001, time)
        gain.gain.linearRampToValueAtTime(peakVol, time + 0.015)
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)

        osc.connect(gain)
        gain.connect(lowpass)

        osc.start(time)
        osc.stop(time + duration)
      })
    }

    const playSpidermanRoutine = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return

      const now = ctx.currentTime
      const chord = spidermanChords[step % spidermanChords.length]
      const phrase = melodyPhrases[step % melodyPhrases.length]

      // Play background piano chord
      chord.forEach((freq, idx) => {
        playPianoKey(freq, now + idx * 0.1, 4.2, 0.025)
      })

      // Play iconic Spider-Man piano melody
      phrase.forEach(({ freq, delay, dur }) => {
        playPianoKey(freq, now + delay, dur, 0.04)
      })

      step++
    }

    playSpidermanRoutine()
    timerRef.current = setInterval(playSpidermanRoutine, 3600)
  }

  const startMusic = () => {
    if (!audioCtxRef.current) {
      initSpidermanPianoAudio()
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    setIsPlaying(true)
    setIsMuted(false)
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime)
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
      masterGainRef.current.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime)
      setIsMuted(false)
    } else {
      masterGainRef.current.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime)
      setIsMuted(true)
    }
  }

  // Auto-start music on first user interaction or when Dark Mode / Spider-Verse is clicked!
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

  // Auto-play music when Spider-Verse theme is active
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
      title={isPlaying ? 'Pause Spider-Man Piano Theme' : 'Play Spider-Man Piano Theme'}
    >
      <div className="audio-player__disc">
        <Disc size={18} className={`disc-icon ${isPlaying ? 'is-spinning' : ''}`} />
      </div>

      <div className="audio-player__info">
        <span className="audio-player__title">{trackTitle}</span>
        <span className="audio-player__status">
          {isPlaying ? (isMuted ? 'Muted' : 'Playing Spider-Man Theme') : 'Click for Spider-Man Theme'}
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
