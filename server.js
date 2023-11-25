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
    origin: [
      "https://fitbuddy.ca",
      "http://127.0.0.1:5173",
      // Add other origins if needed
    ],
    optionsSuccessStatus: 200,
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
  const { email } = req.body;

  // Check if the user already exists in the database
  knex("users")
    .where({ user_name: email })
    .first()
    .then((existingUser) => {
      if (existingUser) {
        // User already exists, skip creating a new entry
        return res.status(200).send("User already exists");
      } else {
        // User does not exist, create a new entry in the database
        knex("users")
          .insert({ user_name: email })
          .then((id) => {
            res.status(201).send("User created successfully");
          })
          .catch((error) => {
            res
              .status(500)
              .json({ message: "Error creating user: " + error.message });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error checking for existing user: " + error.message,
      });
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
      console.log(id);
      res.send(id);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
