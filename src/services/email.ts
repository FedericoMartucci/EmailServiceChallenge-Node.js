import { EmailRequest } from "../models/EmailRequest";
import { EmailService } from "./EmailService";

class Email {
    constructor(private emailService: EmailService) {}

    send = async (emailRequest: EmailRequest): Promise<string> => {
        return await this.emailService.sendEmail(emailRequest);
    }
}

export { Email };