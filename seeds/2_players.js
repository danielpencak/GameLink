/* eslint-disable arrow-parens, camelcase, max-len */

'use strict';

exports.seed = knex => {
  return knex('players').del()
    .then(() => {
      return knex('players').insert([
        {
          id: 1,
          username: 'banana',
          hashed_password: '$2a$12$i.bFhnaoRY9n86.6eabrK.DICXmu1CDyvYmwo.cnBn51UISeBTOIq',
          email: 'banana@pudding.com',
          skill_level: 11,
          avatar: 'http://www.fillmurray.com/200/300',
          bio: 'I\'m just a banana who enjoys pudding',
          birth_date: '1990-05-30'
        },
        {
          id: 2,
          username: 'pudding',
          hashed_password: '$2a$12$i.bFhnaoRY9n86.6eabrK.DICXmu1CDyvYmwo.cnBn51UISeBTOIq',
          email: 'pudding@banana.com',
          skill_level: 1,
          avatar: 'http://www.fillmurray.com/300/300',
          bio: 'I\'m just a pudding who enjoys banana',
          birth_date: '2008-06-19'
        },
        {
          id: 3,
          username: 'carl',
          hashed_password: '$2a$12$i.bFhnaoRY9n86.6eabrK.DICXmu1CDyvYmwo.cnBn51UISeBTOIq',
          email: 'carl@what.com',
          skill_level: 999,
          avatar: 'http://www.fillmurray.com/400/300',
          bio: 'I\'m just carl',
          birth_date: '1992-09-30'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('players_id_seq', (SELECT MAX(id) FROM players));"
      );
    });
};
