import mongoose from 'mongoose';
import Project from '../models/Project';
import Testimonial from '../models/Testimonial';
import Client from '../models/Client';
import Service from '../models/Service';
import User from '../models/User';
import ContactForm from '../models/ContactForm';

// Create database indexes for better query performance
export const createIndexes = async () => {
  try {
    // Project indexes
    await Project.collection.createIndex({ id: 1 }, { unique: true });
    await Project.collection.createIndex({ featured: 1 });
    await Project.collection.createIndex({ category: 1 });
    await Project.collection.createIndex({ year: -1 });
    await Project.collection.createIndex({ createdAt: -1 });
    await Project.collection.createIndex({ tags: 1 });
    
    // Testimonial indexes
    await Testimonial.collection.createIndex({ id: 1 }, { unique: true });
    await Testimonial.collection.createIndex({ createdAt: -1 });
    
    // Client indexes
    await Client.collection.createIndex({ id: 1 }, { unique: true });
    await Client.collection.createIndex({ createdAt: -1 });
    
    // Service indexes
    await Service.collection.createIndex({ id: 1 }, { unique: true });
    await Service.collection.createIndex({ tier: 1 });
    await Service.collection.createIndex({ createdAt: -1 });
    
    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ role: 1 });
    
    // ContactForm indexes
    await ContactForm.collection.createIndex({ createdAt: -1 });
    await ContactForm.collection.createIndex({ email: 1 });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating database indexes:', error);
  }
};

// Drop all indexes (useful for development)
export const dropIndexes = async () => {
  try {
    await Project.collection.dropIndexes();
    await Testimonial.collection.dropIndexes();
    await Client.collection.dropIndexes();
    await Service.collection.dropIndexes();
    await User.collection.dropIndexes();
    await ContactForm.collection.dropIndexes();
    
    console.log('Database indexes dropped successfully');
  } catch (error) {
    console.error('Error dropping database indexes:', error);
  }
};