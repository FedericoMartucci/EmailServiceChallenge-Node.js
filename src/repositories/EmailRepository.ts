import { Email } from "../models/Email";
import { StatsUser } from "../models/StatsUser";

interface EmailRepository{
    getStats(emptyStats: boolean): Promise<StatsUser[]> | StatsUser[];
    saveEmail(email: Email): Promise<number> | number;
    isQuotaExceeded(userEmail: string, emailsSent?: number): Promise<boolean> | boolean;
}

export { EmailRepository };