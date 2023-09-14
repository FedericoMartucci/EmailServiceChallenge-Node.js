
export class Email{
    private id: number;
    private dateOfEmail: Date;
    private fromEmail: string;
    private toEmail: string;
    private subject: string;
    private text: string; 

    constructor(id: number = 0, 
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

    //Getters
    getId(): number{
        return this.id;
    }
    
    getDateOfEmail(): Date{
        return this.dateOfEmail;
    }
    
    getFromEmail(): string{
        return this.fromEmail;
    }
    
    getToEmail(): string{
        return this.toEmail;
    }
    
    getSubject(): string{
        return this.subject;
    }
    
    getText(): string{
        return this.text;
    }

    //Setters
    setId(id: number){
        this.id = id;
    }

    setDateOfEmail(dateOfEmail: Date){
        this.dateOfEmail = dateOfEmail;
    }

    setFromEmail(fromEmail: string){
        this.fromEmail = fromEmail;
    }

    setToEmail(toEmail: string){
        this.toEmail = toEmail;
    }
        
    setSubject(subject: string){
        this.subject = subject;
    }
        
    setText(text: string){
        this.text = text;
    }
}