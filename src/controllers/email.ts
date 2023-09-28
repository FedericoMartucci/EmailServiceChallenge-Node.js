import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { Email } from "../services/email";
import { EmailRequest } from "../models/EmailRequest";
import { getUsernameFromToken } from "../utils/jwt.handle";
import { EmailServiceImpl } from "../services/EmailServiceImpl";

const emailController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { toEmail, subject, text } = req.body;
        const fromEmail: string | undefined  = getUsernameFromToken(req);
        const email: Email = new Email(new EmailServiceImpl());
        const emailResponse: string = await email.send(new EmailRequest(fromEmail, toEmail, subject, text));
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