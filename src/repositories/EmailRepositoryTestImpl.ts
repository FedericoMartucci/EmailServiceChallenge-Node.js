import { prisma } from "../app";
import { StatsUser } from "../models/StatsUser";
import { Email } from "../models/Email";
import { EmailRepository } from "./EmailRepository";
class EmailRepositoryTestImpl implements EmailRepository{
    getStats(emptyStats: boolean): StatsUser[] {
        if(emptyStats){
            const stats: StatsUser[] = [
                new StatsUser('user1@example.com', 3),
                new StatsUser('user2@example.com', 2)
            ];
            return stats;
        }
        return []; 
    }
    saveEmail(email: Email): number {
        return 1;
    }
    isQuotaExceeded(userEmail: string): boolean {
        return userEmail == "true" ? true : false;
    }


}
export { EmailRepositoryTestImpl };