import { app, prisma, server } from "../../src/app";
import request from "supertest";
import { Role } from "../../src/models/Role";
import { generateToken } from "../../src/utils/jwt.handle";
import { insertFakeEmailsReachingQuota } from "../utils/functions.utils";

beforeAll(async () => {
    await prisma.email.deleteMany();
    await prisma.user.deleteMany();
});
  

describe('emailController', () => {
    test('It should return "QUOTA_EXCEEDED" if user reached the quota', async (): Promise<void> => {
        const requestBody = {
            toEmail: 'user2@example.com',
            subject: 'Testing',
            text: 'This is a test' 
        };
        const token = generateToken('USER' as Role, 'user1@example.com');
        await insertFakeEmailsReachingQuota(1000);
        const response = await request(app).post("/email/send").set("Authorization", `Bearer ${token}`).send(requestBody);

        expect(response.statusCode).toBe(403);
        expect(response.text).toBe('QUOTA_EXCEEDED');
    });
});

afterAll(async () => {
    prisma.user.deleteMany;
    prisma.email.deleteMany;
    await prisma.$disconnect();
    server.close();
});