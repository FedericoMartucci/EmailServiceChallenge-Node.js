import Mailjet from 'node-mailjet';
import { EmailRequest } from '../models/EmailRequest';
import { Provider } from './Provider';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC || '',
    apiSecret: process.env.MJ_APIKEY_PRIVATE || ''
});

const API_KEY = process.env.MG_APIKEY || '';
const DOMAIN = process.env.MG_DOMAIN || '';

class ProviderImpl implements Provider{

    sendWithMailgun = async (email: EmailRequest): Promise<void> => {
        const mailgun = new Mailgun(formData);
        const messageData = {
            from: email.fromEmail,
            to: email.toEmail,
            subject: email.subject,
            text: email.text
        };
        
        const client = mailgun.client({username: 'api', key: API_KEY});
        try{
            await client.messages.create(DOMAIN, messageData)
        }catch(err){
            throw err; 
        }
    };
    
    sendWithMailjet = async (email: EmailRequest): Promise<void> => {
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
}

export { ProviderImpl };