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
router.get("/", getExercises);

module.exports = router;
