import Mailjet from 'node-mailjet';
import { EmailRequest } from '../models/EmailRequest';

const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC || '',
    apiSecret: process.env.MJ_APIKEY_PRIVATE || ''
  });
  const sendWithMailjet = async (email: EmailRequest): Promise<void> => {
    try{
        const request = await mailjet
                .post('send', { version: 'v3.1' })
                .request({
                Messages: [
                    {
                    From: {
                        Email: email.fromEmail
                    },
                    To: [
                        {
                        Email: email.toEmail
                        }
                    ],
                    Subject: email.subject,
                    TextPart: email.text
                    }
                ]
                });
    }catch(err) {
        throw err; 
    }
};

export { sendWithMailjet };