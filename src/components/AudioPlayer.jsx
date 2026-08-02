import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Disc } from 'lucide-react'
import './AudioPlayer.css'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [trackTitle] = useState('🎹 Soft Ambient Felt Piano')

  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const filterRef = useRef(null)
  const timerRef = useRef(null)

  // Soft & Subtle Ambient Piano Synthesizer
  const initSubtlePianoAudio = () => {
    if (audioCtxRef.current) return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    // Warm Lowpass Filter (filters out harsh high frequencies for felt piano warmth)
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(850, ctx.currentTime)
    lowpass.Q.setValueAtTime(1, ctx.currentTime)
    filterRef.current = lowpass

    // Master Gain set to ultra-subtle background volume (0.04)
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.04, ctx.currentTime)
    masterGain.connect(ctx.destination)
    lowpass.connect(masterGain)
    masterGainRef.current = masterGain

    // Soothing Felt Piano Ambient Chords (Dbmaj9 -> Bbm9 -> Gbmaj7 -> Ab6)
    const ambientChords = [
      [277.18, 349.23, 415.30, 523.25], // Dbmaj9
      [233.08, 277.18, 349.23, 415.30], // Bbm9
      [185.00, 233.08, 277.18, 349.23], // Gbmaj7
      [207.65, 261.63, 311.13, 369.99]  // Ab6
    ]

    const subtleArps = [523.25, 622.25, 698.46, 830.61]

    let step = 0

    // Synthesize soft felt-piano key with gentle attack & long sustain
    const playFeltKey = (freq, time, duration = 5.5, volume = 0.025) => {
      if (!ctx || ctx.state === 'closed') return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, time)

      // Soft felt attack (0.06s) and long exponential fade-out
      gain.gain.setValueAtTime(0.0001, time)
      gain.gain.linearRampToValueAtTime(volume, time + 0.06)
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)

      osc.connect(gain)
      gain.connect(lowpass)

      osc.start(time)
      osc.stop(time + duration)
    }

    const playAmbientRoutine = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return

      const now = ctx.currentTime
      const chord = ambientChords[step % ambientChords.length]

      // Play soft atmospheric chord notes staggered gently
      chord.forEach((freq, idx) => {
        playFeltKey(freq, now + idx * 0.15, 6.0, 0.02)
      })

      // Delicate background melody note
      if (step % 2 === 0) {
        const arpNote = subtleArps[step % subtleArps.length]
        playFeltKey(arpNote, now + 2.2, 4.5, 0.012)
      }

      step++
    }

    playAmbientRoutine()
    timerRef.current = setInterval(playAmbientRoutine, 6200)
  }

  const togglePlay = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        initSubtlePianoAudio()
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
      setIsPlaying(true)
      setIsMuted(false)
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime)
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
      masterGainRef.current.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime)
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
      title={isPlaying ? 'Pause Soft Piano' : 'Play Soft Ambient Felt Piano'}
    >
      <div className="audio-player__disc">
        <Disc size={18} className={`disc-icon ${isPlaying ? 'is-spinning' : ''}`} />
      </div>

      <div className="audio-player__info">
        <span className="audio-player__title">{trackTitle}</span>
        <span className="audio-player__status">
          {isPlaying ? (isMuted ? 'Muted' : 'Soft Ambience') : 'Click for Soft Ambience'}
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
