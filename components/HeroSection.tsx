'use client'

import { useRef } from 'react'

interface HeroSectionProps {
  onScroll: () => void
}

export default function HeroSection({ onScroll }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        background: '#f9f7f4',
      }}
    >
      <video
        ref={videoRef}
        onEnded={onScroll}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        src="/invite.mp4"
        playsInline
        autoPlay
        muted
        preload="auto"
      />
    </section>
  )
}
