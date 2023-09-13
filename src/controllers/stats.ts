import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { getStats } from "../services/stats";
import { StatsUser } from "../models/StatsUser";

const stats = async (req: Request, res: Response) => {
    try {
        const response: StatsUser[] = await getStats();
        res.send(response);
    } catch (err) {
        handleHttp(res, 'ERROR_GET_STATS');
    }
};

export { stats };