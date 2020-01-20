import { Router } from "express";
import stuffpostController from "../controllers/stuffpost.controller";

class StuffPostRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", stuffpostController.getItems);
    this.router.get("/:url", stuffpostController.getItem);
    this.router.post("/", stuffpostController.createItem);
    this.router.put("/:url", stuffpostController.updateItem);
    this.router.delete("/:url", stuffpostController.deleteItem);
  }
}

const itemRoutes = new StuffPostRoutes();
export default itemRoutes.router;
