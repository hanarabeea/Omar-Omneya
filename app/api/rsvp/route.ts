import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

// Validate environment variables
function validateEnv() {
  const required = ['GMAIL_USER', 'GMAIL_PASS']
  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    validateEnv()

    const { guestName, rsvpStatus } = await request.json()

    // Validate input
    if (!guestName || !rsvpStatus) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['attending', 'not-attending'].includes(rsvpStatus)) {
      return NextResponse.json({ error: 'Invalid RSVP status' }, { status: 400 })
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    // Email content
    const rsvpText = rsvpStatus === 'attending' ? 'WILL ATTEND' : 'WILL NOT ATTEND'
    const subject = `RSVP: ${guestName} - ${rsvpText}`
    const htmlContent = `
      <div style="font-family: 'Cormorant Garamond', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="font-style: italic; font-weight: 600; font-size: 28px; color: #2b2b2b; margin-bottom: 20px;">
          New RSVP Received
        </h2>
        
        <div style="border-top: 1px solid #b5aa8a; border-bottom: 1px solid #b5aa8a; padding: 20px 0; margin: 20px 0;">
          <p style="font-size: 18px; color: #2b2b2b; margin: 10px 0;">
            <strong>Guest Name:</strong> ${guestName}
          </p>
          <p style="font-size: 18px; color: #2b2b2b; margin: 10px 0;">
            <strong>Status:</strong> <span style="font-weight: 600; color: ${rsvpStatus === 'attending' ? '#4ade80' : '#f87171'};">${rsvpText}</span>
          </p>
          <p style="font-size: 14px; color: #666; margin: 10px 0;">
            Received: ${new Date().toLocaleString()}
          </p>
        </div>

        <p style="font-size: 14px; color: #666; margin-top: 20px; text-align: center;">
          Omar & Omneya's Engagement
        </p>
      </div>
    `

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject,
      html: htmlContent,
    })

    return NextResponse.json({ success: true, message: 'RSVP submitted successfully' })
  } catch (error) {
    console.error('RSVP submission error:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred while processing your RSVP'

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
