import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Role } from "../models/Role";
import { Request } from "express";
import { RequestExt } from "../models/RequestExt";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";
const generateToken = (role: Role, user: string): string => {
  const jwt: string = sign({role, user}, JWT_SECRET, {expiresIn: "1h"});
  return jwt;
};

const verifyToken = (token: string): string | JwtPayload => {
  return verify(token, JWT_SECRET) as JwtPayload;
};

const getToken = (request: Request): string | undefined => {
  const jwtByUser = request.headers.authorization || '';
  const jwt = jwtByUser.split(' ').pop();
  return jwt;
}

const getUsernameFromToken = (request: RequestExt): string | undefined => {
  const token = getToken(request);
  if(!token) return undefined;
  const payload = verifyToken(token) as {user: string};
  return payload.user;
};



 export { generateToken, verifyToken, getUsernameFromToken, getToken };