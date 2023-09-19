import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { emailController } from "../controllers/email";
import { checkBody } from "../middleware/log";

const router = Router();

router.post("/send", checkBody(), checkJwt('USER'), emailController);

export { router };