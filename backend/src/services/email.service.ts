import nodemailer from 'nodemailer';
import { IContactForm } from '../models/ContactForm';

interface ContactEmailData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Format message for WhatsApp
const formatWhatsAppMessage = (data: ContactEmailData): string => {
  return `
New Contact Form Submission from ${data.name}

Contact Details:
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Project Type: ${data.projectType}
Budget Range: ${data.budget}
Timeline: ${data.timeline}

Message:
${data.message}
  `.trim();
};

// Generate WhatsApp URL
const generateWhatsAppURL = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `${process.env.WHATSAPP_API_URL || 'https://api.whatsapp.com/send'}?phone=${phoneNumber}&text=${encodedMessage}`;
};

// Send contact form email notification
export const sendContactEmail = async (data: ContactEmailData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'adityashinde6050@gmail.com',
      to: process.env.EMAIL_FROM || 'adityashinde6050@gmail.com',
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
            <p><strong>Project Type:</strong> ${data.projectType}</p>
            <p><strong>Budget Range:</strong> ${data.budget}</p>
            <p><strong>Timeline:</strong> ${data.timeline}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <h3 style="margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This message was sent from the contact form on your website.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact form email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
};

// Send WhatsApp notification
export const sendWhatsAppNotification = async (data: ContactEmailData) => {
  try {
    const phoneNumber = process.env.WHATSAPP_PHONE || '+918180999435';
    const message = formatWhatsAppMessage(data);
    const whatsappURL = generateWhatsAppURL(phoneNumber, message);
    
    console.log('WhatsApp notification ready. URL:', whatsappURL);
    console.log('Message content:', message);
    
    // In a real implementation, you would integrate with a WhatsApp API service
    // For now, we'll just log the information that would be sent
    
    return {
      success: true,
      url: whatsappURL,
      message: 'WhatsApp notification prepared'
    };
  } catch (error) {
    console.error('Error preparing WhatsApp notification:', error);
    throw error;
  }
};

// Send confirmation email to the person who submitted the form
export const sendConfirmationEmail = async (data: ContactEmailData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'adityashinde6050@gmail.com',
      to: data.email,
      subject: 'Thank you for contacting Aditya Shinde',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You for Your Message</h2>
          
          <p>Hello ${data.name},</p>
          
          <p>Thank you for reaching out to Aditya Shinde. I've received your message and will get back to you within 24 hours.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Submission Details</h3>
            <p><strong>Project Type:</strong> ${data.projectType}</p>
            <p><strong>Budget Range:</strong> ${data.budget}</p>
            <p><strong>Timeline:</strong> ${data.timeline}</p>
          </div>
          
          <p>In the meantime, feel free to browse my portfolio to see examples of my work.</p>
          
          <p>Best regards,<br/>Aditya Shinde</p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};