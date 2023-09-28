import { EmailRequest } from "../models/EmailRequest";
import { Email } from "../models/Email";
import { EmailService } from "./EmailService";
import { EmailRepositoryTestImpl } from "../repositories/EmailRepositoryTestImpl";
import { ProviderTestImpl } from "../providers/ProviderTestImpl";

class EmailServiceTestImpl implements EmailService {
    
    sendEmail = async (request: EmailRequest): Promise<string> => {
        const emailRepository = new EmailRepositoryTestImpl();
        const provider = new ProviderTestImpl();
        const isExceeded: boolean = emailRepository.isQuotaExceeded(request.fromEmail);
        if(isExceeded) return "QUOTA_EXCEEDED";
            try{
                     provider.sendWithMailjet(request);
            }catch(err){
                try{
                     provider.sendWithMailgun(request);
                }catch(err){
                    throw err;
                }
            }
            emailRepository.saveEmail(new Email(request.fromEmail, request.toEmail, request.subject, request.text));
            return "EMAIL_SENT";
    };
}

export { EmailServiceTestImpl };