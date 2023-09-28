import { prisma, server } from "../../src/app";
import { login, register } from "../../src/services/auth";


beforeAll(async () => {
    await prisma.email.deleteMany();
    await prisma.user.deleteMany();
});

describe('registerService', () => {
    test('It should register a new user successfully', async () => {
        const requestBody = {
            username: 'testuser',
            password: 'testpassword',
            firstname: 'Test',
            lastname: 'User',
            country: 'TestCountry'
        };

        const result = await register(requestBody);
        expect(result).toBe('SUCCESSFUL_REGISTER');
    });

    test('It should return "ALREADY_USER" if the username is already taken', async () => {
        const requestBody = {
            username: 'testuser',
            password: 'testpassword',
            firstname: 'Test',
            lastname: 'User',
            country: 'TestCountry'
        };

        const result = await register(requestBody);
        expect(result).toBe('ALREADY_USER');
    });
});

describe('loginService', () => {
    test('It should login a user successfully', async () => {
        const requestBody = {
            username: 'testuser',
            password: 'testpassword',
        };

    const result = await login(requestBody);
    expect(result).toHaveProperty('token');
  });

    test('It should return "NONEXISTENT_USER" if the username does not exist', async () => {
        const requestBody = {
            username: 'nonexistentuser',
            password: 'password123',
        };

        const result = await login(requestBody);
        expect(result).toBe('NONEXISTENT_USER');
    });

    test('It should return "INCORRECT_PASSWORD" if the password is incorrect', async () => {
        const requestBody = {
            username: 'testuser',
            password: 'incorrectpassword',
        };

        const result = await login(requestBody);
        expect(result).toBe('INCORRECT_PASSWORD');
    });
});
afterAll(async () => {
    prisma.user.deleteMany;
    prisma.email.deleteMany;
    await prisma.$disconnect();
    server.close();
  });