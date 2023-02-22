import express from "express";
import { registerController,loginController,userController,refreshController,productController } from "../controller";
import auth from '../middlewares/auth.js'
import admin from '../middlewares/admin.js'

const router = express.Router();

router.post("/register", registerController.register); // register user routes
router.post("/login", loginController.login); // login user routes
router.get("/me",auth ,userController.me); // me user routes
router.post('/refresh',refreshController.refresh) // refresh_token route
router.post('/logout',auth ,loginController.logout) // logout route

//===================================== Poduct Routes =======================================================//

router.post("/products",[auth,admin], productController.store); // create product routes
router.put("/products/:id",[auth,admin], productController.update); // update product routes
router.delete("/products/:id",[auth,admin], productController.destroy); // delete product routes
router.get("/products/", productController.index) // get all product routes
router.get("/products/:id", productController.show) // get single product routes



//===================================== User Routes =======================================================//

 
export default router;
