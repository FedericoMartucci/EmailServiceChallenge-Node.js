import { EmailRequest } from "../models/EmailRequest";
import { Email } from "../models/Email";
import { EmailRepositoryImpl } from "../repositories/EmailRepositoryImpl";
import { EmailService } from "./EmailService";
import { ProviderImpl } from "../providers/ProviderImpl";

class EmailServiceImpl implements EmailService {

    sendEmail = async (request: EmailRequest): Promise<string> => {
        const emailRepository = new EmailRepositoryImpl();
        const provider = new ProviderImpl();
        const emailsSent: boolean = await emailRepository.isQuotaExceeded(request.fromEmail);
        if(emailsSent) return "QUOTA_EXCEEDED";
            try{
                    await provider.sendWithMailjet(request);
            }catch(err){
                console.log(err);
                try{
                    await provider.sendWithMailgun(request);
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