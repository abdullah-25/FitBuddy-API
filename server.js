require("dotenv").config();
const express = require("express");
const cors = require("cors");
const knex = require("knex")(require("./knexfile"));

const app = express();
const ExercisesRoute = require("./routes/exercises");
const MaxWeightRoute = require("./routes/maxweight");
const PORT = process.env.PORT || 5050;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.static("public"));
// Set the maximum request size limit to 10 MB (adjust as needed)

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

app.post("/signup", (req, res) => {
  console.log(req.body);

  knex("users")
    .insert({ user_name: req.body.email })
    .then((id) => {
      res.send(id);
    });
});

//api to get userID by providing username from front-end
app.post("/userid", (req, res) => {
  const { user_name } = req.body;
  console.log("user_name", req.body);
  knex("users")
    .select("id")
    .where({ user_name })
    .first()
    .then((id) => {
      res.send(id);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
