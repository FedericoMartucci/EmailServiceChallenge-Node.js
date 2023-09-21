import { prisma, server } from '../../src/app';
import { insertFakeEmails, insertFakeEmailsReachingQuota } from '../utils/functions.utils';
import { getStats, isQuotaExceeded, saveEmail } from '../../src/repositories/email';
import { StatsUser } from '../../src/models/StatsUser';
import { Email } from '../../src/models/Email';


beforeAll(async () => {
    await prisma.email.deleteMany();
    await prisma.user.deleteMany();
});

describe('getStats', () => {
    test('It should return stats for emails', async () => {
        await insertFakeEmails();
        const stats = await getStats();
        expect(stats).toEqual([
            new StatsUser('user1@example.com', 3),
            new StatsUser('user2@example.com', 2),
        ]);
    });
});
describe('saveEmail', () => {
    test('It should save an email', async () => {
      const email = new Email('user1@example.com', 'user2@example.com', 'Testing', 'This is a test');
  
      const result = await saveEmail(email);
      
      expect(typeof result).toBe('number');
    });
});
describe('isQuotaExceeded', () => {
    beforeEach(async () => {
        await prisma.email.deleteMany();
        await prisma.user.deleteMany();
    });
    test('It would return true if user sent more than 1000 emails during this day', async () => {
        await insertFakeEmailsReachingQuota(1000);
        const exceeded = await isQuotaExceeded("user1@example.com");
        
        expect(exceeded).toBeTruthy();
    });
    test('It would return false if user sent less than or equal 1000 emails during this day', async () => {
        await insertFakeEmailsReachingQuota(999);
        const exceeded = await isQuotaExceeded("user1@example.com");

        expect(exceeded).toBeFalsy();
      });
});

afterAll(async () => {
    prisma.user.deleteMany;
    prisma.email.deleteMany;
    await prisma.$disconnect();
    server.close();
});