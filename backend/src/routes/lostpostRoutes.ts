import { Router } from "express";
import lostpostController from "../controllers/lostpost.controller";

class LostPostRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", lostpostController.getItems);
    this.router.get("/:url", lostpostController.getItem);
    this.router.post("/", lostpostController.createItem);
    this.router.put("/:url", lostpostController.updateItem);
    this.router.delete("/:url", lostpostController.deleteItem);

    this.router.post("/:url", lostpostController.increaseBrowseCnt);
  }
}

const itemRoutes = new LostPostRoutes();
export default itemRoutes.router;
