import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { sendEmail } from "../services/email";
import { Email } from "../models/Email";
import { EmailRequest } from "../models/EmailRequest";

const emailController = async ({body}: Request, res: Response): Promise<void> => {
    try {
        const { fromEmail, toEmail, subject, text } = body;
        const emailResponse: string = await sendEmail(new EmailRequest(fromEmail, toEmail, subject, text));
        if (emailResponse === 'QUOTA_EXCEEDED') {
            res.status(403);
            res.send(emailResponse);
        } else {
            res.send(emailResponse);
        }
    } catch (err) {
        handleHttp(res, 'ERROR_SENDING_EMAIL');
    }
};

export { emailController };