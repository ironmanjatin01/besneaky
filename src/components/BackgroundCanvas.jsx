import { useEffect, useRef } from 'react'
import './BackgroundCanvas.css'

export default function BackgroundCanvas({ isSpidermanTheme }) {
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

    // Interactive Atomic Particle System
    const particleCount = Math.min(Math.floor(width / 16), 85)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1.2,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseFactor: Math.random() * Math.PI
    }))

    // Ambient floating roasted glowing orbs
    const orbs = [
      { x: width * 0.15, y: height * 0.25, radius: 340, color: 'rgba(217, 119, 6, 0.12)', vx: 0.2, vy: 0.15 },
      { x: width * 0.85, y: height * 0.55, radius: 380, color: 'rgba(245, 158, 11, 0.10)', vx: -0.15, vy: 0.2 },
      { x: width * 0.5, y: height * 0.85, radius: 300, color: 'rgba(251, 191, 36, 0.08)', vx: 0.18, vy: -0.18 }
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
        gradient.addColorStop(1, 'rgba(12, 10, 9, 0)')

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
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.x -= (dx / dist) * force * 1.6
          p.y -= (dy / dist) * force * 1.6
        }

        const currentOpacity = p.opacity + Math.sin(p.pulseFactor) * 0.15

        // Draw Atom Node
        ctx.fillStyle = i % 2 === 0
          ? `rgba(245, 158, 11, ${Math.max(0.2, currentOpacity)})`
          : `rgba(217, 119, 6, ${Math.max(0.2, currentOpacity)})`

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Connect cursor to nearby atoms with golden web lines
        if (dist < 170) {
          ctx.strokeStyle = `rgba(245, 158, 11, ${0.45 * (1 - dist / 170)})`
          ctx.lineWidth = 1.1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.stroke()
        }

        // Connect nearby atoms to each other with delicate atomic threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdx = p.x - p2.x
          const pdy = p.y - p2.y
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy)
          if (pdist < 150) {
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.28 * (1 - pdist / 150)})`
            ctx.lineWidth = 0.85
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
  }, [isSpidermanTheme])

  return <canvas ref={canvasRef} className="background-canvas" />
}
