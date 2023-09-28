import { EmailRequest } from '../models/EmailRequest';
import { Provider } from './Provider';

class ProviderTestImpl implements Provider{

    sendWithMailgun = (email: EmailRequest): string => {
        if(email.fromEmail === "errorTest") throw new Error();
        return "EMAIL_SENT_WITH_MAILGUN";
    };
    
    sendWithMailjet = (email: EmailRequest): string => {
        if(email.fromEmail === "errorTest") throw new Error();
        return "EMAIL_SENT_WITH_MAILJET";
    };
}

export { ProviderTestImpl };