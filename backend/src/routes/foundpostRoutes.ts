import { Router } from "express";
import foundpostController from "../controllers/foundpost.controller";

class FoundPostRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", foundpostController.getItems);
    this.router.get("/:url", foundpostController.getItem);
    this.router.post("/", foundpostController.createItem);
    this.router.put("/:url", foundpostController.updateItem);
    this.router.delete("/:url", foundpostController.deleteItem);

    this.router.post("/:url", foundpostController.increaseBrowseCnt);
  }
}

const itemRoutes = new FoundPostRoutes();
export default itemRoutes.router;
