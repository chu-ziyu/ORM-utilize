const request = require('supertest');
const app = require('../app');
const sequelize = require('../models/index');
const chai = require('chai');
const expect = chai.expect; 

// Database setup
// drops and recreates all tables to ensure a clean state for testing
beforeEach(async () => {
    await sequelize.sync({ force: true }); // Reset the database before tests
});

describe('User API', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User'
            });
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('email', 'test@example.com');
    });

    it('should return 400 if user already exists', async () => {
        // First, create a new user
        await request(app)
            .post('/api/users')
            .send({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User'
            });

        // Now, try to create the same user again
        const response = await request(app)
            .post('/api/users')
            .send({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User'
            });

        expect(response.status).to.equal(400);
    });
});