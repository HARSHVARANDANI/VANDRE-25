import { Router } from "express";
import { logout, signup } from "../controller/user.controller.js";
import { login } from "../controller/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { addproducts, listAllProducts } from "../controller/product.controller.js";
import { createBill, getAllBills } from "../controller/billing.controller.js";
const userRouter=Router();


// user/signup
userRouter.route("/signup").post(signup);

// user/login
userRouter.route("/login").post(login);

// user/logout
userRouter.route("/logout").post(verifyjwt,logout)
userRouter.route("/addProducts").post(verifyjwt,addproducts)
userRouter.route("/getAllProducts").get(verifyjwt,listAllProducts)


userRouter.route("/createBill").post(verifyjwt,createBill)
userRouter.route("/getAllBills").get(verifyjwt,getAllBills)



export default userRouter;