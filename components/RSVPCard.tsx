'use client'

import { useState } from 'react'
import { Mail, Loader2 } from 'lucide-react'

export default function RSVPCard() {
  const [guestName, setGuestName] = useState('')
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not-attending' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName || !rsvpStatus) {
      setErrorMessage('Please fill in all fields')
      setSubmitStatus('error')
      return
    }

    setIsLoading(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName,
          rsvpStatus,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit RSVP')
      }

      setSubmitStatus('success')
      setGuestName('')
      setRsvpStatus(null)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
      setSubmitStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-cream py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Content */}
        <div className="p-12 text-center">
          {/* Title */}
          <div className="mb-8" role="heading" aria-level={1}>
            <div className="text-5xl font-serif font-semibold italic text-charcoal leading-tight">
              Omar &amp;
            </div>
            <div className="text-5xl font-serif font-semibold italic text-charcoal leading-tight">
              Omneya's
            </div>
            <div className="text-5xl font-serif font-semibold italic text-charcoal leading-tight">
              Engagement
            </div>
          </div>

          {/* RSVP Status Buttons */}
          <div className="flex gap-4 mb-8 justify-center">
            <button
              onClick={() => setRsvpStatus('attending')}
              onTouchEnd={(e) => { e.preventDefault(); setRsvpStatus('attending'); }}
              style={{ minHeight: '44px', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              className={`flex-1 px-4 py-3 border-2 border-charcoal rounded text-xs font-serif font-normal tracking-widest uppercase transition-colors ${
                rsvpStatus === 'attending'
                  ? 'bg-charcoal text-white'
                  : 'bg-white text-charcoal hover:bg-charcoal/5'
              }`}
            >
              Will Attend
            </button>
            <button
              onClick={() => setRsvpStatus('not-attending')}
              onTouchEnd={(e) => { e.preventDefault(); setRsvpStatus('not-attending'); }}
              style={{ minHeight: '44px', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              className={`flex-1 px-4 py-3 border-2 border-charcoal rounded text-xs font-serif font-normal tracking-widest uppercase transition-colors ${
                rsvpStatus === 'not-attending'
                  ? 'bg-charcoal text-white'
                  : 'bg-white text-charcoal hover:bg-charcoal/5'
              }`}
            >
              Will Not Attend
            </button>
          </div>

          {/* Guest Name Input */}
          <div className="mb-8 text-left">
            <label htmlFor="guestName" className="block text-sm font-serif italic text-charcoal mb-2">
              To: Guest Name
            </label>
            <input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-charcoal/20 rounded bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent"
            />
          </div>

          {/* Hosted By */}
          <div className="mb-8 text-center">
            <p className="text-sm font-serif italic text-charcoal">
              Hosted by <span className="font-semibold">O²</span>
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-charcoal/20 my-8"></div>

          {/* Details Section */}
          <div className="space-y-4 mb-8">
            {/* Boat Info */}
            <p className="text-xs font-serif font-medium tracking-wider uppercase text-charcoal text-center leading-relaxed">
              Guests will board the boat from Marsi El Nile El Khaled and head to Taracina venue.
            </p>

            {/* Date */}
            <p className="text-2xl font-serif italic text-charcoal">
              Saturday, April 25
            </p>

            {/* Time */}
            <p className="text-2xl font-serif italic text-charcoal">
              6:00PM – 11:00PM
            </p>

            {/* Timezone */}
            <p className="text-xs font-serif font-medium tracking-wider uppercase text-charcoal">
              EEST
            </p>

            {/* Venue Link */}
            <div>
              <a
                href="https://maps.app.goo.gl/BGHcR8yXukaLRm9H7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-serif italic text-charcoal underline hover:text-olive transition-colors"
              >
                Taracina wedding venue
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-charcoal/20 my-8"></div>

          {/* Messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
              ✓ RSVP submitted successfully!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            onTouchEnd={(e) => { if (!isLoading) { e.preventDefault(); handleSubmit(e as any); } }}
            disabled={isLoading}
            style={{ minHeight: '44px', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            className="w-full px-6 py-3 bg-charcoal text-white rounded font-serif font-medium tracking-wider uppercase hover:bg-charcoal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Submit RSVP
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
