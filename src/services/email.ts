import { EmailRequest } from "../models/EmailRequest";
import { Email } from "../models/Email";
import { isQuotaExceeded, saveEmail } from "../repositories/email";

const sendEmail = async (request: EmailRequest): Promise<string> => {
  const emailsSent: boolean = await isQuotaExceeded(request.fromEmail);
    if(emailsSent) return "QUOTA_EXCEEDED";
    //TODO implement email providers
    // try{
    //     sendWithMailjet(request);
    // }catch(err){
    //     try{
    //         sendWithMailgun(request);
    //     }catch(err){
    //         return "ERROR_SENDING_EMAIL";
    //     }
    // }
    saveEmail(new Email(request.fromEmail, request.toEmail, request.subject, request.text));
    return "EMAIL_SENT";
};

export { sendEmail };