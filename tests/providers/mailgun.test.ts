import { EmailRequest } from '../../src/models/EmailRequest';
import { ProviderTestImpl } from '../../src/providers/ProviderTestImpl';

const provider = new ProviderTestImpl();

describe('sendWithMailgun', () => {
  test('It should send an email using Mailgun.', async () => {
    const email: EmailRequest = new EmailRequest('test@example.com', 'recipient@example.com', 'Testing', 'This is a test email.');

    const result =  provider.sendWithMailgun(email);
    expect(result).toBe("EMAIL_SENT_WITH_MAILGUN");
  });
  test('It should throw an error when something went wrong.', async () => {
    const email: EmailRequest = new EmailRequest('errorTest', 'recipient@example.com', 'Testing', 'This is a test email.');

    expect(() => provider.sendWithMailgun(email)).toThrow(new Error());
  });
});

