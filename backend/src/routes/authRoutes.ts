import { Router } from "express";
import authController from "../controllers/auth.controller";

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // for admin
    this.router.post("/register", authController.register);
    this.router.post("/resetpass", authController.resetpass);
    this.router.post("/login", authController.login);

    // for app
    this.router.post("/signup", authController.signup);
    this.router.post("/resetpwd", authController.resetpwd);
    this.router.post("/signin", authController.signin);

    this.router.post("/otp", authController.otp);
    this.router.post("/device", authController.device);
  }
}

const authRoutes = new AuthRoutes();
authRoutes.routes();

export default authRoutes.router;
