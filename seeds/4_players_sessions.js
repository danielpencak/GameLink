/* eslint-disable camelcase, arrow-parens, max-len */
'use strict';

exports.seed = knex => {
  return knex('players_sessions').del()
    .then(() => {
      return knex('players_sessions').insert([{
        id: 1,
        player_id: 1,
        session_id: 1
      }, {
        id: 2,
        player_id: 2,
        session_id: 1
      }, {
        id: 3,
        player_id: 3,
        session_id: 2
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('players_sessions_id_seq', (SELECT MAX(id) FROM players_sessions));"
      );
    });
};
