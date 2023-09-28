import { EmailRequest } from '../../src/models/EmailRequest';
import { ProviderTestImpl } from '../../src/providers/ProviderTestImpl';

const provider = new ProviderTestImpl();

describe('sendWithMailjet', () => {
  test('It should send an email using Mailjet.', async () => {
    const email: EmailRequest = new EmailRequest('test@example.com', 'recipient@example.com', 'Testing', 'This is a test email.');

    const result =  provider.sendWithMailjet(email);
    expect(result).toBe("EMAIL_SENT_WITH_MAILJET");
  });
  test('It should throw an error when something went wrong.', async () => {
    const email: EmailRequest = new EmailRequest('errorTest', 'recipient@example.com', 'Testing', 'This is a test email.');

    expect(() => provider.sendWithMailjet(email)).toThrow(new Error());
  });
});
