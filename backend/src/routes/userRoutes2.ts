import { Router } from "express";
import userController2 from "../controllers/user.controller2";
import { tokenValidation } from "../middlewares/verifyToken";

class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.put("/:username", tokenValidation, userController2.updateUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
