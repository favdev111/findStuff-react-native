import { Router } from "express";
import profileController from "../controllers/profile.controller";
import { tokenValidation } from "../middlewares/verifyToken";
class ProfileRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", tokenValidation, profileController.getItems);
    this.router.get("/:url", tokenValidation, profileController.getItem);
    this.router.post("/", tokenValidation, profileController.createItem);
    this.router.put("/:url", tokenValidation, profileController.updateItem);
    this.router.delete("/:url", tokenValidation, profileController.deleteItem);

    this.router.post("/:url", tokenValidation, profileController.getLastItem);
  }
}

const itemRoutes = new ProfileRoutes();
export default itemRoutes.router;
