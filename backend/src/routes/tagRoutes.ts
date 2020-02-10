import { Router } from "express";
import tagController from "../controllers/tag.controller";
import { tokenValidation } from "../middlewares/verifyToken";
class TagRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", tagController.getItems);
    this.router.get("/:url", tagController.getItem);
    this.router.post("/", tagController.createItem);
    this.router.put("/:url", tagController.updateItem);
    this.router.delete("/:url", tagController.deleteItem);
  }
}

const itemRoutes = new TagRoutes();
export default itemRoutes.router;
