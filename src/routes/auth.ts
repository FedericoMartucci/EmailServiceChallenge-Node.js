import { Router } from "express";
import { registerController, loginController } from "../controllers/auth";
import { checkBody } from "../middleware/log";

const router = Router();

router.post("/login", checkBody(), loginController);
router.post("/register", checkBody(), registerController);

export { router };