exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("user_name").notNullable();
    })
    .createTable("exercises", function (table) {
      table.increments("id").primary();
      table
        .integer("users_id")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("exercise_name").notNullable();
    })
    .createTable("max_weight", function (table) {
      table.increments("id").primary();
      table
        .integer("exercises_id")
        .unsigned()
        .references("exercises.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("max_weight").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
