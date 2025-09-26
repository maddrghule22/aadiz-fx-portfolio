const fs = require('fs');
const path = require('path');

// Simple thumbnail generation using HTML5 video element approach
// We'll create a simple script that can be run in browser console

const videos = [
  { name: 'bmw-x1', file: 'bmw-x1.mp4' },
  { name: 'ducati-xdiavel', file: 'ducati-xdiavel.mp4' },
  { name: 'fashion-edit', file: 'fashion-edit.mp4' },
  { name: 'fortuner', file: 'fortuner.mp4' },
  { name: 'ktm-2', file: 'ktm-2.mp4' },
  { name: 'yamaha-fz', file: 'yamaha-fz.mp4' },
  { name: 'zen', file: 'zen.mp4' }
];

// Generate browser-based thumbnail extraction script
const generateBrowserScript = () => {
  const script = `
// Run this script in your browser console with the development server running
const videos = ${JSON.stringify(videos, null, 2)};

async function generateThumbnails() {
  for (const video of videos) {
    try {
      // Create video element
      const videoElement = document.createElement('video');
      videoElement.src = '/videos/' + video.file;
      videoElement.crossOrigin = 'anonymous';
      videoElement.currentTime = 5; // 5 seconds into the video
      
      // Wait for video to load
      await new Promise((resolve) => {
        videoElement.addEventListener('loadeddata', () => {
          resolve();
        });
      });
      
      // Create canvas and draw video frame
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1200;
      canvas.height = 675; // 16:9 aspect ratio
      
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = video.name + '-thumbnail.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.8);
      
      console.log('Generated thumbnail for:', video.name);
      
      // Small delay between generations
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Error generating thumbnail for', video.name, error);
    }
  }
}

generateThumbnails();
`;

  return script;
};

// Write the browser script to a file
const browserScript = generateBrowserScript();
fs.writeFileSync(path.join(__dirname, 'browser-thumbnail-generator.js'), browserScript);

console.log('Browser thumbnail generation script created!');
console.log('Instructions:');
console.log('1. Make sure your development server is running (npm run dev)');
console.log('2. Open your browser and go to http://localhost:3006');
console.log('3. Open browser developer tools (F12)');
console.log('4. Go to Console tab');
console.log('5. Copy and paste the content of browser-thumbnail-generator.js');
console.log('6. Press Enter to run the script');
console.log('7. Thumbnails will be automatically downloaded');
console.log('8. Move the downloaded thumbnails to public/images/projects/');