import request from 'supertest';
import app from '../server';

describe('Server Health Check', () => {
  it('should return OK status', async () => {
    const res = await request(app)
      .get('/health')
      .expect(200);
    
    expect(res.body.status).toBe('OK');
    expect(res.body.message).toBe('Server is running');
  });
});

describe('API Routes', () => {
  it('should return 404 for non-existent routes', async () => {
    const res = await request(app)
      .get('/non-existent-route')
      .expect(404);
    
    expect(res.body.error).toBe('Route not found');
  });
});