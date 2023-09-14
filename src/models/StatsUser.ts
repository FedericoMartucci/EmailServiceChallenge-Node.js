export class StatsUser {
    private username: string;
    private emailsSent: number;
  
    constructor(username: string = "", emailsSent: number = 0){
      this.username = username;
      this.emailsSent = emailsSent;
    }
  
    //Getters
    getUsername(): string{
      return this.username;
    }
  
    getEmailsSent(): number{
      return this.emailsSent;
    }

    //Setters
    setUsername(username: string){
      this.username = username;
    }

    setEmailsSent(emailsSent: number){
      this.emailsSent = emailsSent;
    }
}