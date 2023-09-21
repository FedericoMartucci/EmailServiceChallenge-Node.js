import { EmailRequest } from '../../src/models/EmailRequest';
import { sendWithMailgun } from '../../src/providers/mailgun';

describe('sendWithMailgun', () => {
  test('It should send an email using Mailgun', async () => {
    const email: EmailRequest = new EmailRequest('test@example.com', 'recipient@example.com', 'Testing', 'This is a test email.');

    const result = await sendWithMailgun(email, true);
    expect(result).toBeDefined
    expect(result).toHaveProperty('from')
    expect(result).toHaveProperty('to')
    expect(result).toHaveProperty('subject')
    expect(result).toHaveProperty('text')
  });
});

