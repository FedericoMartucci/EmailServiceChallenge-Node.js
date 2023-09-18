import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { emailController } from "../controllers/email";

const router = Router();

router.post("/send", checkJwt('USER'), emailController);

export { router };