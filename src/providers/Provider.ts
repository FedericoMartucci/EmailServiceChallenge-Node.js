import { EmailRequest } from "../models/EmailRequest";

interface Provider {
    sendWithMailgun(email: EmailRequest): Promise<void> | string;
    sendWithMailjet(email: EmailRequest): Promise<void> | string;
}

export { Provider };