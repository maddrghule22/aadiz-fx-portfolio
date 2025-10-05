import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, min: 1, max: 5 }
}, {
  timestamps: true
});

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);