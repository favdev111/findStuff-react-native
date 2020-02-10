import { Router } from "express";
import newsController from "../controllers/news.controller";
import { tokenValidation } from "../middlewares/verifyToken";
class NewsRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", tokenValidation, newsController.getItems);
    this.router.get("/:url", tokenValidation, newsController.getItem);
    this.router.post("/", tokenValidation, newsController.createItem);
    this.router.put("/:url", tokenValidation, newsController.updateItem);
    this.router.delete("/:url", tokenValidation, newsController.deleteItem);
  }
}

const itemRoutes = new NewsRoutes();
export default itemRoutes.router;
