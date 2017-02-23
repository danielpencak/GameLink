/* eslint-disable arrow-parens*/
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('games', table => {
    table.increments();
    table.string('name').notNullable();
    table.text('description');
    table.string('image_url');
    table.string('type');
    table.integer('game_id');
    table.integer('playing_time');
    table.integer('year_published');
    table.integer('min_players');
    table.integer('max_players');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('games');
};
