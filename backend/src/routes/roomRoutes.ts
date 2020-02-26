import { Router } from "express";
import roomController from "../controllers/room.controller";
import { tokenValidation } from "../middlewares/verifyToken";
class RoomRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", roomController.getItems);
    this.router.get("/:url", roomController.getItem);
    this.router.post("/", roomController.createItem);
    this.router.put("/:url", roomController.updateItem);
    this.router.delete("/:url", roomController.deleteItem);
  }
}

const itemRoutes = new RoomRoutes();
export default itemRoutes.router;
