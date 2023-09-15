 import { Jwt, JwtPayload, sign, verify } from "jsonwebtoken";
import { Role } from "../models/Role";


 const JWT_SECRET = process.env.JWT_SECRET || "SECRET";
 const generateToken = (role: Role): string => {
   const jwt: string = sign({role}, JWT_SECRET, {expiresIn: "1h"});
   return jwt;
 };

 const verifyToken = (token: string): string | JwtPayload => {
    return verify(token, JWT_SECRET) as JwtPayload;
 }

 export { generateToken, verifyToken };