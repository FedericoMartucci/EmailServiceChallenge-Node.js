import { EmailRequest } from "../models/EmailRequest";
import { Email } from "../models/Email";
import { isQuotaExceeded, saveEmail } from "../repositories/email";
import { sendWithMailjet } from "../providers/mailjet";
import { sendWithMailgun } from "../providers/mailgun";

const sendEmail = async (request: EmailRequest): Promise<string> => {
  const emailsSent: boolean = await isQuotaExceeded(request.fromEmail);
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
    saveEmail(new Email(request.fromEmail, request.toEmail, request.subject, request.text));
    return "EMAIL_SENT";
};

export { sendEmail };