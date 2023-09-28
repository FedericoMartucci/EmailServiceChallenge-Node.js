import { EmailRequest } from "../models/EmailRequest";
import { Email } from "../models/Email";
import { EmailRepositoryImpl } from "../repositories/EmailRepositoryImpl";
import { sendWithMailjet } from "../providers/mailjet";
import { sendWithMailgun } from "../providers/mailgun";
import { EmailService } from "./EmailService";
import { EmailRepository } from "../repositories/EmailRepository";

class EmailServiceImpl implements EmailService {

    sendEmail = async (request: EmailRequest): Promise<string> => {
        const emailRepository = new EmailRepositoryImpl();
        const emailsSent: boolean = await emailRepository.isQuotaExceeded(request.fromEmail);
        if(emailsSent) return "QUOTA_EXCEEDED";
            try{
                    await sendWithMailjet(request);
            }catch(err){
                console.log(err);
                try{
                    await sendWithMailgun(request);
                }catch(err){
                    console.log(err);
                    throw err;
                }
                }
            emailRepository.saveEmail(new Email(request.fromEmail, request.toEmail, request.subject, request.text));
            return "EMAIL_SENT";
    };
}

export { EmailServiceImpl };