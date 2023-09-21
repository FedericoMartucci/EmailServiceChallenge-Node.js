import Mailjet from 'node-mailjet';
import { EmailRequest } from '../../src/models/EmailRequest';
import { sendWithMailjet } from '../../src/providers/mailjet'; // Reemplaza con la ruta correcta

jest.mock('node-mailjet', () => {
  return jest.fn().mockReturnValue({
    post: jest.fn(() => ({
      request: jest.fn().mockResolvedValue('Email sent successfully')
    }))
  });
});
const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC || '',
    apiSecret: process.env.MJ_APIKEY_PRIVATE || ''
  });

describe('sendWithMailjet', () => {
  test('It should send an email using Mailjet', async () => {
    const email: EmailRequest = new EmailRequest('test@example.com', 'recipient@example.com', 'Testing', 'This is a test email.');

    await sendWithMailjet(email);

    expect(mailjet.post).toHaveBeenCalledWith('send', { version: 'v3.1' });
    console.log(mailjet.post);
  });
});