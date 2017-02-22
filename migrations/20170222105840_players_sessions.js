'use strict'

exports.up = function(knex) {
  return knex.schema.createTable("players_sessions", table => {
    table.increments();
    table.integer("player_id")
      .index()
      .references("players.id")
      .onDelete("cascade")
      .notNullable();
    table.integer("session_id")
      .index()
      .references("sessions.id")
      .onDelete("cascade")
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("players_sessions");
};
