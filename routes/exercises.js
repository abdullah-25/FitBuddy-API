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
  const { users_id, exercise_name } = req.body;

  knex("exercises")
    .where({ users_id, exercise_name })
    .first()
    .then((existingExercise) => {
      if (existingExercise) {
        return res
          .status(409)
          .json({ message: `Exercise name already exists for the user` });
      }

      const newEntry = { users_id, exercise_name };

      knex("exercises")
        .insert(newEntry)
        .then(() => {
          res.status(200).send("Exercise created successfully");
        })
        .catch((error) => {
          res
            .status(500)
            .json({ message: "Error inserting exercise: " + error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error checking for duplicate exercise: ${error.message}`,
      });
    });
}

function findExerciseId(req, res) {
  const { users_id, exercise_name } = req.body;

  // Find the exercise_id associated with the provided exercise_name and users_id
  knex("exercises")
    .select("id")
    .where({ users_id, exercise_name })
    .first()
    .then((exercise) => {
      if (!exercise) {
        res.status(404).send("Exercise not found for the given user and name.");
      } else {
        const result = {
          users_id: users_id,
          exercises_id: exercise.id,
          exercise_name: exercise_name,
        };
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(500).send("Error finding exercise: " + error.message);
    });
}

router.get("/", getExercises);
router.post("/", postExercise);
router.put("/:id", findExerciseId);

module.exports = router;
