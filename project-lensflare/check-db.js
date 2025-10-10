const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aadizfx', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const projectSchema = new mongoose.Schema({
  id: String,
  title: String,
  videoUrl: String,
  thumbnailUrl: String,
  featured: Boolean
});

const Project = mongoose.model('Project', projectSchema);

async function checkProjects() {
  try {
    console.log('Connecting to database...');
    await mongoose.connection.once('open', async () => {
      console.log('Connected to database');
      
      // Get all projects
      const projects = await Project.find({});
      console.log('\nAll Projects:');
      projects.forEach(project => {
        console.log(`- ${project.title}`);
        console.log(`  Video URL: ${project.videoUrl}`);
        console.log(`  Thumbnail URL: ${project.thumbnailUrl}`);
        console.log('');
      });
      
      // Get featured projects
      const featuredProjects = await Project.find({ featured: true });
      console.log('\nFeatured Projects:');
      featuredProjects.forEach(project => {
        console.log(`- ${project.title}`);
        console.log(`  Video URL: ${project.videoUrl}`);
        console.log(`  Thumbnail URL: ${project.thumbnailUrl}`);
        console.log('');
      });
      
      mongoose.connection.close();
    });
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
}

checkProjects();