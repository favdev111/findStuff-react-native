import { Router } from "express";
import notificationController from "../controllers/notification.controller";
import { tokenValidation } from "../middlewares/verifyToken";
class NotificationRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", tokenValidation, notificationController.getItems);
    this.router.get("/:url", tokenValidation, notificationController.getItem);
    this.router.post("/", tokenValidation, notificationController.createItem);
    this.router.put(
      "/:url",
      tokenValidation,
      notificationController.updateItem
    );
    this.router.delete(
      "/:url",
      tokenValidation,
      notificationController.deleteItem
    );
  }
}

const itemRoutes = new NotificationRoutes();
export default itemRoutes.router;
