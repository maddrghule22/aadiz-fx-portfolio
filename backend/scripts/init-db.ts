// Script to initialize database with sample data
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aadizfx', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

// Import models after connection
import Project from '../src/models/Project';
import Testimonial from '../src/models/Testimonial';
import Client from '../src/models/Client';
import Service from '../src/models/Service';
import User from '../src/models/User';

// Sample data with IDs
const projects = [
  {
    id: uuidv4(),
    title: 'BMW M Series Commercial',
    description: 'High-octane commercial showcasing the power and precision of BMW\'s M Series lineup with stunning CGI and motion graphics.',
    category: 'commercial',
    client: 'BMW',
    role: ['Director', 'Cinematographer'],
    videoUrl: '/videos/bmw-m-series.mp4',
    thumbnailUrl: '/images/projects/bmw-m-series.jpg',
    images: ['/images/projects/bmw-1.jpg', '/images/projects/bmw-2.jpg'],
    beforeAfter: {
      before: '/images/projects/bmw-before.jpg',
      after: '/images/projects/bmw-after.jpg'
    },
    tags: ['Automotive', 'CGI', 'Motion Graphics'],
    year: 2023,
    featured: true,
    duration: '2:45'
  },
  {
    id: uuidv4(),
    title: 'Ducati Desert X Launch',
    description: 'Cinematic launch video highlighting the adventurous spirit of the new Ducati Desert X with breathtaking desert landscapes.',
    category: 'commercial',
    client: 'Ducati',
    role: ['Director', 'Editor'],
    videoUrl: '/videos/ducati-desert-x.mp4',
    thumbnailUrl: '/images/projects/ducati-desert-x.jpg',
    images: ['/images/projects/ducati-1.jpg', '/images/projects/ducati-2.jpg'],
    tags: ['Motorcycle', 'Adventure', 'VFX'],
    year: 2023,
    featured: true,
    duration: '1:30'
  },
  {
    id: uuidv4(),
    title: 'Toyota Hybrid Technology',
    description: 'Innovative explainer video demonstrating Toyota\'s cutting-edge hybrid technology with 3D animations and VFX.',
    category: 'vfx-breakdown',
    client: 'Toyota',
    role: ['VFX Supervisor', 'Animator'],
    videoUrl: '/videos/toyota-hybrid.mp4',
    thumbnailUrl: '/images/projects/toyota-hybrid.jpg',
    images: ['/images/projects/toyota-1.jpg', '/images/projects/toyota-2.jpg'],
    beforeAfter: {
      before: '/images/projects/toyota-before.jpg',
      after: '/images/projects/toyota-after.jpg'
    },
    tags: ['Automotive', 'Technology', 'Animation'],
    year: 2023,
    featured: true,
    duration: '3:15'
  },
  {
    id: uuidv4(),
    title: 'Audi e-tron GT Reveal',
    description: 'Futuristic reveal of Audi\'s all-electric performance sedan with stunning VFX and cyberpunk aesthetics.',
    category: 'commercial',
    client: 'Audi',
    role: ['Director', 'VFX Artist'],
    videoUrl: '/videos/audi-etron.mp4',
    thumbnailUrl: '/images/projects/audi-etron.jpg',
    images: ['/images/projects/audi-1.jpg', '/images/projects/audi-2.jpg'],
    tags: ['Electric', 'Luxury', 'CGI'],
    year: 2023,
    featured: true,
    duration: '2:10'
  }
];

const testimonials = [
  {
    id: uuidv4(),
    name: 'Michael Rodriguez',
    company: 'BMW',
    role: 'Marketing Director',
    content: 'Working with this videographer was a game-changer for our brand. The commercial they created for our M Series launch exceeded all expectations and drove a 40% increase in showroom visits.',
    avatar: '/images/testimonials/bmw-director.jpg',
    rating: 5
  },
  {
    id: uuidv4(),
    name: 'Sarah Johnson',
    company: 'Ducati',
    role: 'Brand Manager',
    content: 'The Desert X launch video captured the essence of our brand perfectly. The cinematography and storytelling were exceptional, resulting in record-breaking social media engagement.',
    avatar: '/images/testimonials/ducati-manager.jpg',
    rating: 5
  },
  {
    id: uuidv4(),
    name: 'David Chen',
    company: 'Toyota',
    role: 'Product Manager',
    content: 'The VFX breakdown for our hybrid technology showcase was incredibly detailed and visually stunning. It helped our customers understand complex technology in an engaging way.',
    avatar: '/images/testimonials/toyota-manager.jpg',
    rating: 5
  }
];

const clients = [
  {
    id: uuidv4(),
    name: 'BMW',
    logo: '/images/clients/bmw.svg',
    website: 'https://www.bmw.com'
  },
  {
    id: uuidv4(),
    name: 'Ducati',
    logo: '/images/clients/ducati.svg',
    website: 'https://www.ducati.com'
  },
  {
    id: uuidv4(),
    name: 'Toyota',
    logo: '/images/clients/toyota.svg',
    website: 'https://www.toyota.com'
  },
  {
    id: uuidv4(),
    name: 'Audi',
    logo: '/images/clients/audi.svg',
    website: 'https://www.audi.com'
  },
  {
    id: uuidv4(),
    name: 'Mercedes-Benz',
    logo: '/images/clients/mercedes.svg',
    website: 'https://www.mercedes-benz.com'
  },
  {
    id: uuidv4(),
    name: 'Lamborghini',
    logo: '/images/clients/lamborghini.svg',
    website: 'https://www.lamborghini.com'
  }
];

const services = [
  {
    id: uuidv4(),
    title: 'Directing',
    description: 'Creative vision and storytelling that brings concepts to life with cinematic excellence.',
    icon: 'Film',
    features: [
      'Concept development',
      'Storyboarding',
      'Talent direction',
      'Creative oversight'
    ],
    tier: 'pre-production'
  },
  {
    id: uuidv4(),
    title: 'Cinematography',
    description: 'Professional filming with cutting-edge equipment to capture stunning visuals.',
    icon: 'Camera',
    features: [
      '4K/8K camera operation',
      'Drone cinematography',
      'Lighting setup',
      'Stabilization systems'
    ],
    tier: 'production'
  },
  {
    id: uuidv4(),
    title: 'Post-Production',
    description: 'Expert editing, color grading, and audio mixing for polished final products.',
    icon: 'Edit',
    features: [
      'Video editing',
      'Color grading',
      'Sound design',
      'Audio mixing'
    ],
    tier: 'post-production'
  },
  {
    id: uuidv4(),
    title: 'VFX',
    description: 'Advanced visual effects and 3D animation to create impossible realities.',
    icon: 'Zap',
    features: [
      '3D modeling',
      'Compositing',
      'Motion graphics',
      'Simulation effects'
    ],
    tier: 'vfx'
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'securepassword',
    role: 'admin'
  }
];

// Insert sample data
async function seedDatabase() {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await Client.deleteMany({});
    await Service.deleteMany({});
    await User.deleteMany({});
    
    // Insert new data
    await Project.insertMany(projects);
    await Testimonial.insertMany(testimonials);
    await Client.insertMany(clients);
    await Service.insertMany(services);
    
    // Insert users (password will be hashed by the model)
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();