/* eslint-disable arrow-parens*/
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('games', table => {
    table.increments();
    table.string('name').notNullable().unique();
    table.text('description');
    table.string('image_url');
    table.string('type');
    table.integer('min_players').notNullable();
    table.integer('max_players').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('games');
};
