const express = require("express");
const app = express();
const cors = require("cors"); //to access another Servers files
const mongoose = require("mongoose");
require("dotenv").config(); // for the enviroment variables
// const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3001;
app.use(cors()); // cors middleware
app.use(express.json()); // For parsing JSON
app.use(cookieParser());

// Connection to DB
const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri, {});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established Successfully!");
}); // once Connection is oppened -> log ...

// app.use("/exercises", exerciseRouter);
app.use("/users", usersRouter);

// cookies (Can be Removed - Just for testing):
app.get("/set-cookies", (req, res) => {
  res.cookie("isClient", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  res.send("Here are cookies");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

// Starts the server by start to Listning on a certain port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
