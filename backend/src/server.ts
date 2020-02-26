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
import stuffpostAdminRoutes from "./routes/stuffpostAdminRoutes";

import messageRoute from "./routes/messageRoutes";
import roomRoute from "./routes/roomRoutes";
import userRoutes2 from "./routes/userRoutes2";

import SocketIOServer from "socket.io";

import initializeSocketIO from "./socket";
import { notify, msg } from "./push";

import authNotificationRoutes from "./routes/authNotificationRoutes";
import authNewsRoutes from "./routes/authNewsRoutes";
import authProfileRoute from "./routes/authProfileRoutes";
import authContactRoutes from "./routes/authContactRoutes";
import authStuffpostRoutes from "./routes/authStuffpostRoutes";

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
  req.notify = notify;
  req.msg = msg;
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

app.use("/api/post", postRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/stuffpost", stuffpostRoutes);
app.use("/admin_api/stuffpost", stuffpostAdminRoutes);
app.use("/api2/stuffpost", stuffpostRoutes2);

app.use("/api/message", messageRoute);
app.use("/api/room", roomRoute);
app.use("/api/profile", profileRoute);

app.use("/api2/user", userRoutes2);

/////////////////////////----------admin----------///////////////////////////
app.use("/auth/api/user", userRoutes);
app.use("/auth/api/notification", authNotificationRoutes);
app.use("/auth/api/news", authNewsRoutes);
app.use("/auth/api/contact", authContactRoutes);
app.use("/auth/api/stuffpost", authStuffpostRoutes);
app.use("/auth/api/profile", authProfileRoute);
//////////////////////////////////////////////////////////////////////////////

server.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
