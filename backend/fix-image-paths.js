// Script to fix image paths in the database
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aadizfx', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Project schema directly in this script
const projectSchema = new mongoose.Schema({
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

const Project = mongoose.model('Project', projectSchema);

async function fixImagePaths() {
  try {
    console.log('Connecting to database...');
    
    // Find the project with the incorrect thumbnail URL
    const project = await Project.findOne({ thumbnailUrl: '/images/projects/toyota-hybrid.jpg' });
    
    if (project) {
      console.log('Found project with incorrect image path:', project.title);
      console.log('Current thumbnail URL:', project.thumbnailUrl);
      
      // Update to the correct image path
      project.thumbnailUrl = '/images/projects/toyota-1.jpg';
      await project.save();
      
      console.log('Updated thumbnail URL to:', project.thumbnailUrl);
    } else {
      console.log('No project found with the incorrect image path.');
      
      // Let's check all projects and their thumbnail URLs
      const allProjects = await Project.find({}, 'id title thumbnailUrl');
      console.log('All projects and their thumbnail URLs:');
      allProjects.forEach(p => {
        console.log(`- ${p.title}: ${p.thumbnailUrl}`);
      });
    }
    
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixImagePaths();