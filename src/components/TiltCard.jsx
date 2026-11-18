import { useRef, useState } from 'react'

/**
 * Interactive 3D perspective card tilt with cursor-tracking radial glare spotlight.
 * Works on any element tag (div, article, Link, etc.) or wraps children cleanly.
 */
export default function TiltCard({
  children,
  className = '',
  intensity = 10,
  glareColor = 'rgba(0, 194, 168, 0.16)',
  as: Component = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
  })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const pctX = (x / rect.width) * 100
    const pctY = (y / rect.height) * 100

    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * intensity
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * intensity

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.08s ease-out',
    })
    setGlare({ x: pctX, y: pctY, opacity: 1 })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    })
    setGlare((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative overflow-hidden ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(380px circle at ${glare.x}% ${glare.y}%, ${glareColor}, transparent 70%)`,
        }}
      />
      {children}
    </Component>
  )
}
