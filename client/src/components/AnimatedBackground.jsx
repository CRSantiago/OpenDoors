import React, { useEffect } from 'react'
import './AnimatedBackground.css'

const AnimatedBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('animated-background')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')

    let circles = []
    const numCircles = 20

    function generateCircles() {
      for (let i = 0; i < numCircles; i++) {
        let radius = Math.random() * 20 + 10 // Random radius between 10 and 30
        circles.push({
          x: Math.random() * canvas.width, // Random x-coordinate
          y: Math.random() * canvas.height, // Random y-coordinate
          radius: radius,
          dx: (Math.random() - 0.5) * 2, // Random x-velocity between -2 and 2
          dy: (Math.random() - 0.5) * 2, // Random y-velocity between -2 and 2
          color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
            Math.random() * 255
          }, 0.7)`, // Random color
        })
      }
    }

    function drawCircles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas
      circles.forEach((circle) => {
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false) // Draw a circle
        ctx.fillStyle = circle.color
        ctx.fill()

        // Update circle position
        circle.x += circle.dx
        circle.y += circle.dy

        // Reverse direction if the circle hits the canvas edge
        if (
          circle.x + circle.radius > canvas.width ||
          circle.x - circle.radius < 0
        ) {
          circle.dx *= -1
        }
        if (
          circle.y + circle.radius > canvas.height ||
          circle.y - circle.radius < 0
        ) {
          circle.dy *= -1
        }
      })
      requestAnimationFrame(drawCircles) // Recursively animate
    }

    generateCircles()
    drawCircles()

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }, [])

  return (
    <canvas
      id="animated-background"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    ></canvas>
  )
}

export default AnimatedBackground
