
export class Email{
    private id: number;
    private dateOfEmail: Date;
    private fromEmail: string;
    private toEmail: string;
    private subject: string;
    private text: string; 

    constructor( id: number = 0, 
                        dateOfEmail: Date = new Date(), 
                        fromEmail: string = "", 
                        toEmail: string = "", 
                        subject: string = "", 
                        text: string = ""){
        this.id = id;
        this.dateOfEmail = dateOfEmail;
        this.fromEmail = fromEmail;
        this.toEmail = toEmail;
        this.subject = subject;
        this.text = text;
    }
    getId(): number {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
     getDateOfEmail(): Date {
        return this.dateOfEmail;
    }
    
    setDateOfEmail(dateOfEmail: Date) {
        this.dateOfEmail = dateOfEmail;
    }
    
    getFromEmail(): string {
        return this.fromEmail;
    }
    
    setFromEmail(fromEmail: string) {
        this.fromEmail = fromEmail;
    }
    
    getToEmail(): string {
        return this.toEmail;
    }
    
    setToEmail(toEmail: string) {
        this.toEmail = toEmail;
    }
    
    getSubject(): string {
        return this.subject;
    }
    
    setSubject(subject: string) {
        this.subject = subject;
    }
    
    getText(): string {
        return this.text;
    }
    
    setText(text: string) {
        this.text = text;
    }
}