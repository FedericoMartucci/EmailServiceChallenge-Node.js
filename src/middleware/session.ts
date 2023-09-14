import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { RequestExt } from "../models/RequestExt";
const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
    try{
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop;
        const isUser = verifyToken(`${jwt}`) as { username: string };
        if(!isUser){
            res.status(401);
            res.send("NOT_VALID_TOKEN");
        }else{
            next();
        }
    }catch(e){
        console.log(e);
        res.status(400);
        res.send("NOT_VALID_SESSION");
    }
};

export { checkJwt };