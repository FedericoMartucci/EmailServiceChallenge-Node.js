import { User } from "../models/User";
import { Role } from "../models/Role";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findByUsername(username: string): Promise<User> {
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
    return new User();
  } finally {
    await prisma.$disconnect();
  }
}

async function saveUser(user: User) {
    try {
    const result = await prisma.user.create({
        data: {
            username: user.getUsername(),
            password: user.getPassword(),
            country: user.getCountry(),
            firstname: user.getFirstname(),
            lastname: user.getLastname(),
        }
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { findByUsername, saveUser };