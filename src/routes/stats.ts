import { Request, Response, Router } from "express";
import { stats } from "../controllers/stats";

const router = Router();

router.get('/', stats);

export { router };