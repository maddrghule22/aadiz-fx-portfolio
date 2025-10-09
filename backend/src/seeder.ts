import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project';
import Testimonial from './models/Testimonial';
import Client from './models/Client';
import Service from './models/Service';

// Load environment variables
dotenv.config();

// Sample data
const projects = [
  {
    id: 'bmw-x1-commercial',
    title: 'BMW X1 Commercial',
    description: 'High-end automotive commercial showcasing the BMW X1 with cinematic visuals and dynamic camera movements.',
    category: 'commercial',
    client: 'BMW',
    role: ['Director', 'Editor', 'Cinematographer'],
    videoUrl: '/videos/bmw-x1.mp4',
    thumbnailUrl: '/images/projects/bmw-x1-thumbnail.jpg',
    tags: ['Automotive', 'Commercial', 'Cinematography', 'Luxury'],
    year: 2024,
    featured: true,
    duration: '1:30'
  },
  {
    id: 'ducati-xdiavel',
    title: 'Ducati Xdiavel Showcase',
    description: 'Powerful motorcycle showcase featuring the Ducati Xdiavel with dramatic lighting and precision shots.',
    category: 'commercial',
    client: 'Ducati',
    role: ['Director', 'Editor', 'VFX Artist'],
    videoUrl: '/videos/ducati-xdiavel.mp4',
    thumbnailUrl: '/images/projects/ducati-thumbnail.jpg',
    tags: ['Motorcycle', 'Commercial', 'Dynamic', 'Performance'],
    year: 2024,
    featured: true,
    duration: '0:45'
  },
  {
    id: 'fashion-edit',
    title: 'Fashion Editorial',
    description: 'Stylish fashion video featuring contemporary fashion with artistic cinematography and color grading.',
    category: 'commercial',
    client: 'Fashion Brand',
    role: ['Director', 'Editor', 'Colorist'],
    videoUrl: '/videos/fashion-edit.mp4',
    thumbnailUrl: '/images/projects/fashion-thumbnail.jpg',
    tags: ['Fashion', 'Editorial', 'Style', 'Color Grading'],
    year: 2024,
    featured: true,
    duration: '2:00'
  },
  {
    id: 'fortuner-commercial',
    title: 'Toyota Fortuner Campaign',
    description: 'Rugged SUV commercial highlighting the Toyota Fortuner\'s capabilities with adventure-focused storytelling.',
    category: 'commercial',
    client: 'Toyota',
    role: ['Director', 'Editor', 'Cinematographer'],
    videoUrl: '/videos/fortuner.mp4',
    thumbnailUrl: '/images/projects/fortuner-thumbnail.jpg',
    tags: ['Automotive', 'SUV', 'Adventure', 'Commercial'],
    year: 2024,
    featured: false,
    duration: '1:45'
  },
  {
    id: 'ktm-showcase',
    title: 'KTM Performance Video',
    description: 'High-energy motorcycle showcase featuring KTM bikes with fast-paced editing and dynamic angles.',
    category: 'commercial',
    client: 'KTM',
    role: ['Director', 'Editor', 'VFX Artist'],
    videoUrl: '/videos/ktm-2.mp4',
    thumbnailUrl: '/images/projects/ktm-thumbnail.jpg',
    tags: ['Motorcycle', 'Performance', 'Action', 'Energy'],
    year: 2024,
    featured: false,
    duration: '1:20'
  },
  {
    id: 'yamaha-fz',
    title: 'Yamaha FZ Promotional',
    description: 'Sleek promotional video for Yamaha FZ featuring urban environments and modern cinematography.',
    category: 'commercial',
    client: 'Yamaha',
    role: ['Director', 'Editor', 'Cinematographer'],
    videoUrl: '/videos/yamaha-fz.mp4',
    thumbnailUrl: '/images/projects/yamaha-thumbnail.jpg',
    tags: ['Motorcycle', 'Urban', 'Modern', 'Promotional'],
    year: 2024,
    featured: false,
    duration: '1:10'
  },
  {
    id: 'zen-creative',
    title: 'Zen Creative Project',
    description: 'Artistic and meditative video project exploring themes of balance and tranquility through visual storytelling.',
    category: 'short-film',
    role: ['Director', 'Editor', 'Colorist'],
    videoUrl: '/videos/zen.mp4',
    thumbnailUrl: '/images/projects/zen-thumbnail.jpg',
    tags: ['Artistic', 'Creative', 'Meditation', 'Visual Story'],
    year: 2024,
    featured: true,
    duration: '2:30'
  }
];

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Michael Rodriguez',
    company: 'Zürich Automotive',
    role: 'CEO',
    content: 'Working with Aditya Shinde was a transformative experience for our luxury car brand. The cinematic commercial they created for our latest model launch captured the essence of Swiss precision and automotive excellence perfectly. The attention to detail and visual storytelling elevated our brand perception significantly. We saw a 60% increase in premium model inquiries after the campaign launch.',
    avatar: '/images/testimonials/zurich-automotive.jpg',
    rating: 5
  },
  {
    id: 'testimonial-2',
    name: 'Sarah Johnson',
    company: 'Force Luxury Cars',
    role: 'Marketing Director',
    content: 'The collaboration with Aditya on our flagship vehicle campaign was exceptional. Their ability to blend luxury aesthetics with automotive performance in the visuals was unmatched. The commercial not only met but exceeded our expectations, resulting in record-breaking engagement across all our digital platforms. The cinematography and post-production work were truly world-class.',
    avatar: '/images/testimonials/force-luxury-cars.jpg',
    rating: 5
  },
  {
    id: 'testimonial-3',
    name: 'David Chen',
    company: 'Ceramic Pro',
    role: 'Regional Manager',
    content: 'Aditya\'s expertise in creating compelling visual content for our protective coating services has been invaluable. The before/after showcase videos they produced clearly demonstrated the effectiveness of our products, leading to a 45% increase in conversion rates. Their understanding of our technical products and ability to translate them into engaging visual stories is remarkable.',
    avatar: '/images/testimonials/ceramic-pro.jpg',
    rating: 5
  }
];

const clients = [
  { id: 'bmw', name: 'BMW', logo: '/images/clients/bmw.svg', website: 'https://bmw.in' },
  { id: 'ducati', name: 'Ducati', logo: '/images/clients/ducati.svg', website: 'https://ducati.com' },
  { id: 'toyota', name: 'Toyota', logo: '/images/clients/toyota.svg', website: 'https://toyota.co.in' },
  { id: 'ktm', name: 'KTM', logo: '/images/clients/ktm.svg', website: 'https://ktm.com' },
  { id: 'yamaha', name: 'Yamaha', logo: '/images/clients/yamaha.svg', website: 'https://yamaha-motor.co.in' },
  { id: 'audi', name: 'Audi', logo: '/images/clients/audi.svg', website: 'https://audi.com' },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '/images/clients/mercedes.svg', website: 'https://mercedes-benz.com' },
  { id: 'lamborghini', name: 'Lamborghini', logo: '/images/clients/lamborghini.svg', website: 'https://lamborghini.com' },
  { id: 'fashion-brand', name: 'Fashion Studio', logo: '/images/clients/fashion.svg', website: '#' }
];

const services = [
  {
    id: 'pre-production',
    title: 'Pre-Production',
    description: 'Concept development, storyboarding, and creative planning to establish the foundation of your project.',
    icon: 'film',
    features: ['Concept Development', 'Storyboarding', 'Shot Planning', 'Creative Consultation'],
    tier: 'pre-production'
  },
  {
    id: 'production',
    title: 'Production',
    description: 'Professional filming with state-of-the-art equipment and experienced crew to capture your vision.',
    icon: 'camera',
    features: ['Cinematography', 'Direction', 'Lighting Design', 'Audio Recording'],
    tier: 'production'
  },
  {
    id: 'post-production',
    title: 'Post-Production',
    description: 'Expert editing, color grading, and audio mixing to polish your project to perfection.',
    icon: 'edit',
    features: ['Video Editing', 'Color Grading', 'Audio Mixing', 'Motion Graphics'],
    tier: 'post-production'
  },
  {
    id: 'vfx',
    title: 'VFX & Animation',
    description: 'Cutting-edge visual effects and 3D animation to bring impossible visions to life.',
    icon: 'zap',
    features: ['3D Animation', 'Compositing', 'Motion Tracking', 'Digital Matte Painting'],
    tier: 'vfx'
  }
];

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aadizfx');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Import data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Project.deleteMany();
    await Testimonial.deleteMany();
    await Client.deleteMany();
    await Service.deleteMany();

    // Insert new data
    await Project.insertMany(projects);
    await Testimonial.insertMany(testimonials);
    await Client.insertMany(clients);
    await Service.insertMany(services);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await connectDB();

    // Delete all data
    await Project.deleteMany();
    await Testimonial.deleteMany();
    await Client.deleteMany();
    await Service.deleteMany();

    console.log('Data deleted successfully');
    process.exit();
  } catch (error) {
    console.error('Error deleting data:', error);
    process.exit(1);
  }
};

// Run appropriate function based on command line arguments
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}