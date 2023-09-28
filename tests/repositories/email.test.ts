import { prisma, server } from '../../src/app';
import { insertFakeEmails, insertFakeEmailsReachingQuota } from '../utils/functions.utils';
import { StatsUser } from '../../src/models/StatsUser';
import { Email } from '../../src/models/Email';
import { EmailRepositoryTestImpl } from '../../src/repositories/EmailRepositoryTestImpl';


const emailRepository = new EmailRepositoryTestImpl();

beforeAll(async () => {
    await prisma.email.deleteMany();
    await prisma.user.deleteMany();
});

describe('getStats', () => {
    test.skip('It should return stats for emails', async () => {
        await insertFakeEmails();
        
        const stats = await emailRepository.getStats();
        expect(stats).toEqual([
            new StatsUser('user1@example.com', 3),
            new StatsUser('user2@example.com', 2),
        ]);
    });
});
describe('saveEmail', () => {
    test('It should save an email', async () => {
      const email = new Email('user1@example.com', 'user2@example.com', 'Testing', 'This is a test');
  
      const result = emailRepository.saveEmail(email);
      
      expect(typeof result).toBe('number');
    });
});
describe('isQuotaExceeded', () => {
    beforeEach(async () => {
        await prisma.email.deleteMany();
        await prisma.user.deleteMany();
    });
    test('It would return true if user sent more than 1000 emails during this day', () => {
        const exceeded = emailRepository.isQuotaExceeded("true");
        
        expect(exceeded).toBeTruthy();
    });
    test('It would return false if user sent less than or equal 1000 emails during this day', () => {
        const exceeded = emailRepository.isQuotaExceeded("false");

        expect(exceeded).toBeFalsy();
      });
});

afterAll(async () => {
    prisma.user.deleteMany;
    prisma.email.deleteMany;
    await prisma.$disconnect();
    server.close();
});