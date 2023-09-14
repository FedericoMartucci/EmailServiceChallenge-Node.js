 import { sign, verify } from "jsonwebtoken";


 const JWT_SECRET = process.env.JWT_SECRET || "SECRET";
 const generateToken = (username: string) => {
   const jwt = sign({username}, JWT_SECRET, {expiresIn: "1h"});
   return jwt;
 };

 const verifyToken = (token: string) => {
    return verify(token, JWT_SECRET);
 }

 export { generateToken, verifyToken };