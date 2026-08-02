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

    // Particle system
    const particleCount = Math.min(Math.floor(width / 35), 50)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.35 + 0.1,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseFactor: Math.random() * Math.PI,
    }))

    // Ambient floating glowing orbs
    const orbs = isSpidermanTheme
      ? [
          { x: width * 0.2, y: height * 0.3, radius: 300, color: 'rgba(230, 36, 41, 0.18)', vx: 0.2, vy: 0.15 },
          { x: width * 0.8, y: height * 0.6, radius: 340, color: 'rgba(0, 85, 165, 0.18)', vx: -0.15, vy: 0.2 },
          { x: width * 0.5, y: height * 0.8, radius: 260, color: 'rgba(230, 36, 41, 0.15)', vx: 0.18, vy: -0.18 },
        ]
      : [
          { x: width * 0.2, y: height * 0.3, radius: 280, color: 'rgba(168, 181, 160, 0.12)', vx: 0.2, vy: 0.15 },
          { x: width * 0.8, y: height * 0.6, radius: 320, color: 'rgba(196, 169, 154, 0.12)', vx: -0.15, vy: 0.2 },
          { x: width * 0.5, y: height * 0.8, radius: 250, color: 'rgba(154, 168, 181, 0.10)', vx: 0.18, vy: -0.18 },
        ]

    const render = () => {
      // Smooth lerp mouse position
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

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
        gradient.addColorStop(1, isSpidermanTheme ? 'rgba(16, 15, 20, 0)' : 'rgba(242, 237, 228, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x + shiftX, orb.y + shiftY, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Render floating particles and web connections
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
        if (dist < 120) {
          const force = (120 - dist) / 120
          p.x -= (dx / dist) * force * 1.5
          p.y -= (dy / dist) * force * 1.5
        }

        const currentOpacity = p.opacity + Math.sin(p.pulseFactor) * 0.1

        ctx.fillStyle = isSpidermanTheme
          ? (i % 2 === 0 ? `rgba(230, 36, 41, ${Math.max(0.2, currentOpacity)})` : `rgba(0, 102, 204, ${Math.max(0.2, currentOpacity)})`)
          : `rgba(61, 57, 53, ${Math.max(0.05, currentOpacity)})`

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Connect nearby particles with subtle web lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdx = p.x - p2.x
          const pdy = p.y - p2.y
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy)
          if (pdist < 110) {
            ctx.strokeStyle = isSpidermanTheme
              ? `rgba(230, 36, 41, ${0.25 * (1 - pdist / 110)})`
              : `rgba(156, 149, 138, ${0.12 * (1 - pdist / 110)})`
            ctx.lineWidth = isSpidermanTheme ? 0.9 : 0.6
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
