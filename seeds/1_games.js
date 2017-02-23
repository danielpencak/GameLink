/* eslint-disable no-extra-parens, camelcase */
'use strict';

exports.seed = ((knex) => {
  return knex('games').del()
    .then(() => {
      return knex('games').insert([{
        id: 1,
        game_id: 1,
        name: 'Monopoly',
        description: 'Let\'s conquer the real estate market',
        image_url: 'http://www.fillmurray.com/200/300',
        type: 'board',
        min_players: 2,
        max_players: 4
      }, {
        id: 2,
        game_id: 2,
        name: 'Scrabble',
        description: 'Let\'s make some words',
        image_url: 'http://www.fillmurray.com/150/250',
        type: 'board',
        min_players: 2,
        max_players: 4
      }, {
        id: 3,
        game_id: 3,
        name: 'Sorry!',
        description: 'I am not sorry!',
        image_url: 'http://www.fillmurray.com/100/200',
        type: 'board',
        min_players: 2,
        max_players: 4
      }]);
    })
    .then(() => {
      return knex.raw(
      "SELECT setval('games_id_seq', (SELECT MAX(id) FROM games));"
      );
    });
});
