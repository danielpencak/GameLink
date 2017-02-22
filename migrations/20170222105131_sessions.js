'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('sessions', table => {
    table.increments();
    table.integer('game_id')
      .references('games.id')
      .onDelete('cascade')
      .notNullable()
    table.integer('min_players').notNullable();
    table.integer('max_players').notNullable();
    table.string('location_name').notNullable();
    table.decimal('location_lat', 10, 7).notNullable();
    table.decimal('location_lng', 10, 7).notNullable();
    table.text('description');
    table.integer('owner_id')
      .notNullable()
      .references('players.id')
      .onDelete('cascade')
      .index();
    table.boolean('has_board');
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sessions');
};
