require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const ExercisesRoute = require("./routes/exercises");
const MaxWeightRoute = require("./routes/maxweight");
const PORT = process.env.PORT || 5050;

// middleware
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.static("public"));

// // register routes
app.get("/", (req, res) => {
  res.send("hiii");
});
app.use("/api/exercises", ExercisesRoute);
app.use("/api/max", MaxWeightRoute);

// go!!
app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
