import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { EmailRequest } from '../models/EmailRequest';

const API_KEY = process.env.MG_APIKEY || '';
const DOMAIN = process.env.MG_DOMAIN || '';
const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: API_KEY});
const sendWithMailgun = async (email: EmailRequest): Promise<void> => {
    const messageData = {
        from: email.fromEmail,
        to: email.toEmail,
        subject: email.subject,
        text: email.text
      };
    try{
        await client.messages.create(DOMAIN, messageData)
    }catch(err){
        throw err; 
    }
};
export { sendWithMailgun };

