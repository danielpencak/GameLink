'use strict'

exports.up = function(knex) {
  return knex.schema.createTable("players", table => {
    table.increments();
    table.string("username").unique().notNullable();
    table.specificType("hashed_password", 'char(60)').notNullable();
    table.string("email").unique().notNullable();
    table.integer("skill_level").notNullable();
    table.string("avatar")
    table.text("bio");
    table.string("birth_date");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("players");
};
