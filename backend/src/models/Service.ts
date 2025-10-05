import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  tier: 'pre-production' | 'production' | 'post-production' | 'vfx';
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  features: [{ type: String }],
  tier: { 
    type: String, 
    required: true, 
    enum: ['pre-production', 'production', 'post-production', 'vfx'] 
  }
}, {
  timestamps: true
});

export default mongoose.model<IService>('Service', ServiceSchema);