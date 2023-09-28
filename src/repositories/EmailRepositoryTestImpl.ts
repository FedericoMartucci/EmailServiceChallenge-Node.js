import { prisma } from "../app";
import { StatsUser } from "../models/StatsUser";
import { Email } from "../models/Email";
import { EmailRepository } from "./EmailRepository";
class EmailRepositoryTestImpl implements EmailRepository{
    getStats(): Promise<StatsUser[]> {
        throw new Error("Method not implemented.");
    }
    saveEmail(email: Email): number {
        return 1;
    }
    isQuotaExceeded(userEmail: string): boolean {
        return userEmail == "true" ? true : false;
    }


}
export { EmailRepositoryTestImpl };