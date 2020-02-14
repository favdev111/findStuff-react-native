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
    this.router.get("/:id", tokenValidation, userController.getUser);
    this.router.post("/", tokenValidation, userController.createUser);
    this.router.put("/:id", tokenValidation, userController.updateUser);
    this.router.delete("/:id", tokenValidation, userController.deleteUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
