const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/projects/featured',
  method: 'GET'
};

const req = http.request(options, res => {
  let data = '';
  
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('Featured Projects Data:');
      jsonData.data.forEach(project => {
        console.log(`- ${project.title}`);
        console.log(`  Video URL: ${project.videoUrl}`);
        console.log(`  Thumbnail URL: ${project.thumbnailUrl}`);
        console.log('');
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      console.log('Raw data:', data);
    }
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.end();