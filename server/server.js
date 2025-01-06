const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const userRoute = require("./routes/userRoute");
const gameRoute = require("./routes/gameRoute");

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/game", gameRoute);
app.use(express.static(path.join(__dirname, "/dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
mongoose.connect("mongodb://localhost:27017/aws-game").then(() => {
  console.log("connected to db");
  app.listen(4001, () => {
    console.log("server is running on port 4001");
  });
});
