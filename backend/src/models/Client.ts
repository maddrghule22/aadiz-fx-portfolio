import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  id: string;
  name: string;
  logo: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<IClient>('Client', ClientSchema);