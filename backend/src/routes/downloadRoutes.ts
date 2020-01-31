import { Router, Request, Response } from "express";

class DownloadRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/photo", async (req, res) => {
      try {
        await res.download(req.query.path, function(err) {
          if (err) {
            // Handle error, but keep in mind the response may be partially-sent
            // so check res.headersSent
            //res.sendStatus(400);
            console.log(err, "download error");
          } else {
            // decrement a download credit, etc.
          }
        });
      } catch (err) {
        // res.sendStatus(400);
        console.log(err, "download exeption");
      }
    });
  }
}

const downloadRoutes = new DownloadRoutes();
downloadRoutes.routes();

export default downloadRoutes.router;
