import { useEffect, useRef } from 'react'
import './BackgroundCanvas.css'

export default function BackgroundCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = mouseX
    let targetMouseY = mouseY

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Classic London Navy & Gold Atomic Particle System
    const particleCount = Math.min(Math.floor(width / 14), 95)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3.2 + 1.2,
      speedX: (Math.random() - 0.5) * 0.7,
      speedY: (Math.random() - 0.5) * 0.7,
      opacity: Math.random() * 0.6 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseFactor: Math.random() * Math.PI,
      // Colors: Vintage Beige (#E6D5B8), London Brass (#E5C378), Roasted Mahogany (#C68B59)
      colorType: Math.floor(Math.random() * 3)
    }))

    // Ambient floating dark blue & roasted amber orbs
    const orbs = [
      { x: width * 0.15, y: height * 0.25, radius: 400, color: 'rgba(30, 41, 59, 0.4)', vx: 0.2, vy: 0.15 },
      { x: width * 0.85, y: height * 0.55, radius: 450, color: 'rgba(198, 139, 89, 0.15)', vx: -0.15, vy: 0.2 },
      { x: width * 0.5, y: height * 0.85, radius: 360, color: 'rgba(229, 195, 120, 0.12)', vx: 0.18, vy: -0.18 }
    ]

    const render = () => {
      // Smooth mouse follow interpolation
      mouseX += (targetMouseX - mouseX) * 0.08
      mouseY += (targetMouseY - mouseY) * 0.08

      ctx.clearRect(0, 0, width, height)

      // Render glowing ambient background orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx
        orb.y += orb.vy

        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1

        const dx = mouseX - orb.x
        const dy = mouseY - orb.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const shiftX = (dx / (dist || 1)) * 30
        const shiftY = (dy / (dist || 1)) * 30

        const gradient = ctx.createRadialGradient(
          orb.x + shiftX,
          orb.y + shiftY,
          0,
          orb.x + shiftX,
          orb.y + shiftY,
          orb.radius
        )
        gradient.addColorStop(0, orb.color)
        gradient.addColorStop(1, 'rgba(11, 19, 37, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x + shiftX, orb.y + shiftY, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Render atomic particles & constellation connections
      particles.forEach((p, i) => {
        p.x += p.speedX
        p.y += p.speedY
        p.pulseFactor += p.pulseSpeed

        // Wrap around boundaries
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Mouse repelling physics
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 160) {
          const force = (160 - dist) / 160
          p.x -= (dx / dist) * force * 1.8
          p.y -= (dy / dist) * force * 1.8
        }

        const currentOpacity = p.opacity + Math.sin(p.pulseFactor) * 0.25

        // Particle Colors (Classic Beige, Brass, Roasted Brown)
        let particleColor = `rgba(230, 213, 184, ${Math.max(0.3, currentOpacity)})`
        if (p.colorType === 1) {
          particleColor = `rgba(229, 195, 120, ${Math.max(0.3, currentOpacity)})`
        } else if (p.colorType === 2) {
          particleColor = `rgba(198, 139, 89, ${Math.max(0.3, currentOpacity)})`
        }

        // Draw Glowing Atom Node
        ctx.shadowBlur = 12
        ctx.shadowColor = 'rgba(229, 195, 120, 0.6)'
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0 // reset shadow for performance

        // Connect cursor to nearby atoms with bright constellation web lines
        if (dist < 180) {
          ctx.strokeStyle = `rgba(229, 195, 120, ${0.55 * (1 - dist / 180)})`
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.stroke()
        }

        // Connect nearby atoms to each other with atomic threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdx = p.x - p2.x
          const pdy = p.y - p2.y
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy)
          if (pdist < 155) {
            ctx.strokeStyle = `rgba(230, 213, 184, ${0.35 * (1 - pdist / 155)})`
            ctx.lineWidth = 0.95
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="background-canvas" />
}
