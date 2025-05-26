const request = require('supertest');
const app = require('./app'); // Adjust the path to your Express app

describe('GET /api/user', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/api/user');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
