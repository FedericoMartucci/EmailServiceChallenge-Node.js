
export class Email{
    id: number | undefined;
    dateOfEmail: Date;
    fromEmail: string;
    toEmail: string;
    subject: string;
    text: string; 

    constructor(fromEmail: string = "", 
                toEmail: string = "", 
                subject: string = "", 
                text: string = "",
                dateOfEmail: Date = new Date(),
                id?: number){
        this.id = id;
        this.dateOfEmail = dateOfEmail;
        this.fromEmail = fromEmail;
        this.toEmail = toEmail;
        this.subject = subject;
        this.text = text;
    }

}