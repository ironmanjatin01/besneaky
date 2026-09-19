import { useState, useRef } from 'react'
import { Music, Play, Pause, SkipForward, Volume2, VolumeX, Radio } from 'lucide-react'
import './AudioPlayer.css'

const CAFE_TRACKS = [
  {
    title: 'Midnight Jazz Espresso',
    artist: 'Sneaky Coffeehouse Trio',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
  },
  {
    title: 'Rainy Barista Loft',
    artist: 'Tokyo Lo-Fi Beats',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-lofi-song-8444.mp3'
  },
  {
    title: 'Acoustic Morning Brew',
    artist: 'Sunlit Roastery',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=lofi-background-music-11235.mp3'
  }
]

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef(null)

  const currentTrack = CAFE_TRACKS[trackIndex]

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const nextTrack = () => {
    const nextIdx = (trackIndex + 1) % CAFE_TRACKS.length
    setTrackIndex(nextIdx)
    setIsPlaying(true)
    setTimeout(() => {
      audioRef.current?.play().catch(() => {})
    }, 100)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div className={`cafe-audio-player ${isExpanded ? 'is-expanded' : ''}`}>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop
        preload="auto"
      />

      {/* Floating Compact Bar */}
      <div className="audio-bar" onClick={() => setIsExpanded(!isExpanded)}>
        <div className={`vinyl-disc ${isPlaying ? 'is-spinning' : ''}`}>
          <Radio size={14} />
        </div>
        <div className="audio-info">
          <span className="audio-station-label">Sneaky Radio</span>
          <span className="audio-title">{currentTrack.title}</span>
        </div>
        <button
          className="audio-play-mini"
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      {/* Expanded Controls Modal/Card */}
      {isExpanded && (
        <div className="audio-expanded-card" onClick={(e) => e.stopPropagation()}>
          <div className="expanded-header">
            <span className="radio-badge">
              <Music size={12} /> Ambient Roastery Audio
            </span>
            <button className="close-expanded" onClick={() => setIsExpanded(false)}>
              ×
            </button>
          </div>

          <h4 className="expanded-title">{currentTrack.title}</h4>
          <span className="expanded-artist">{currentTrack.artist}</span>

          <div className="expanded-controls">
            <button className="exp-btn" onClick={toggleMute}>
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button className="exp-play-btn" onClick={togglePlay}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button className="exp-btn" onClick={nextTrack}>
              <SkipForward size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
