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
    this.router.put("/:id", userController2.updateUser);
    this.router.post("/location", userController2.updateLocation);
    this.router.post("/block", userController2.block);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
