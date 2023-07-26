/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("exercises").del();
  await knex("exercises").insert([
    {
      id: 1,
      users_id: 1,
      exercise_name: "bench press",
    },
  ]);
};
