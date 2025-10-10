const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/data/clients',
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
      console.log('Clients Data:');
      jsonData.data.forEach(client => {
        console.log(`- ${client.name}`);
        console.log(`  Logo URL: ${client.logo}`);
        console.log(`  Website: ${client.website}`);
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