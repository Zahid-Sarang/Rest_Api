import express from "express";
import { registerController,loginController } from "../controller";

const router = express.Router();

router.post("/register", registerController.register); // register user routes
router.post("/login", loginController.login); // login user routes

export default router;
