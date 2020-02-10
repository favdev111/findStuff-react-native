import { Router } from "express";
import stuffpostController2 from "../controllers/stuffpost.controller2";
import { tokenValidation } from "../middlewares/verifyToken";
class StuffPostRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/browse", stuffpostController2.increaseBrowseCnt);
    this.router.post("/ads", stuffpostController2.ads);
    this.router.post("/likes", stuffpostController2.increaseLikesCnt);
  }
}

const itemRoutes = new StuffPostRoutes();
export default itemRoutes.router;
