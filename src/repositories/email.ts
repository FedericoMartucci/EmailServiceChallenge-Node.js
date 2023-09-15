import { PrismaClient } from "@prisma/client";
import { StatsUser } from "../models/StatsUser";
import { EmailRequest } from "../models/EmailRequest";
import { Email } from "../models/Email";

const prisma = new PrismaClient();
async function getStats(): Promise<StatsUser[]> {
    try {
    const emailCounts = new Map<string, number>();
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const result = await prisma.email.findMany({
      where: {
        dateOfEmail: {
            gte: currentDate,
            lt: new Date(currentDate.getTime() + 86400000),
        },
      },
    });
    for (const email of result) {
        const fromEmail = email.fromEmail;
        emailCounts.set(fromEmail, (emailCounts.get(fromEmail) || 0) + 1);
    }

    const stats: StatsUser[] = Array.from(emailCounts.entries()).map(([fromEmail, emailsSent]) =>
      new StatsUser(fromEmail, emailsSent)
    );
  
    return stats;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function saveEmail(email: Email) {
    try {
    const result = await prisma.email.create({
        data: {
            fromEmail: email.fromEmail,
            toEmail: email.toEmail,
            subject: email.subject,
            text: email.text,
            dateOfEmail: email.dateOfEmail,
        }
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function isQuotaExceeded(userEmail: string): Promise<boolean>{
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const result = await prisma.email.findMany({
      where: {
        fromEmail: {
          equals: userEmail,
        },
        dateOfEmail: {
            gte: currentDate,
            lt: new Date(currentDate.getTime() + 86400000),
        },
      },
    });
    if(result.length > 1000)
      return true;
    return false;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { getStats, saveEmail, isQuotaExceeded };