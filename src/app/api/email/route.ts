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
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>New Query Details</h2>
            
            <!-- Basic Information -->
            <div style="margin-bottom: 20px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Contact:</strong> ${contact}</p>
              ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
            </div>

            <!-- Service Specific Fields -->
            ${countryOfLoading ? `<p><strong>Country of Loading:</strong> ${countryOfLoading}</p>` : ''}
            ${destination ? `<p><strong>Destination:</strong> ${destination}</p>` : ''}
            ${deliveryAddress ? `<p><strong>Delivery Address:</strong> ${deliveryAddress}</p>` : ''}
            ${shippingMode ? `<p><strong>Shipping Mode:</strong> ${shippingMode}</p>` : ''}
            ${commodity ? `<p><strong>Commodity:</strong> ${commodity}</p>` : ''}
            ${weight ? `<p><strong>Weight:</strong> ${weight} KG</p>` : ''}
            ${dimensions ? `<p><strong>Dimensions:</strong> ${dimensions}</p>` : ''}

            <!-- Message -->
            <div style="margin-top: 20px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
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
      html: emailTemplate,
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