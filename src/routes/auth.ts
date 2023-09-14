import { Router } from "express";
import { registerController, loginController } from "../controllers/auth";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);

export { router };