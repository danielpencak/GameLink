/* eslint-disable arrow-parens, new-cap*/
'use strict';

const router = require('express').Router();
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const authorize = require('../authorize');
const boom = require('boom');

router.post('/:id', authorize, (req, res, next) => {
  const join = {
    playerId: req.claim.playerId,
    sessionId: req.params.id
  };

  knex('players_sessions')
    .where('player_id', join.playerId)
    .where('session_id', join.sessionId)
    .first()
    .then(row => {
      if (row) {
        throw boom.create(400, 'Player is already in session');
      }

      return knex('players_sessions')
        .select('sessions.max_players')
        .where('session_id', join.sessionId)
        .innerJoin('sessions', 'sessions.id', 'players_sessions.session_id');
    })
    .then(rows => {
      if (rows.length >= rows[0].max_players) {
        throw boom.create(400, 'Already max players in session');
      }

      return knex('players_sessions')
        .insert(decamelizeKeys(join), '*');
    })
    .then(joined => res.send(camelizeKeys(joined[0])))
    .catch(err => next(err));
});

router.delete('/:sessionId/:playerId/', authorize, (req, res, next) => {
  const playerId = Number(req.params.playerId);
  const sessionId = Number(req.params.sessionId);
  const claimId = Number(req.claim.playerId);

  knex('sessions')
    .where('id', sessionId)
    .first()
    .then(row => {
      if (row.owner_id !== claimId && playerId !== claimId) {
        throw boom.create(401, 'Unauthorized');
      }

      return knex('players_sessions')
        .del('*')
        .where('player_id', playerId)
        .where('session_id', sessionId);
    })
    .then(response => res.send(response[0]))
    .catch(err => next(err));
});

module.exports = router;
