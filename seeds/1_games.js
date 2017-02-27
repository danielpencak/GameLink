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
        image_url: 'https://cf.geekdo-images.com/images/pic2748156_md.jpg',
        type: 'board',
        min_players: 2,
        max_players: 4
      }, {
        id: 2,
        game_id: 2,
        name: 'Scrabble',
        description: 'Let\'s make some words',
        image_url: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fcf.geekdo-images.com%2Fimages%2Fpic404651_md.jpg',
        type: 'board',
        min_players: 2,
        max_players: 4
      }, {
        id: 3,
        game_id: 3,
        name: 'Sorry!',
        description: 'I am not sorry!',
        image_url: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fcf.geekdo-images.com%2Fimages%2Fpic266469_md.jpg',
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
