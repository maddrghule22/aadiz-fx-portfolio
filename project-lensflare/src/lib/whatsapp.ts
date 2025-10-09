// Utility functions for WhatsApp integration

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

/**
 * Format contact form data into a WhatsApp message
 */
export const formatWhatsAppMessage = (data: ContactFormData): string => {
  return `New Contact Form Submission from ${data.name}

Contact Details:
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Project Type: ${data.projectType}
Budget Range: ${data.budget}
Timeline: ${data.timeline}

Message:
${data.message}`;
};

/**
 * Generate a WhatsApp URL with pre-filled message
 */
export const generateWhatsAppURL = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
};

/**
 * Generate a WhatsApp URL from contact form data
 */
export const generateContactWhatsAppURL = (data: ContactFormData, phoneNumber: string = '918180999435'): string => {
  const message = formatWhatsAppMessage(data);
  return generateWhatsAppURL(phoneNumber, message);
};

/**
 * Open WhatsApp with contact form data
 */
export const openWhatsAppWithContactData = (data: ContactFormData, phoneNumber: string = '918180999435'): void => {
  const url = generateContactWhatsAppURL(data, phoneNumber);
  window.open(url, '_blank');
};