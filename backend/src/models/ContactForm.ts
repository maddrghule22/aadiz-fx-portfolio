import mongoose, { Document, Schema } from 'mongoose';

export interface IContactForm extends Document {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactFormSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  projectType: { type: String, required: true },
  budget: { type: String, required: true },
  timeline: { type: String, required: true },
  message: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IContactForm>('ContactForm', ContactFormSchema);