import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";

import uploadRoutes from "./routes/uploadRoutes";
import downloadRoutes from "./routes/downloadRoutes";

import indexRoutes from "./routes/indexRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import newsRoutes from "./routes/newsRoutes";
import profileRoute from "./routes/profileRoutes";
import contactRoutes from "./routes/contactRoutes";
import tagRoutes from "./routes/tagRoutes";
import stuffpostRoutes from "./routes/stuffpostRoutes";
import stuffpostRoutes2 from "./routes/stuffpostRoutes2";

import messageRoute from "./routes/messageRoutes";

import userRoutes2 from "./routes/userRoutes2";

class Server {
  public app: express.Application;
  // public io: express.Application;

  constructor() {
    this.app = express();

    // this.io = require("socket.io")(this.app);

    this.config();
    this.routes();
    // this.io_routes();
  }

  config() {
    // db
    const MONGO_URI = "mongodb://localhost/find-stuff";
    mongoose.set("useFindAndModify", true);
    mongoose
      .connect(process.env.MONGODB_URI || MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(db => console.log("DB is connected"));

    // settings
    this.app.set("port", process.env.PORT || 8000);

    // middlewares
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  routes() {
    this.app.use(indexRoutes);

    this.app.use("/auth", authRoutes);

    this.app.use("/upload", uploadRoutes);
    this.app.use("/download", downloadRoutes);

    this.app.use("/api/user", userRoutes);
    this.app.use("/api/post", postRoutes);
    this.app.use("/api/notification", notificationRoutes);
    this.app.use("/api/news", newsRoutes);
    this.app.use("/api/tag", tagRoutes);
    this.app.use("/api/contact", contactRoutes);
    this.app.use("/api/stuffpost", stuffpostRoutes);
    this.app.use("/api/message", messageRoute);
    this.app.use("/api/profile", profileRoute);

    ////////////////////////////////////////////////////////////////////////

    this.app.use("/api2/user", userRoutes2);
    this.app.use("/api2/stuffpost", stuffpostRoutes2);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
