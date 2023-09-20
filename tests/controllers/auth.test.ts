import request from "supertest";
import { app, server, prisma } from '../../src/app';

beforeAll(async () => {
    await prisma.email.deleteMany();
    await prisma.user.deleteMany();
});

describe('registerController', () => {
    test('It should handle registration and return SUCCESSFUL_REGISTER response', async () => {
        const requestBody = {
            username: 'testuser',
            password: 'testpassword',
            firstname: 'Test',
            lastname: 'User',
            country: 'TestCountry'
        };
        const response = await request(app).post("/auth/register").send(requestBody);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('SUCCESSFUL_REGISTER');
    });
    test('It should handle registration and return ALREADY_USER response', async () => {
        const requestBody = {
            username: 'testuser',
            password: 'testpassword',
            firstname: 'Test',
            lastname: 'User',
            country: 'TestCountry'
        };
        const response = await request(app).post("/auth/register").send(requestBody);

        expect(response.statusCode).toBe(403);
        expect(response.text).toBe('ALREADY_USER');
    });
  });
  
  describe('loginController', () => {
    test('It should handle login and return a token', async () => {
        const requestBody = {
            username: 'testuser',
            password: 'testpassword',
        };
        const response = await request(app).post("/auth/login").send(requestBody);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
    test('It should handle login and return INCORRECT_PASSWORD response', async () => {
        const requestBody = {
            username: 'testuser',
            password: 'incorrectPassword',
        };
        const response = await request(app).post("/auth/login").send(requestBody);

        expect(response.statusCode).toBe(403);
        expect(response.text).toBe('INCORRECT_PASSWORD');
    });
    test('It should handle login and return NONEXISTENT_USER response', async () => {
        const requestBody = {
            username: 'nonexistentUser',
            password: 'testpassword',
        };
        const response = await request(app).post("/auth/login").send(requestBody);

        expect(response.statusCode).toBe(403);
        expect(response.text).toBe('NONEXISTENT_USER');
    });
  });

  afterAll(async () => {
    prisma.user.deleteMany;
    prisma.email.deleteMany;
    await prisma.$disconnect();
    server.close();
  });