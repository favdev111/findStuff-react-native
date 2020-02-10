import { Router } from "express";
import messageController from "../controllers/message.controller";
import { tokenValidation } from "../middlewares/verifyToken";
class MessageRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", messageController.getItems);
    this.router.get("/:url", messageController.getItem);
    this.router.post("/", messageController.createItem);
    this.router.put("/:url", messageController.updateItem);
    this.router.delete("/:url", messageController.deleteItem);
  }
}

const itemRoutes = new MessageRoutes();
export default itemRoutes.router;
