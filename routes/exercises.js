const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

function getExercises(req, res) {
  knex("exercises")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).send(`error on retrieve warehouses ${error}`);
    });
}

function postExercise(req, res) {
  const { users_id, exercise_names } = req.body;
  console.log(req.body);

  if (!Array.isArray(exercise_names)) {
    return res.status(400).send("exercise_names should be an array");
  }

  const exercisesToInsert = exercise_names.map((exercise_name) => ({
    users_id,
    exercise_name,
  }));
  console.log(exercisesToInsert);

  knex("exercises")
    .insert(exercisesToInsert)
    .onConflict("exercise_name")
    .ignore() // This will skip insert if exercise_name already exists
    .then(() => {
      res.status(200).send("Exercises created successfully");
    })
    .catch((error) => {
      res.status(500).send("Error inserting exercises: " + error.message);
    });
}

// Check if an exercise with the same name already exists in the database

router.get("/", getExercises);
router.post("/", postExercise);

module.exports = router;
