import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, phone, serviceType, serviceDetail } = body;

    // Create transporter for Outlook
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.OUTLOOK_EMAIL, // your outlook email
        pass: process.env.OUTLOOK_PASSWORD, // your outlook password or app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.OUTLOOK_EMAIL,
      to: 'recipient@example.com',
      subject: `New Query: ${serviceType} Service Request from ${name}`,
      text: `
        Service Type: ${serviceType}
        Service Detail: ${serviceDetail}
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
      html: `
        <h3>New Service Query</h3>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Service Detail:</strong> ${serviceDetail}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 