import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Add debug logging
console.log('Environment check:', {
  hasResendKey: !!process.env.RESEND_API_KEY,
  hasRecipientEmail: !!process.env.RECIPIENT_EMAIL,
  nodeEnv: process.env.NODE_ENV
});

// Initialize Resend with error handling
let resend: Resend | null = null;
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  } else {
    console.error('RESEND_API_KEY is missing from environment variables');
  }
} catch (error) {
  console.error('Failed to initialize Resend:', error);
}

// Add CORS headers helper
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Options handler for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  // Detailed environment check
  if (!process.env.RESEND_API_KEY || !process.env.RECIPIENT_EMAIL) {
    const missingVars = [];
    if (!process.env.RESEND_API_KEY) missingVars.push('RESEND_API_KEY');
    if (!process.env.RECIPIENT_EMAIL) missingVars.push('RECIPIENT_EMAIL');
    
    console.error(`Missing environment variables: ${missingVars.join(', ')}`);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Email service not properly configured',
        details: `Missing: ${missingVars.join(', ')}`
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  // Check Resend initialization
  if (!resend) {
    console.error('Resend client not initialized');
    return NextResponse.json(
      { 
        success: false, 
        error: 'Email service initialization failed'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  try {
    const body = await request.json();
    const { name, email, contact, message } = body;

    // Validate input
    if (!name || !email || !contact || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required' 
        },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Attempt to send email
    const { data, error } = await resend.emails.send({
      from: 'Express Shipping <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Query from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Query</h2>
          ${body.service ? `<p><strong>Service Requested:</strong> ${body.service}</p>` : ''}
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact:</strong> ${contact}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        data 
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 