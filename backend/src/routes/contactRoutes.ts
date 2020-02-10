import { Router } from "express";
import contactController from "../controllers/contact.controller";
import { tokenValidation } from "../middlewares/verifyToken";
class NewsRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", contactController.getItems);
    this.router.get("/:url", contactController.getItem);
    this.router.post("/", contactController.createItem);
    this.router.put("/:url", contactController.updateItem);
    this.router.delete("/:url", contactController.deleteItem);
  }
}

const itemRoutes = new NewsRoutes();
export default itemRoutes.router;
