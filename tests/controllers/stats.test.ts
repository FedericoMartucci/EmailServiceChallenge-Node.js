import request from "supertest";
import { app, server, prisma } from '../../src/app';
import { generateToken } from "../../src/utils/jwt.handle";
import { Role } from "../../src/models/Role";
import { insertFakeEmails } from "../utils/functions.utils";

beforeAll(async (): Promise<void> => {
    await prisma.email.deleteMany();
    await prisma.user.deleteMany();
});

describe('statsController', () => {
    test('It should handle stats and return NO_EMAILS_SENT_TODAY response', async () => {
        const token = generateToken('ADMIN' as Role, 'testingUser');
        const response = await request(app).get("/stats").set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('NO_EMAILS_SENT_TODAY');
    });
    test('It should handle stats and return a list with users and the quantity of emails sent today', async () => {
        await insertFakeEmails();
        const token = generateToken('ADMIN' as Role, 'testingUser');
        const response = await request(app).get("/stats").set("Authorization", `Bearer ${token}`);

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.statusCode).toBe(200);
    });
});

afterAll(async () => {
    prisma.user.deleteMany;
    prisma.email.deleteMany;
    await prisma.$disconnect();
    server.close();
});