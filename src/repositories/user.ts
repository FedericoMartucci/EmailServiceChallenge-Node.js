import { User } from "../models/User";
import { Role } from "../models/Role";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findByUsername(username: string): Promise<User | null> {
    try {

    const result = await prisma.user.findFirstOrThrow({
      where: {
        username: {
            equals: username,
        },
      },
      select: {
        id: true,
        username: true,
        password: true,
        country: true,
        firstname: true,
        lastname: true,
        role: true,
      },
    });
    const role: Role = result.role as Role; 
    return new User(result.username, result.password, result.country || '', result.firstname || '', result.lastname || '', role, result.id);
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

async function saveUser(user: User) {
    try {
    const result = await prisma.user.create({
        data: {
            username: user.username,
            password: user.password,
            country: user.country,
            firstname: user.firstname,
            lastname: user.lastname,
        }
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { findByUsername, saveUser };