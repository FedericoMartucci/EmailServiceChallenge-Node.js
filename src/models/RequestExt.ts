import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { Role } from "./Role";

export interface RequestExt extends Request {
  role?: { role: Role } | JwtPayload ;
}