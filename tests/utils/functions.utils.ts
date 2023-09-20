import { prisma } from "../../src/app";
import { User } from "../../src/models/User";

const fakeEmails = [
    { fromEmail: 'user1@example.com', toEmail: 'user2@example.com', subject: 'Testing', text: 'This is a test' },
    { fromEmail: 'user1@example.com', toEmail: 'user2@example.com', subject: 'Testing', text: 'This is a test' },
    { fromEmail: 'user1@example.com', toEmail: 'user2@example.com', subject: 'Testing', text: 'This is a test' },
    { fromEmail: 'user2@example.com', toEmail: 'user1@example.com', subject: 'Testing', text: 'This is a test' },
    { fromEmail: 'user2@example.com', toEmail: 'user1@example.com', subject: 'Testing', text: 'This is a test' },
  ];

async function insertFakeEmails(): Promise<void> {
    try {
        await prisma.email.createMany({
            data: fakeEmails,
          });
    }catch(error){
        console.error('Error inserting fake emails:', error);
    }
}

async function insertFakeUser(): Promise<void> {
    try {
        await prisma.user.createMany({
            data: new User('testuser', 'testpassword', 'Argentina', 'Test', 'Use'),
          });
    }catch(error){
        console.error('Error inserting fake emails:', error);
    }
}

export { insertFakeEmails, insertFakeUser };