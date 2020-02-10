import { Router } from "express";
import stuffpostController from "../controllers/stuffpost.controller";
import { tokenValidation } from "../middlewares/verifyToken";

class StuffPostRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", tokenValidation, stuffpostController.getItems);
    this.router.get("/:url", tokenValidation, stuffpostController.getItem);
    this.router.post("/", tokenValidation, stuffpostController.createItem);
    this.router.put("/:url", tokenValidation, stuffpostController.updateItem);
    this.router.delete(
      "/:url",
      tokenValidation,
      stuffpostController.deleteItem
    );
  }
}

const itemRoutes = new StuffPostRoutes();
export default itemRoutes.router;
