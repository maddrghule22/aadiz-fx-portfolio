import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  id: string;
  title: string;
  description: string;
  category: 'commercial' | 'music-video' | 'vfx-breakdown' | 'short-film' | 'documentary';
  client?: string;
  role: string[];
  videoUrl: string;
  thumbnailUrl: string;
  images?: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
  tags: string[];
  year: number;
  featured: boolean;
  duration?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['commercial', 'music-video', 'vfx-breakdown', 'short-film', 'documentary'] 
  },
  client: { type: String },
  role: [{ type: String }],
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  images: [{ type: String }],
  beforeAfter: {
    before: { type: String },
    after: { type: String }
  },
  tags: [{ type: String }],
  year: { type: Number, required: true },
  featured: { type: Boolean, required: true },
  duration: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', ProjectSchema);