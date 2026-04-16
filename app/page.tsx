'use client'

import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import RSVPCard from '@/components/RSVPCard'

export default function Home() {
  const rsvpRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    rsvpRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="bg-cream">
      <HeroSection onScroll={handleScroll} />
      <div ref={rsvpRef}>
        <RSVPCard />
      </div>
    </main>
  )
}
