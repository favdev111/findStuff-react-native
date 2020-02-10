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
    this.router.get("/", newsController.getItems);
    this.router.get("/:url", newsController.getItem);
    this.router.post("/", newsController.createItem);
    this.router.put("/:url", newsController.updateItem);
    this.router.delete("/:url", newsController.deleteItem);
  }
}

const itemRoutes = new NewsRoutes();
export default itemRoutes.router;
