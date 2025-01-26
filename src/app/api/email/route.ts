import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Add debug logging
console.log('Environment check:', {
  hasResendKey: !!process.env.RESEND_API_KEY,
  hasRecipientEmail: !!process.env.RECIPIENT_EMAIL,
  nodeEnv: process.env.NODE_ENV
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Add CORS headers
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
  console.log('1. API route hit');
  
  try {
    const body = await request.json();
    console.log('2. Request body received:', {
      hasName: !!body.name,
      hasEmail: !!body.email,
      hasContact: !!body.contact,
      hasMessage: !!body.message,
      service: body.service
    });

    const { 
      name, 
      email, 
      contact, 
      message,
      service,
      countryOfLoading,
      destination,
      deliveryAddress,
      shippingMode,
      commodity,
      weight,
      dimensions 
    } = body;

    if (!name || !email || !contact || !message) {
      console.log('3. Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    console.log('4. Preparing to send email');
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: ##f9f9f9;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .logo {
              max-width: 200px;
              height: auto;
              margin-bottom: 15px;
            }
            .content {
              background-color: white;
              padding: 20px;
              border-radius: 0 0 5px 5px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .section {
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid #eee;
            }
            .label {
              font-weight: bold;
              color: #003366;
            }
            .message-box {
              background-color: #f5f5f5;
              padding: 15px;
              border-radius: 5px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://expressshipping.mv/logo_full.svg" alt="Express Shipping" class="logo" style="margin-bottom: 15px;" />
              <h2 style="margin:0;">New Inquiry</h2>
            </div>
            
            <div class="content">
              <!-- Basic Information -->
              <div class="section">
                <h3 style="color: #003366; margin-top: 0;">Contact Details</h3>
                <p><span class="label">Name:</span> ${name}</p>
                <p><span class="label">Email:</span> ${email}</p>
                <p><span class="label">Contact:</span> ${contact}</p>
                ${service ? `<p><span class="label">Service:</span> ${service}</p>` : ''}
              </div>

              <!-- Service Specific Fields -->
              ${(countryOfLoading || destination || deliveryAddress || shippingMode) ? `
                <div class="section">
                  <h3 style="color: #003366;">Shipping Details</h3>
                  ${countryOfLoading ? `<p><span class="label">Country of Loading:</span> ${countryOfLoading}</p>` : ''}
                  ${destination ? `<p><span class="label">Destination:</span> ${destination}</p>` : ''}
                  ${deliveryAddress ? `<p><span class="label">Delivery Address:</span> ${deliveryAddress}</p>` : ''}
                  ${shippingMode ? `<p><span class="label">Shipping Mode:</span> ${shippingMode}</p>` : ''}
                </div>
              ` : ''}

              <!-- Cargo Details -->
              ${(commodity || weight || dimensions) ? `
                <div class="section">
                  <h3 style="color: #003366;">Cargo Information</h3>
                  ${commodity ? `<p><span class="label">Commodity:</span> ${commodity}</p>` : ''}
                  ${weight ? `<p><span class="label">Weight:</span> ${weight} KG</p>` : ''}
                  ${dimensions ? `<p><span class="label">Dimensions:</span> ${dimensions}</p>` : ''}
                </div>
              ` : ''}

              <!-- Message -->
              <div class="section" style="border-bottom: none;">
                <h3 style="color: #003366;">Message</h3>
                <div class="message-box">
                  <p style="white-space: pre-wrap; margin: 0;">${message}</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'Express Shipping <info@expressshipping.mv>',
      to: 'sales@expressshipping.mv',
      replyTo: email,
      subject: `New Query from ${name} - ${service}`,
      html: html,
    });

    console.log('5. Resend API response:', result);

    if ('error' in result && result.error) {
      console.error('6. Email send error:', {
        error: result.error,
        message: result.error.message || 'Unknown error'
      });
      return NextResponse.json(
        { 
          error: 'Failed to send email', 
          details: result.error.message || 'Unknown error'
        },
        { status: 500 }
      );
    }

    console.log('7. Email sent successfully');
    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('8. Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}