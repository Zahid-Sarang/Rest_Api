import express from "express";
import { registerController } from "../controller";

const router = express.Router();

router.post("/register", registerController.register); // register user routes

export default router;
