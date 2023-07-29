const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

function getMaxWeight(req, res) {
  knex("max_weight")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).send(`error on retrieve warehouses ${error}`);
    });
}

function postMaxWeight(req, res) {
  const { users_id, exercise_name, max_weight } = req.body;
  console.log(req.body);

  // Check if an exercise with the same name already exists in the database
  knex("maxweight")
    .select("exercises_id")
    .where("exercises_id", exercises_id)
    .first()
    .then((existingExercise) => {
      if (existingExercise) {
        // Exercise with the same name already exists, do nothing
        const newMaxWeight = {
          max_weight: max_weight,
        };
        knex("maxweight")
          .insert(newMaxWeight)
          .then(() => {
            res.status(200).send("Max Weight updated successfully");
          })
          .catch((error) => {
            res
              .status(500)
              .send("Error inserting Max Weight: " + error.message);
          });
      }
    })
    .catch((error) => {
      res.status(500).send("Error checking exercise: " + error.message);
    });
}

router.get("/", getMaxWeight);
router.post("/", postMaxWeight);

module.exports = router;
