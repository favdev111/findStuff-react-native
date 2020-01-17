import { Router, Request, Response } from "express";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

class UploadRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/file", upload.single("file"), async (req, res) => {
      try {
        res.send({ file: req.file });
      } catch (err) {
        res.sendStatus(400);
      }
    });

    this.router.post("/photo", upload.array("photo", 6), async (req, res) => {
      try {
        res.send({ photo: req.files });
      } catch (err) {
        res.sendStatus(400);
      }
    });
  }
}

const uploadRoutes = new UploadRoutes();
uploadRoutes.routes();

export default uploadRoutes.router;
