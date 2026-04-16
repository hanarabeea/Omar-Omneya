'use client'

import { useRef, useState, useEffect } from 'react'

interface HeroSectionProps {
  onScroll: () => void
}

export default function HeroSection({ onScroll }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showPlayButton, setShowPlayButton] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = async () => {
      try {
        await video.play()
        setShowPlayButton(false)
      } catch {
        // Autoplay blocked (e.g. low power mode) — show manual play button
        setShowPlayButton(true)
      }
    }

    tryPlay()
  }, [])

  const handlePlay = async () => {
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
      setShowPlayButton(false)
    } catch {
      // still blocked, keep button visible
    }
  }

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

      {showPlayButton && (
        <button
          onClick={handlePlay}
          aria-label="Play video"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.25)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Play triangle */}
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: '14px solid transparent',
                borderBottom: '14px solid transparent',
                borderLeft: '22px solid #2c2c2c',
                marginLeft: 5,
              }}
            />
          </div>
        </button>
      )}
    </section>
  )
}
