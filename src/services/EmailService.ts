import { EmailRequest } from "../models/EmailRequest";

interface EmailService{
    sendEmail(request: EmailRequest): Promise<string>; 
}

export { EmailService };