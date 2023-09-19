import { NextFunction, Request, Response } from "express";
import { isObjectEmpty } from "../utils/error.handle";

const checkBody = (): any => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if(isObjectEmpty(req.body)) {
            res.status(403);
            res.send('PARAMETERS_MISSING');
            return;
        }
        next();  
    };
};

export { checkBody };