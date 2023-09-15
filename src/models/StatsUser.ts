export class StatsUser {
    username: string;
    emailsSent: number;
  
    constructor(username: string = "", emailsSent: number = 0){
      this.username = username;
      this.emailsSent = emailsSent;
    }

}