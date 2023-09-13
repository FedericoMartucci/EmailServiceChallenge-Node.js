export class StatsUser {
    private username: string;
    private emailsSent: number;
  
    constructor(username: string = "", emailsSent: number = 0) {
      this.username = username;
      this.emailsSent = emailsSent;
    }
  
    get getUsername(): string {
      return this.username;
    }
  
    set setUsername(username: string) {
      this.username = username;
    }
  
    get getEmailsSent(): number {
      return this.emailsSent;
    }
  
    set setEmailsSent(emailsSent: number) {
      this.emailsSent = emailsSent;
    }
}