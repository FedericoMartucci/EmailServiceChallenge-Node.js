import { StatsUser } from "../models/StatsUser";
import { getStats } from "../repositories/email";

const stats = async (): Promise<string | StatsUser[]> => {
  const statsUser: StatsUser[] = await getStats();
  if (!statsUser.length) return "NO_EMAILS_SENT_TODAY";
  return statsUser;
};

export { stats };