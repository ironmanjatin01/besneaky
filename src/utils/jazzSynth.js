// Web Audio API Procedural Jazz Engine
// Generates soft, relaxing jazz chords, walking bass, mellow melodies, and subtle brush rhythms.

function noteToFreq(note) {
  const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
  const regex = /^([A-G][b#]?)(-?\d+)$/
  const match = note.match(regex)
  if (!match) return 440
  let name = match[1]
  if (name === 'Db') name = 'C#'
  if (name === 'D#') name = 'Eb'
  if (name === 'Gb') name = 'F#'
  if (name === 'G#') name = 'Ab'
  if (name === 'A#') name = 'Bb'
  const octave = parseInt(match[2], 10)
  const keyIndex = notes.indexOf(name)
  const midi = (octave + 1) * 12 + keyIndex
  return 440 * Math.pow(2, (midi - 69) / 12)
}

// Preset chord progressions with bass roots and jazz scales for improvising soft tunes
export const JAZZ_PRESETS = [
  {
    id: 'lounge',
    name: 'Midnight Coffee Lounge',
    description: 'Smooth ii-V-I Rhodes chords with warm upright bass',
    bpm: 72,
    filterFreq: 900,
    chords: [
      { name: 'Cmaj9', notes: ['C3', 'E3', 'G3', 'B3', 'D4'], bass: ['C2', 'E2', 'G2', 'B2'] },
      { name: 'Am9', notes: ['A2', 'C3', 'E3', 'G3', 'B3'], bass: ['A1', 'C2', 'E2', 'G2'] },
      { name: 'Dm9', notes: ['D3', 'F3', 'A3', 'C4', 'E4'], bass: ['D2', 'F2', 'A2', 'C3'] },
      { name: 'G13', notes: ['G2', 'B2', 'F3', 'A3', 'E4'], bass: ['G1', 'B1', 'D2', 'F2'] }
    ],
    scale: ['C4', 'D4', 'E4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5']
  },
  {
    id: 'bossa',
    name: 'Bossa Nova Breeze',
    description: 'Mellow latin jazz with gentle acoustic plucks',
    bpm: 80,
    filterFreq: 1100,
    chords: [
      { name: 'Fmaj9', notes: ['F3', 'A3', 'C4', 'E4', 'G4'], bass: ['F2', 'A2', 'C3', 'E3'] },
      { name: 'Dm7', notes: ['D3', 'F3', 'A3', 'C4'], bass: ['D2', 'F2', 'A2', 'C3'] },
      { name: 'Gm9', notes: ['G3', 'Bb3', 'D4', 'F4', 'A4'], bass: ['G2', 'Bb2', 'D3', 'F3'] },
      { name: 'C9', notes: ['C3', 'E3', 'Bb3', 'D4'], bass: ['C2', 'E2', 'G2', 'Bb2'] }
    ],
    scale: ['F4', 'G4', 'A4', 'C5', 'D5', 'F5', 'G5']
  },
  {
    id: 'velvet',
    name: 'Rainy Day Velvet',
    description: 'Ultra-soft vintage piano with low warm tones',
    bpm: 64,
    filterFreq: 750,
    chords: [
      { name: 'Ebmaj9', notes: ['Eb3', 'G3', 'Bb3', 'D4', 'F4'], bass: ['Eb2', 'G2', 'Bb2', 'D3'] },
      { name: 'Cm9', notes: ['C3', 'Eb3', 'G3', 'Bb3', 'D4'], bass: ['C2', 'Eb2', 'G2', 'Bb2'] },
      { name: 'Fm9', notes: ['F3', 'Ab3', 'C4', 'Eb4', 'G4'], bass: ['F2', 'Ab2', 'C3', 'Eb3'] },
      { name: 'Bb13', notes: ['Bb2', 'D3', 'Ab3', 'C4', 'G4'], bass: ['Bb1', 'D2', 'F2', 'Ab2'] }
    ],
    scale: ['Eb4', 'F4', 'G4', 'Bb4', 'C5', 'Eb5']
  }
]

class JazzSynthEngine {
  constructor() {
    this.ctx = null
    this.masterGain = null
    this.analyser = null
    this.isPlaying = false
    this.volume = 0.35 // Normal, soft default volume
    this.currentPresetIndex = 0
    this.timerId = null
    this.step = 0
    this.subStep = 0
    this.listeners = new Set()
  }

  init() {
    if (this.ctx) return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    this.ctx = new AudioContext()

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime)

    this.analyser = this.ctx.createAnalyser()
    this.analyser.fftSize = 64

    this.masterGain.connect(this.analyser)
    this.analyser.connect(this.ctx.destination)
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val))
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05)
    }
    this.notify()
  }

  getVolume() {
    return this.volume
  }

  setPreset(index) {
    if (index >= 0 && index < JAZZ_PRESETS.length) {
      this.currentPresetIndex = index
      this.notify()
    }
  }

  getPreset() {
    return JAZZ_PRESETS[this.currentPresetIndex]
  }

  async start() {
    this.init()
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }
    if (this.isPlaying) return
    this.isPlaying = true
    this.step = 0
    this.subStep = 0
    this.scheduleNextBeat()
    this.notify()
  }

  stop() {
    if (!this.isPlaying) return
    this.isPlaying = false
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }
    this.notify()
  }

  toggle() {
    if (this.isPlaying) {
      this.stop()
    } else {
      this.start()
    }
  }

  scheduleNextBeat() {
    if (!this.isPlaying) return

    const preset = this.getPreset()
    const secondsPerBeat = 60 / preset.bpm
    const quarterStep = secondsPerBeat / 2 // 8th note resolution

    this.playBeatStep(preset)

    this.subStep++
    if (this.subStep >= 8) { // 4 beats per measure (8 eighth-notes)
      this.subStep = 0
      this.step = (this.step + 1) % preset.chords.length
    }

    // Swing rhythm calculation
    let delay = quarterStep * 1000
    if (this.subStep % 2 === 1) {
      delay *= 0.85 // Swing feel
    } else {
      delay *= 1.15
    }

    this.timerId = setTimeout(() => {
      this.scheduleNextBeat()
    }, delay)
  }

  playBeatStep(preset) {
    if (!this.ctx || !this.isPlaying) return
    const now = this.ctx.currentTime
    const chordObj = preset.chords[this.step]

    // 1. Play Soft Rhodes Jazz Chord on beat 1 and syncopated beat 2.5
    if (this.subStep === 0 || this.subStep === 3) {
      this.playRhodesChord(chordObj.notes, preset.filterFreq, now)
    }

    // 2. Play Walking Upright Bass note on beats (0, 2, 4, 6 subSteps)
    if (this.subStep % 2 === 0) {
      const bassBeatIndex = Math.floor(this.subStep / 2)
      const bassNote = chordObj.bass[bassBeatIndex % chordObj.bass.length]
      this.playUprightBass(bassNote, now)
    }

    // 3. Play Soft Brush Snare & Ride Cymbal
    if (this.subStep === 2 || this.subStep === 6) {
      this.playSoftBrush(now, 0.08) // Snare tap on 2 and 4
    } else if (this.subStep % 2 === 1) {
      this.playRideCymbal(now, 0.03) // Soft ride swing
    }

    // 4. Play Soft Jazz Saxophone / Melody note occasionally (soft, pleasant fill)
    if (Math.random() < 0.45 && (this.subStep === 1 || this.subStep === 5 || this.subStep === 7)) {
      const randomNote = preset.scale[Math.floor(Math.random() * preset.scale.length)]
      this.playSoftMelody(randomNote, now)
    }
  }

  playRhodesChord(notes, filterCutoff, startTime) {
    notes.forEach((noteStr, idx) => {
      const freq = noteToFreq(noteStr)

      // Dual oscillator for rich, warm electric piano tone
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc1.type = 'sine'
      osc2.type = 'triangle'
      osc1.frequency.setValueAtTime(freq, startTime)
      osc2.frequency.setValueAtTime(freq * 1.0015, startTime) // Micro detune for warmth

      // Warm low-pass filter
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(filterCutoff || 850, startTime)

      // Soft envelope (gentle attack, slow decay)
      const noteGain = 0.12 / Math.sqrt(notes.length)
      gain.gain.setValueAtTime(0.001, startTime)
      gain.gain.exponentialRampToValueAtTime(noteGain, startTime + 0.08 + idx * 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.2)

      osc1.connect(filter)
      osc2.connect(filter)
      filter.connect(gain)
      gain.connect(this.masterGain)

      osc1.start(startTime)
      osc2.start(startTime)
      osc1.stop(startTime + 2.3)
      osc2.stop(startTime + 2.3)
    })
  }

  playUprightBass(noteStr, startTime) {
    const freq = noteToFreq(noteStr)
    const osc = this.ctx.createOscillator()
    const subOsc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()

    osc.type = 'triangle'
    subOsc.type = 'sine'

    osc.frequency.setValueAtTime(freq, startTime)
    subOsc.frequency.setValueAtTime(freq, startTime)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(280, startTime)
    filter.Q.setValueAtTime(1.5, startTime)

    // Pluck envelope
    gain.gain.setValueAtTime(0.001, startTime)
    gain.gain.linearRampToValueAtTime(0.28, startTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.7)

    osc.connect(filter)
    subOsc.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    osc.start(startTime)
    subOsc.start(startTime)
    osc.stop(startTime + 0.75)
    subOsc.stop(startTime + 0.75)
  }

  playSoftBrush(startTime, intensity = 0.08) {
    const bufferSize = this.ctx.sampleRate * 0.12
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(3200, startTime)
    filter.Q.setValueAtTime(0.8, startTime)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(intensity, startTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.11)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    noise.start(startTime)
    noise.stop(startTime + 0.12)
  }

  playRideCymbal(startTime, intensity = 0.03) {
    const bufferSize = this.ctx.sampleRate * 0.18
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.setValueAtTime(6500, startTime)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(intensity, startTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.16)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    noise.start(startTime)
    noise.stop(startTime + 0.18)
  }

  playSoftMelody(noteStr, startTime) {
    const freq = noteToFreq(noteStr)
    const osc = this.ctx.createOscillator()
    const vibrato = this.ctx.createOscillator()
    const vibratoGain = this.ctx.createGain()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()

    osc.type = 'sine'

    // Vibrato for mellow solo instrument feel
    vibrato.frequency.setValueAtTime(5, startTime) // 5 Hz vibrato
    vibratoGain.gain.setValueAtTime(freq * 0.012, startTime) // subtle pitch modulation
    vibrato.connect(osc.frequency)

    osc.frequency.setValueAtTime(freq, startTime)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1200, startTime)

    gain.gain.setValueAtTime(0.001, startTime)
    gain.gain.exponentialRampToValueAtTime(0.07, startTime + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.1)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    vibrato.start(startTime)
    osc.start(startTime)
    vibrato.stop(startTime + 1.2)
    osc.stop(startTime + 1.2)
  }

  getFrequencyData(array) {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(array)
    } else {
      array.fill(0)
    }
  }

  subscribe(fn) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.getState()))
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      volume: this.volume,
      preset: this.getPreset(),
      presetIndex: this.currentPresetIndex
    }
  }
}

export const jazzSynth = new JazzSynthEngine()
