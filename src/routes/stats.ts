import { Router } from "express";
import { statsController } from "../controllers/stats";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get('/', checkJwt('ADMIN'), statsController);

export { router };