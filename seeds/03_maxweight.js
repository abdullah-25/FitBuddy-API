/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("max_weight").del();
  await knex("max_weight").insert([
    {
      id: 1,
      exercises_id: 1,
      max_weight: 25,
    },
  ]);
};
