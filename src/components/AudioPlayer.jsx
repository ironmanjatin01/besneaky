import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Disc } from 'lucide-react'
import './AudioPlayer.css'

export default function AudioPlayer({ isSpidermanTheme }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [trackTitle] = useState('🕷️ Spider-Man: No Way Home (Piano Theme)')

  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const filterRef = useRef(null)
  const timerRef = useRef(null)
  const autoPlayAttempted = useRef(false)

  // Michael Giacchino - Spider-Man: No Way Home Piano Theme Synthesizer
  const initNoWayHomePianoAudio = () => {
    if (audioCtxRef.current) return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    // Warm Lowpass Filter for cinematic felt piano timbre
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(1500, ctx.currentTime)
    lowpass.Q.setValueAtTime(1.1, ctx.currentTime)
    filterRef.current = lowpass

    // Master Gain (rich cinematic volume 0.15)
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime)
    masterGain.connect(ctx.destination)
    lowpass.connect(masterGain)
    masterGainRef.current = masterGain

    // No Way Home Chords (Am -> F -> Dm -> E7)
    const nwhChords = [
      [220.00, 329.63, 440.00, 523.25], // Am (A3, E4, A4, C5)
      [174.61, 261.63, 349.23, 440.00], // F (F3, C4, F4, A4)
      [146.83, 293.66, 349.23, 440.00], // Dm (D3, D4, F4, A4)
      [164.81, 246.94, 415.30, 493.88]  // E7 (E3, B3, G#4, B4)
    ]

    // Michael Giacchino's iconic No Way Home Peter Parker Melody Motif
    const nwhPhrases = [
      // Phrase 1 (Am): A4 -> C5 -> E5 -> D5 -> C5 -> B4 -> A4 -> G#4 -> A4
      [
        { freq: 440.00, delay: 0.0, dur: 0.5 },
        { freq: 523.25, delay: 0.3, dur: 0.5 },
        { freq: 659.25, delay: 0.6, dur: 0.8 },
        { freq: 587.33, delay: 1.05, dur: 0.5 },
        { freq: 523.25, delay: 1.35, dur: 0.5 },
        { freq: 493.88, delay: 1.65, dur: 0.5 },
        { freq: 440.00, delay: 1.95, dur: 0.5 },
        { freq: 415.30, delay: 2.25, dur: 0.5 },
        { freq: 440.00, delay: 2.55, dur: 1.1 }
      ],
      // Phrase 2 (F): C5 -> E5 -> G5 -> F#5 -> F5 -> E5 -> D5 -> C5 -> B4
      [
        { freq: 523.25, delay: 0.0, dur: 0.5 },
        { freq: 659.25, delay: 0.3, dur: 0.5 },
        { freq: 783.99, delay: 0.6, dur: 0.8 },
        { freq: 739.99, delay: 1.05, dur: 0.5 },
        { freq: 698.46, delay: 1.35, dur: 0.5 },
        { freq: 659.25, delay: 1.65, dur: 0.5 },
        { freq: 587.33, delay: 1.95, dur: 0.5 },
        { freq: 523.25, delay: 2.25, dur: 0.5 },
        { freq: 493.88, delay: 2.55, dur: 1.1 }
      ],
      // Phrase 3 (Dm): A4 -> D5 -> F5 -> E5 -> C5 -> B4 -> A4 -> G#4 -> A4
      [
        { freq: 440.00, delay: 0.0, dur: 0.5 },
        { freq: 587.33, delay: 0.3, dur: 0.5 },
        { freq: 698.46, delay: 0.6, dur: 0.8 },
        { freq: 659.25, delay: 1.05, dur: 0.5 },
        { freq: 523.25, delay: 1.35, dur: 0.5 },
        { freq: 493.88, delay: 1.65, dur: 0.5 },
        { freq: 440.00, delay: 1.95, dur: 0.5 },
        { freq: 415.30, delay: 2.25, dur: 0.5 },
        { freq: 440.00, delay: 2.55, dur: 1.1 }
      ],
      // Phrase 4 (E7): E4 -> G#4 -> B4 -> E5 -> D5 -> C5 -> B4 -> A4
      [
        { freq: 329.63, delay: 0.0, dur: 0.5 },
        { freq: 415.30, delay: 0.3, dur: 0.5 },
        { freq: 493.88, delay: 0.6, dur: 0.8 },
        { freq: 659.25, delay: 1.05, dur: 0.5 },
        { freq: 587.33, delay: 1.35, dur: 0.5 },
        { freq: 523.25, delay: 1.65, dur: 0.5 },
        { freq: 493.88, delay: 1.95, dur: 0.5 },
        { freq: 440.00, delay: 2.25, dur: 1.2 }
      ]
    ]

    let step = 0

    // Synthesize cinematic piano strike with overtones
    const playPianoKey = (freq, time, duration = 3.6, volume = 0.1) => {
      if (!ctx || ctx.state === 'closed') return

      const harmonics = [
        { mult: 1, gainRatio: 1.0 },
        { mult: 2, gainRatio: 0.35 },
        { mult: 3, gainRatio: 0.16 }
      ]

      harmonics.forEach(({ mult, gainRatio }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq * mult, time)

        const peakVol = volume * gainRatio
        gain.gain.setValueAtTime(0.0001, time)
        gain.gain.linearRampToValueAtTime(peakVol, time + 0.018)
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)

        osc.connect(gain)
        gain.connect(lowpass)

        osc.start(time)
        osc.stop(time + duration)
      })
    }

    const playNoWayHomeRoutine = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return

      const now = ctx.currentTime
      const chord = nwhChords[step % nwhChords.length]
      const phrase = nwhPhrases[step % nwhPhrases.length]

      // Play rich cinematic piano chord
      chord.forEach((freq, idx) => {
        playPianoKey(freq, now + idx * 0.12, 4.4, 0.065)
      })

      // Play Michael Giacchino's No Way Home piano melody
      phrase.forEach(({ freq, delay, dur }) => {
        playPianoKey(freq, now + delay, dur, 0.1)
      })

      step++
    }

    playNoWayHomeRoutine()
    timerRef.current = setInterval(playNoWayHomeRoutine, 3800)
  }

  const startMusic = () => {
    if (!audioCtxRef.current) {
      initNoWayHomePianoAudio()
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    setIsPlaying(true)
    setIsMuted(false)
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime)
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
      masterGainRef.current.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime)
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
      title={isPlaying ? 'Pause No Way Home Piano Theme' : 'Play Spider-Man: No Way Home Piano Theme'}
    >
      <div className="audio-player__disc">
        <Disc size={18} className={`disc-icon ${isPlaying ? 'is-spinning' : ''}`} />
      </div>

      <div className="audio-player__info">
        <span className="audio-player__title">{trackTitle}</span>
        <span className="audio-player__status">
          {isPlaying ? (isMuted ? 'Muted' : 'Playing No Way Home Theme') : 'Click for No Way Home Theme'}
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
