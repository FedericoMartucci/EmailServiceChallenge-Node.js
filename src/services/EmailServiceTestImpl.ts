import { EmailRequest } from "../models/EmailRequest";
import { Email } from "../models/Email";
import { sendWithMailjet } from "../providers/mailjet";
import { sendWithMailgun } from "../providers/mailgun";
import { EmailService } from "./EmailService";
import { EmailRepositoryTestImpl } from "../repositories/EmailRepositoryTestImpl";

class EmailServiceTestImpl implements EmailService {
    
    sendEmail = async (request: EmailRequest): Promise<string> => {
        const emailRepository = new EmailRepositoryTestImpl();
        const isExceeded: boolean = emailRepository.isQuotaExceeded(request.fromEmail);
        if(isExceeded) return "QUOTA_EXCEEDED";
            try{
                     sendWithMailjet(request);
            }catch(err){
                console.log(err);
                try{
                     sendWithMailgun(request);
                }catch(err){
                    console.log(err);
                    throw err;
                }
            }
            emailRepository.saveEmail(new Email(request.fromEmail, request.toEmail, request.subject, request.text));
            return "EMAIL_SENT";
    };
}

export { EmailServiceTestImpl };