import { StatsUser } from "../models/StatsUser";
import { EmailRepositoryImpl } from "../repositories/EmailRepositoryImpl";

const stats = async (): Promise<string | StatsUser[]> => {
  const emailRepository = new EmailRepositoryImpl();
  const statsUser = await emailRepository.getStats();
  if (!statsUser.length) return "NO_EMAILS_SENT_TODAY";
  return statsUser;
};

export { stats };