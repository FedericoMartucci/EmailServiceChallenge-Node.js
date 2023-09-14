import { Router } from "express";
import { stats } from "../controllers/stats";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get('/', checkJwt, stats);

export { router };