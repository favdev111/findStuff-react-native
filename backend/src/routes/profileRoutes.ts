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
    this.router.get("/", profileController.getItems);
    this.router.get("/:url", profileController.getItem);
    this.router.post("/", profileController.createItem);
    this.router.put("/:url", profileController.updateItem);
    this.router.delete("/:url", profileController.deleteItem);

    this.router.post("/:url", profileController.getLastItem);
  }
}

const itemRoutes = new ProfileRoutes();
export default itemRoutes.router;
