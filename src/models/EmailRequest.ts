export class EmailRequest{
    fromEmail: string;
    toEmail: string;
    subject: string;
    text: string; 

    constructor(fromEmail: string = "", 
                toEmail: string = "", 
                subject: string = "", 
                text: string = ""){
        this.fromEmail = fromEmail;
        this.toEmail = toEmail;
        this.subject = subject;
        this.text = text;
    }

    emptyParameters(): boolean{
        return this.fromEmail == "" || this.toEmail == "" || this.subject == "" || this.text == "";
    }

}