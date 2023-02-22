import express from "express";
import { registerController,loginController,userController,refreshController } from "../controller";
import auth from '../middlewares/auth.js'

const router = express.Router();

router.post("/register", registerController.register); // register user routes
router.post("/login", loginController.login); // login user routes
router.get("/me",auth ,userController.me); // me user routes
router.post('/refresh',refreshController.refresh) // refresh_token route
router.post('/logout',auth ,loginController.logout) // logout route

export default router;
