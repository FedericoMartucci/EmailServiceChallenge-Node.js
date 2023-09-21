import { findByUsername, saveUser } from '../../src/repositories/user';
import { prisma, server } from '../../src/app';
import { User } from '../../src/models/User';
import { insertFakeUser } from '../utils/functions.utils';


beforeAll(async () => {
    await prisma.email.deleteMany();
    await prisma.user.deleteMany();
});

describe('findByUsername', () => {
  test('It should return a user when found by username', async () => {
    await insertFakeUser();
    const result = await findByUsername('testuser');

    expect(result?.username).toBe('testuser');
  });

  test('It should return null when user is not found', async () => {

    const result = await findByUsername('nonexistentUser');
    
    expect(result).toBeNull();
  });
});

describe('saveUser', () => {
  test('It should save a user', async () => {
    const user = new User('testuser2', 'testpassword', 'Argentina', 'Test', 'User');

    const result = await saveUser(user);
    
    expect(typeof result).toBe('number');
  });
});

afterAll(async () => {
    prisma.user.deleteMany;
    prisma.email.deleteMany;
    await prisma.$disconnect();
    server.close();
});