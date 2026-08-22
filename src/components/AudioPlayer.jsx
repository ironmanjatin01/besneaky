import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Sparkles, ChevronUp, ChevronDown, ExternalLink, Music } from 'lucide-react'
import './AudioPlayer.css'

const youtubeTracks = [
  {
    id: 'B42mS6tD56s',
    title: 'Ram Siya Ram',
    subtitle: 'Sachet-Parampara (Adipurush)',
    thumbnail: 'https://img.youtube.com/vi/B42mS6tD56s/hqdefault.jpg'
  },
  {
    id: 'lP8c-uF_2uM',
    title: 'Mangal Bhavan Amangal Hari',
    subtitle: 'Ramanand Sagar Ramayan Bhajan',
    thumbnail: 'https://img.youtube.com/vi/lP8c-uF_2uM/hqdefault.jpg'
  },
  {
    id: 'AETFvQonfV8',
    title: 'Shri Hanuman Chalisa',
    subtitle: 'Hariharan & Gulshan Kumar',
    thumbnail: 'https://img.youtube.com/vi/AETFvQonfV8/hqdefault.jpg'
  },
  {
    id: 'b4u38pZfVn8',
    title: 'Shri Ram Chandra Kripalu Bhajman',
    subtitle: 'Traditional Divine Stuti',
    thumbnail: 'https://img.youtube.com/vi/b4u38pZfVn8/hqdefault.jpg'
  }
]

export default function AudioPlayer({ isSpidermanTheme }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTrackIndex, setActiveTrackIndex] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const activeTrack = youtubeTracks[activeTrackIndex]
  const iframeRef = useRef(null)

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const selectTrack = (index) => {
    setActiveTrackIndex(index)
    setIsPlaying(true)
    setShowMenu(false)
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    setIsMuted((prev) => !prev)
  }

  // Construct YouTube Embed Stream URL with autoplay parameter
  const embedUrl = `https://www.youtube.com/embed/${activeTrack.id}?enablejsapi=1&autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${activeTrack.id}`

  useEffect(() => {
    // Enable play on theme click if user requested
    if (isSpidermanTheme && !isPlaying) {
      setIsPlaying(true)
    }
  }, [isSpidermanTheme])

  return (
    <div className="audio-player-container">
      {/* Hidden YouTube Stream iFrame */}
      <div className="youtube-iframe-hidden">
        <iframe
          ref={iframeRef}
          key={`${activeTrack.id}-${isPlaying}-${isMuted}`}
          width="200"
          height="200"
          src={embedUrl}
          title={activeTrack.title}
          allow="autoplay"
        />
      </div>

      {/* YouTube Track Selection Popup Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="audio-player__mantra-menu youtube-menu"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="menu-header">
              <Music size={14} className="youtube-red-icon" />
              <span>Direct YouTube Ramayan Songs</span>
            </div>
            {youtubeTracks.map((track, idx) => (
              <button
                key={track.id}
                className={`menu-item youtube-item ${idx === activeTrackIndex ? 'is-active' : ''}`}
                onClick={() => selectTrack(idx)}
              >
                <img src={track.thumbnail} alt={track.title} className="yt-thumb" />
                <div className="menu-item-text">
                  <span className="m-title">{track.title}</span>
                  <span className="m-raga">{track.subtitle}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Renewed Direct YouTube Audio Widget */}
      <div className={`audio-player-bar youtube-player-bar ${isPlaying ? 'is-active' : ''}`}>
        {/* Track Thumbnail & Play Button */}
        <div className="yt-player__left">
          <button
            className="audio-player__play-btn yt-play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="play-icon-offset" />}
          </button>
          <img src={activeTrack.thumbnail} alt={activeTrack.title} className="yt-bar-thumb" />
        </div>

        {/* Track Details & Menu Trigger */}
        <div className="audio-player__content" onClick={() => setShowMenu(!showMenu)}>
          <div className="track-title-wrap">
            <span className="track-title">{activeTrack.title}</span>
            <span className="track-raga">{activeTrack.subtitle}</span>
          </div>
          {showMenu ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
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

        {/* Mute & YouTube External Link */}
        <div className="audio-player__vol-wrap">
          <button className="audio-player__mute-btn" onClick={toggleMute} aria-label="Mute">
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <a
            href={`https://www.youtube.com/watch?v=${activeTrack.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="yt-external-btn"
            title="Watch on YouTube"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
