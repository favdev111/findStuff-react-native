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
    this.router.get("/", tokenValidation, contactController.getItems);
    this.router.get("/:url", tokenValidation, contactController.getItem);
    this.router.post("/", tokenValidation, contactController.createItem);
    this.router.put("/:url", tokenValidation, contactController.updateItem);
    this.router.delete("/:url", tokenValidation, contactController.deleteItem);
  }
}

const itemRoutes = new NewsRoutes();
export default itemRoutes.router;
