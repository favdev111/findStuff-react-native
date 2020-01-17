import { Router } from "express";
import foundcommentController from "../controllers/foundcomment.controller";

class FoundCommentRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", foundcommentController.getItems);
    this.router.get("/:url", foundcommentController.getItem);
    this.router.post("/", foundcommentController.createItem);
    this.router.put("/:url", foundcommentController.updateItem);
    this.router.delete("/:url", foundcommentController.deleteItem);
  }
}

const itemRoutes = new FoundCommentRoutes();
export default itemRoutes.router;
