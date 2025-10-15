import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import ContactForm from '../models/ContactForm';
import { sendContactEmail, sendConfirmationEmail, sendWhatsAppNotification } from '../services/email.service';

// Validation rules
export const contactValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('projectType').notEmpty().withMessage('Project type is required'),
  body('budget').notEmpty().withMessage('Budget range is required'),
  body('timeline').notEmpty().withMessage('Timeline is required'),
  body('message').notEmpty().withMessage('Message is required')
];

// Handle contact form submission
export const submitContactForm = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, email, company, projectType, budget, timeline, message } = req.body;

    // Save to database
    const contactForm = new ContactForm({
      name,
      email,
      company: company || '',
      projectType,
      budget,
      timeline,
      message
    });

    const savedContactForm = await contactForm.save();

    // Prepare data for notifications
    const notificationData = {
      name,
      email,
      company: company || '',
      projectType,
      budget,
      timeline,
      message
    };

    // Send email notification to admin
    await sendContactEmail(notificationData);

    // Send WhatsApp notification to admin
    try {
      await sendWhatsAppNotification(notificationData);
    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', whatsappError);
      // Don't fail the entire request if WhatsApp notification fails
    }

    // Send confirmation email to user
    await sendConfirmationEmail(notificationData);

    return res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: savedContactForm
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all contact form submissions (admin only)
export const getAllContactForms = async (req: Request, res: Response) => {
  try {
    const contactForms = await ContactForm.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: contactForms
    });
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get contact form by ID (admin only)
export const getContactFormById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contactForm = await ContactForm.findById(id);

    if (!contactForm) {
      return res.status(404).json({
        success: false,
        message: 'Contact form not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: contactForm
    });
  } catch (error) {
    console.error('Error fetching contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete contact form (admin only)
export const deleteContactForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contactForm = await ContactForm.findByIdAndDelete(id);

    if (!contactForm) {
      return res.status(404).json({
        success: false,
        message: 'Contact form not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact form deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export default {
  submitContactForm,
  getAllContactForms,
  getContactFormById,
  deleteContactForm
};
