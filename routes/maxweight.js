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

function updateMaxWeight(req, res) {
  const { exercises_id, max_weight } = req.body;

  const addWeightEntry = { exercises_id, max_weight };

  knex("max_weight")
    .insert(addWeightEntry)
    .then(() => {
      res.status(200).send("Weight Added successfully");
    });
}

router.get("/", getMaxWeight);
router.post("/", updateMaxWeight);

module.exports = router;
