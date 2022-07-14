import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { requireAuth, checkUser } from "./middleware/authMiddleware.js";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { ChatManager } from "./chat/ChatManager.js";


// use express
const app = express();
const server = http.createServer(app);

//Only allow specific urls here
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.ATLAS_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((result) => {
    console.log("DB connected Successfully");
    console.log(`Listining on Server ${process.env.PORT}`);
    server.listen(process.env.PORT || 3001);
  })
  .catch((err) => console.log(err));

io.on("connection", ChatManager);

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/doc", (req, res) => res.render("doc"));
app.get("/api/profile", requireAuth, (req, res) =>
  res.send("Here are the posts")
);

app.use(authRoutes);
