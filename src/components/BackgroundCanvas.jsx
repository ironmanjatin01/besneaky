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

    // Soft, warm paper texture: low-contrast drifting flecks and light pools.
    const particleCount = Math.min(Math.floor(width / 28), 48)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.28 + 0.1,
      pulseSpeed: Math.random() * 0.01 + 0.003,
      pulseFactor: Math.random() * Math.PI,
      // Oat, clay, and roast: just enough color to make the canvas feel alive.
      colorType: Math.floor(Math.random() * 3)
    }))

    // Slow, diffused pools of warmth under the page content.
    const orbs = [
      { x: width * 0.14, y: height * 0.22, radius: 360, color: 'rgba(215, 178, 126, 0.18)', vx: 0.08, vy: 0.06 },
      { x: width * 0.86, y: height * 0.52, radius: 410, color: 'rgba(206, 128, 103, 0.12)', vx: -0.07, vy: 0.1 },
      { x: width * 0.46, y: height * 0.84, radius: 320, color: 'rgba(171, 123, 83, 0.1)', vx: 0.08, vy: -0.08 }
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
        const shiftX = (dx / (dist || 1)) * 14
        const shiftY = (dy / (dist || 1)) * 14

        const gradient = ctx.createRadialGradient(
          orb.x + shiftX,
          orb.y + shiftY,
          0,
          orb.x + shiftX,
          orb.y + shiftY,
          orb.radius
        )
        gradient.addColorStop(0, orb.color)
        gradient.addColorStop(1, 'rgba(255, 253, 248, 0)')

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
        if (dist < 130) {
          const force = (130 - dist) / 130
          p.x -= (dx / dist) * force * 0.55
          p.y -= (dy / dist) * force * 0.55
        }

        const currentOpacity = p.opacity + Math.sin(p.pulseFactor) * 0.25

        let particleColor = `rgba(184, 146, 104, ${Math.max(0.08, currentOpacity)})`
        if (p.colorType === 1) {
          particleColor = `rgba(193, 112, 84, ${Math.max(0.08, currentOpacity)})`
        } else if (p.colorType === 2) {
          particleColor = `rgba(123, 82, 52, ${Math.max(0.08, currentOpacity)})`
        }

        ctx.shadowBlur = 7
        ctx.shadowColor = 'rgba(193, 112, 84, 0.18)'
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0 // reset shadow for performance

        if (dist < 150) {
          ctx.strokeStyle = `rgba(161, 108, 72, ${0.12 * (1 - dist / 150)})`
          ctx.lineWidth = 0.65
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.stroke()
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdx = p.x - p2.x
          const pdy = p.y - p2.y
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy)
          if (pdist < 125) {
            ctx.strokeStyle = `rgba(161, 108, 72, ${0.07 * (1 - pdist / 125)})`
            ctx.lineWidth = 0.55
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
