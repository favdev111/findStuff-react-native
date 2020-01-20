import { Router } from "express";
import userController from "../controllers/user.controller";
import { tokenValidation } from "../middlewares/verifyToken";

class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", tokenValidation, userController.getUsers);
    this.router.get("/:username", tokenValidation, userController.getUser);
    this.router.post("/", tokenValidation, userController.createUser);
    this.router.put("/:username", tokenValidation, userController.updateUser);
    this.router.delete(
      "/:username",
      tokenValidation,
      userController.deleteUser
    );
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
