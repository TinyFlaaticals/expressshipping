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
    const { 
      // Basic fields
      name, 
      email, 
      contact, 
      message,
      service,
      // Sea to Air fields
      countryOfLoading,
      destination,
      // Freight Forwarding fields
      deliveryAddress,
      shippingMode,
      // Common fields for all services
      commodity,
      weight,
      dimensions 
    } = body;

    // Validate required fields
    if (!name || !email || !contact || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Required fields are missing' 
        },
        { status: 400 }
      );
    }

    const emailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <div style="
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            background-color: #ffffff;
          ">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://expressshipping.mv/logo_full.svg" alt="Express Shipping Logo" style="width: 200px;">
            </div>

            <!-- Main Content -->
            <div style="
              background-color: #f8f9fa;
              border-radius: 12px;
              padding: 30px;
              margin-bottom: 20px;
            ">
              <h2 style="
                color: #152C40;
                margin: 0 0 20px 0;
                font-size: 24px;
                font-weight: bold;
              ">New Query Received</h2>

              <!-- Basic Contact Information -->
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              ">
                <p style="margin: 0 0 8px 0; color: #152C40;">
                  <strong>Name:</strong> ${name}
                </p>
                <p style="margin: 0 0 8px 0; color: #152C40;">
                  <strong>Email:</strong> ${email}
                </p>
                <p style="margin: 0; color: #152C40;">
                  <strong>Contact:</strong> ${contact}
                </p>
              </div>

              <!-- Service Type -->
              ${service ? `
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              ">
                <p style="margin: 0; color: #152C40;">
                  <strong>Service Requested:</strong> ${service}
                </p>
              </div>
              ` : ''}

              <!-- Service Specific Fields -->
              ${countryOfLoading ? `
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              ">
                <p style="margin: 0; color: #152C40;">
                  <strong>Country of Loading:</strong> ${countryOfLoading}
                </p>
              </div>
              ` : ''}

              ${destination ? `
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              ">
                <p style="margin: 0; color: #152C40;">
                  <strong>Destination:</strong> ${destination}
                </p>
              </div>
              ` : ''}

              ${deliveryAddress ? `
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              ">
                <p style="margin: 0; color: #152C40;">
                  <strong>Delivery Address:</strong> ${deliveryAddress}
                </p>
              </div>
              ` : ''}

              ${shippingMode ? `
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              ">
                <p style="margin: 0; color: #152C40;">
                  <strong>Shipping Mode:</strong> ${shippingMode}
                </p>
              </div>
              ` : ''}

              ${commodity ? `
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              ">
                <p style="margin: 0; color: #152C40;">
                  <strong>Commodity:</strong> ${commodity}
                </p>
              </div>
              ` : ''}

              ${weight ? `
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              ">
                <p style="margin: 0; color: #152C40;">
                  <strong>Estimate Weight:</strong> ${weight} KG
                </p>
              </div>
              ` : ''}

              ${dimensions ? `
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              ">
                <p style="margin: 0; color: #152C40;">
                  <strong>Dimensions:</strong> ${dimensions}
                </p>
              </div>
              ` : ''}

              <!-- Message -->
              <div style="
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
              ">
                <p style="margin: 0 0 10px 0; color: #152C40;">
                  <strong>Message:</strong>
                </p>
                <p style="
                  margin: 0;
                  color: #4a5568;
                  line-height: 1.6;
                  white-space: pre-wrap;
                ">${message}</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="
              text-align: center;
              color: #718096;
              font-size: 14px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
            ">
              <p style="margin: 0 0 10px 0;">
                © ${new Date().getFullYear()} Express Shipping & Logistics
              </p>
              <p style="margin: 0; font-size: 12px;">
                This is an automated message, please do not reply directly to this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Express Shipping <info@expressshipping.mv>",
      to: process.env.RECIPIENT_EMAIL!,
      replyTo: email,
      subject: `New Query from ${name} - ${service}`,
      html: emailTemplate,
    });

    if (error) {
      console.error('Resend API Error Details:', {
        error,
        fromEmail: "info@expressshipping.mv",
        toEmail: process.env.RECIPIENT_EMAIL,
        subject: `New Query from ${name} - ${service}`
      });
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}