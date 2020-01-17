import { Router } from "express";
import lostcommentController from "../controllers/lostcomment.controller";

class LostCommentRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", lostcommentController.getItems);
    this.router.get("/:url", lostcommentController.getItem);
    this.router.post("/", lostcommentController.createItem);
    this.router.put("/:url", lostcommentController.updateItem);
    this.router.delete("/:url", lostcommentController.deleteItem);
  }
}

const itemRoutes = new LostCommentRoutes();
export default itemRoutes.router;
