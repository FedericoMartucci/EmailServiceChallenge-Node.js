import { prisma, server} from '../../src/app';
import { StatsUser } from '../../src/models/StatsUser';
import { stats } from '../../src/services/stats';
import { insertFakeEmails } from '../utils/functions.utils';

beforeAll(async () => {
    await prisma.email.deleteMany();
    await prisma.user.deleteMany();
});

describe('statsService', () => {
    test('It should return "NO_EMAILS_SENT_TODAY" if no stats are available', async (): Promise<void> => {
        const result = await stats();

        expect(result).toBe('NO_EMAILS_SENT_TODAY');
    });

    test('It should return an array of StatsUsers if stats are available', async (): Promise<void> => {
        await insertFakeEmails();
        const result = await stats();

        expect(result).toBeInstanceOf(Array);
        for (const statsUser of result) {
            expect(statsUser).toBeInstanceOf(StatsUser);
        }
    });
});

afterAll(async () => {
    prisma.user.deleteMany;
    prisma.email.deleteMany;
    await prisma.$disconnect();
    server.close();
});