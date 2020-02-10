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
    this.router.get("/", tokenValidation, messageController.getItems);
    this.router.get("/:url", tokenValidation, messageController.getItem);
    this.router.post("/", tokenValidation, messageController.createItem);
    this.router.put("/:url", tokenValidation, messageController.updateItem);
    this.router.delete("/:url", tokenValidation, messageController.deleteItem);
  }
}

const itemRoutes = new MessageRoutes();
export default itemRoutes.router;
