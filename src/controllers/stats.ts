import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { stats } from "../services/stats";
import { StatsUser } from "../models/StatsUser";

const statsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const statsResponse: StatsUser[] | string = await stats();
        if (statsResponse === 'NO_EMAILS_SENT_TODAY'){
            res.status(404)
            res.send(statsResponse);
        } else {
            res.send(statsResponse);
        }
    } catch (err) {
        handleHttp(res, 'ERROR_GETTING_STATS');
    }
};

export { statsController };