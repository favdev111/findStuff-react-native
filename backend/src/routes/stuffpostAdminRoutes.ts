import { Router } from "express";
import stuffPostAdminController from "../controllers/stuffpost-admin.controller";
import { tokenValidation } from "../middlewares/verifyToken";

class StuffPostRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", stuffPostAdminController.getItems);
    this.router.get("/:url", stuffPostAdminController.getItem);
    this.router.post("/", stuffPostAdminController.createItem);
    this.router.put("/:url", stuffPostAdminController.updateItem);
    this.router.delete(
      "/:url",
      tokenValidation,
      stuffPostAdminController.deleteItem
    );
  }
}

const itemRoutes = new StuffPostRoutes();
export default itemRoutes.router;
