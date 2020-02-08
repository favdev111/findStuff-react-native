import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";

import http from "http";
import https from "https";
import fs from "fs";

import uploadRoutes from "./routes/uploadRoutes";
import downloadRoutes from "./routes/downloadRoutes";

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

import SocketIOServer from "socket.io";

import initializeSocketIO from "./socket";

const app = express();
const server = new http.Server(
  // {
  //   key: fs.readFileSync("./key.pem"),
  //   cert: fs.readFileSync("./cert.pem"),
  //   passphrase: "123456"
  // },
  app
);
const io = SocketIOServer(server);

app.set("port", process.env.PORT || 8000);

const connectedUsers = {};
initializeSocketIO(io, connectedUsers);

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
////////////////////////////////////////
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});
////////////////////////////////////////
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(cors());
///////////////////////////////////////
app.use("/auth", authRoutes);

app.use("/upload", uploadRoutes);
app.use("/download", downloadRoutes);

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/stuffpost", stuffpostRoutes);
app.use("/api2/stuffpost", stuffpostRoutes2);
app.use("/api/message", messageRoute);
app.use("/api/profile", profileRoute);
app.use("/api2/user", userRoutes2);

server.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
