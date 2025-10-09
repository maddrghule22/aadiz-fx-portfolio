# WhatsApp Integration Documentation

## Overview
This document explains how to set up WhatsApp integration for the contact form on the Aditya Shinde portfolio website. The integration allows visitors to send messages directly through WhatsApp in addition to the traditional email contact form.

## How It Works
1. Visitors can submit the contact form as usual (sends email)
2. Visitors can also choose to send their message via WhatsApp
3. When "WhatsApp" button is clicked, a pre-formatted message is generated and opens in WhatsApp
4. The user then sends the message to Aditya's WhatsApp number

## Setup Instructions

### 1. Environment Variables
Add the following to your `.env` file in the backend:

```env
# WhatsApp Configuration
WHATSAPP_PHONE=+918180999435
WHATSAPP_API_URL=https://api.whatsapp.com/send
```

### 2. Phone Number Verification
Ensure the phone number is registered with WhatsApp and visible on the platform.

### 3. Testing
1. Visit the contact page
2. Fill out the form
3. Click the "WhatsApp" button
4. Verify that WhatsApp opens with a pre-filled message

## Technical Implementation

### Frontend
- `src/lib/whatsapp.ts` - Utility functions for formatting and generating WhatsApp URLs
- `src/app/contact/page.tsx` - Contact form with WhatsApp submission option

### Backend
- `src/services/email.service.ts` - Includes WhatsApp notification functions
- `src/controllers/contact.controller.ts` - Handles WhatsApp notifications

## Message Format
The WhatsApp message includes:
- Visitor's name
- Email address
- Company (if provided)
- Project type
- Budget range
- Timeline
- Message content

## Limitations
1. This is a client-side integration that opens WhatsApp with a pre-filled message
2. The user must still click "Send" in WhatsApp to actually send the message
3. For a fully automated server-side WhatsApp integration, a paid WhatsApp Business API would be required

## Future Enhancements
1. Integrate with WhatsApp Business API for server-side message sending
2. Add WhatsApp chat widget for real-time communication
3. Implement message templates for common inquiries