import { NextFunction, Response } from "express";
import { getToken, verifyToken } from "../utils/jwt.handle";
import { RequestExt } from "../models/RequestExt";
import { Role } from "../models/Role";
import { JwtPayload } from "jsonwebtoken";
const checkJwt = (allowedRole: string): any => {
    return (req: RequestExt, res: Response, next: NextFunction): void => {
        try{
            const jwt = getToken(req);
            if(!jwt){
                res.status(401);
                res.send("NO_TOKEN_PROVIDED");
                return;
            }
            const payload: JwtPayload | string = verifyToken(`${jwt}`) as { role: Role };
            if (payload && (payload.role === allowedRole || payload.role === 'ADMIN')) {
                next();
              } else {
                res.status(403);
                res.send('FORBIDDEN');
              }
            
        }catch(e){
            console.log(e);
            res.status(400);
            res.send("INVALID_TOKEN");
        }
    };
};

export { checkJwt };