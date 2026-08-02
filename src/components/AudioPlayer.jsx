import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Disc } from 'lucide-react'
import './AudioPlayer.css'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [trackTitle] = useState('🎹 Ambient Piano Studio Beats')

  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const timerRef = useRef(null)

  // Piano-inspired Ambient Synthesizer
  const initPianoAudio = () => {
    if (audioCtxRef.current) return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime)
    masterGain.connect(ctx.destination)
    masterGainRef.current = masterGain

    // Warm Ambient Piano Chords (Dbmaj9 -> Bbm9 -> Gbmaj7 -> Ab6)
    const pianoChords = [
      [277.18, 349.23, 415.30, 523.25], // Dbmaj9 (Db, F, Ab, C)
      [233.08, 277.18, 349.23, 415.30], // Bbm9 (Bb, Db, F, Ab)
      [185.00, 233.08, 277.18, 349.23], // Gbmaj7 (Gb, Bb, Db, F)
      [207.65, 261.63, 311.13, 369.99]  // Ab6 (Ab, C, Eb, F)
    ]

    // Piano Arpeggio Notes
    const pianoArps = [523.25, 622.25, 698.46, 830.61, 1046.50]

    let step = 0

    // Synthesize realistic acoustic piano key press
    const playPianoKey = (freq, time, duration = 3.2, volume = 0.05) => {
      if (!ctx || ctx.state === 'closed') return

      // Fundamental tone + harmonics for realistic piano resonance
      const harmonics = [
        { mult: 1, gainRatio: 1.0 },
        { mult: 2, gainRatio: 0.35 },
        { mult: 3, gainRatio: 0.15 }
      ]

      harmonics.forEach(({ mult, gainRatio }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq * mult, time)

        // Piano Percussive Envelope: Fast hammer attack (0.012s), exponential decay
        const peakVol = volume * gainRatio
        gain.gain.setValueAtTime(0.0001, time)
        gain.gain.linearRampToValueAtTime(peakVol, time + 0.012)
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)

        osc.connect(gain)
        gain.connect(masterGain)

        osc.start(time)
        osc.stop(time + duration)
      })
    }

    const playPianoSequence = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return

      const now = ctx.currentTime
      const chord = pianoChords[step % pianoChords.length]

      // Play soft ambient piano chord
      chord.forEach((freq, idx) => {
        playPianoKey(freq, now + idx * 0.08, 3.5, 0.04)
      })

      // Gentle piano melody arpeggio notes
      const arpFreq = pianoArps[(step * 2) % pianoArps.length]
      playPianoKey(arpFreq, now + 1.2, 2.5, 0.025)

      const arpFreq2 = pianoArps[(step * 2 + 1) % pianoArps.length]
      playPianoKey(arpFreq2, now + 2.4, 2.2, 0.02)

      step++
    }

    playPianoSequence()
    timerRef.current = setInterval(playPianoSequence, 3800)
  }

  const togglePlay = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        initPianoAudio()
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
      setIsPlaying(true)
      setIsMuted(false)
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime)
      }
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
      title={isPlaying ? 'Pause Ambient Piano' : 'Play Ambient Piano Studio Beats'}
    >
      <div className="audio-player__disc">
        <Disc size={18} className={`disc-icon ${isPlaying ? 'is-spinning' : ''}`} />
      </div>

      <div className="audio-player__info">
        <span className="audio-player__title">{trackTitle}</span>
        <span className="audio-player__status">
          {isPlaying ? (isMuted ? 'Muted' : 'Playing Ambient Piano') : 'Click to Play Ambient Piano'}
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
