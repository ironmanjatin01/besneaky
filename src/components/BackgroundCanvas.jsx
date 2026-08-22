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

    // Saffron & Divine Gold Celestial Particle System
    const particleCount = Math.min(Math.floor(width / 18), 75)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3.2 + 1.2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.45 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseFactor: Math.random() * Math.PI,
    }))

    // Ambient floating glowing orbs
    const orbs = isSpidermanTheme
      ? [
          { x: width * 0.2, y: height * 0.3, radius: 320, color: 'rgba(245, 158, 11, 0.22)', vx: 0.25, vy: 0.18 },
          { x: width * 0.8, y: height * 0.6, radius: 360, color: 'rgba(217, 119, 6, 0.22)', vx: -0.18, vy: 0.25 },
          { x: width * 0.5, y: height * 0.8, radius: 280, color: 'rgba(251, 191, 36, 0.18)', vx: 0.2, vy: -0.2 },
        ]
      : [
          { x: width * 0.2, y: height * 0.3, radius: 300, color: 'rgba(245, 158, 11, 0.16)', vx: 0.2, vy: 0.15 },
          { x: width * 0.8, y: height * 0.6, radius: 340, color: 'rgba(217, 119, 6, 0.14)', vx: -0.15, vy: 0.2 },
          { x: width * 0.5, y: height * 0.8, radius: 280, color: 'rgba(254, 243, 199, 0.25)', vx: 0.18, vy: -0.18 },
        ]

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.06
      mouseY += (targetMouseY - mouseY) * 0.06

      ctx.clearRect(0, 0, width, height)

      // Render glowing ambient orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx
        orb.y += orb.vy

        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1

        const dx = mouseX - orb.x
        const dy = mouseY - orb.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const shiftX = (dx / (dist || 1)) * 35
        const shiftY = (dy / (dist || 1)) * 35

        const gradient = ctx.createRadialGradient(
          orb.x + shiftX,
          orb.y + shiftY,
          0,
          orb.x + shiftX,
          orb.y + shiftY,
          orb.radius
        )
        gradient.addColorStop(0, orb.color)
        gradient.addColorStop(1, isSpidermanTheme ? 'rgba(16, 15, 20, 0)' : 'rgba(254, 252, 248, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x + shiftX, orb.y + shiftY, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Render floating golden celestial particles
      particles.forEach((p, i) => {
        p.x += p.speedX
        p.y += p.speedY
        p.pulseFactor += p.pulseSpeed

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) {
          const force = (140 - dist) / 140
          p.x -= (dx / dist) * force * 1.8
          p.y -= (dy / dist) * force * 1.8
        }

        const currentOpacity = p.opacity + Math.sin(p.pulseFactor) * 0.12

        ctx.fillStyle = i % 2 === 0
          ? `rgba(245, 158, 11, ${Math.max(0.2, currentOpacity)})`
          : `rgba(217, 119, 6, ${Math.max(0.2, currentOpacity)})`

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Connect cursor to nearby celestial stars
        if (dist < 160) {
          ctx.strokeStyle = `rgba(245, 158, 11, ${0.4 * (1 - dist / 160)})`
          ctx.lineWidth = 1.1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.stroke()
        }

        // Connect nearby celestial stars with golden threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdx = p.x - p2.x
          const pdy = p.y - p2.y
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy)
          if (pdist < 160) {
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.3 * (1 - pdist / 160)})`
            ctx.lineWidth = 0.9
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
