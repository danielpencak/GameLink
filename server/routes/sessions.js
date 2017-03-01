/* eslint-disable arrow-parens, max-len, new-cap*/
'use strict';

const router = require('express').Router();
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/sessions.js');
const authorize = require('../authorize');
const boom = require('boom');

router.get('/', (req, res, next) => {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);

  // miles

  const offsetInMeters = Number(req.query.radius) * 1609.34;

  const lat1 = lat - offsetInMeters / 110574;
  const lat2 = lat + offsetInMeters / 110574;

  const lng1 = lng - offsetInMeters / (111320 * Math.cos(lat));
  const lng2 = lng + offsetInMeters / (111320 * Math.cos(lat));

  knex('sessions')
    .select([
      'games.description AS game_description',
      'sessions.description AS session_description',
      'sessions.game_id',
      'has_board',
      'sessions.id AS session_id',
      'image_url',
      'location_lat',
      'location_lng',
      'location_name',
      'sessions.max_players AS max_players',
      'sessions.min_players AS min_players',
      'games.name AS game_name',
      'owner_id',
      'playing_time',
      'type',
      'year_published',
      'sessions.time'
    ])
    .whereBetween('location_lat', [Math.min(lat1, lat2), Math.max(lat1, lat2)])
    .whereBetween('location_lng', [Math.min(lng1, lng2), Math.max(lng1, lng2)])
    .innerJoin('games', 'sessions.game_id', 'games.id')
    .map(session => {
      return knex('players_sessions')
        .where('session_id', session.session_id)
        .then(players => {
          session.player_count = players.length; // eslint-disable-line

          return session;
        })
        .catch(err => next(err));
    })
    .then(sessions => res.send(camelizeKeys(sessions)))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  let players;

  knex('players_sessions')
    .select(['players.username', 'players.avatar', 'players.id'])
    .where('session_id', req.params.id)
    .innerJoin('players', 'players.id', 'players_sessions.player_id')
    .then(rows => {
      players = rows;

      return knex('sessions')
        .select([
          'sessions.id AS id',
          'sessions.min_players',
          'sessions.max_players',
          'games.min_players AS game_min_players',
          'games.max_players AS game_max_players',
          'sessions.location_name',
          'sessions.location_lat',
          'sessions.location_lng',
          'sessions.description',
          'sessions.owner_id',
          'sessions.time',
          'sessions.has_board',
          'games.id AS game_id',
          'games.name AS game_name',
          'games.description AS game_description',
          'games.image_url AS game_image_url',
          'games.type AS game_type'
        ])
        .where('sessions.id', req.params.id)
        .innerJoin('games', 'sessions.game_id', 'games.id')
        .first();
    })
    .then(session => {
      session.players = players;
      session.locationCoords = {
        lat: Number(session.location_lat),
        lng: Number(session.location_lng)
      };
      delete session.location_lat;
      delete session.location_lng;
      res.send(camelizeKeys(session));
    })
    .catch(err => next(err));
});

router.post('/', authorize, ev(validations.post), (req, res, next) => {
  const { gameId, minPlayers, maxPlayers, locationName, locationLat, locationLng, description, hasBoard, time } = req.body;
  let newSession;

  knex('sessions')
    .insert(decamelizeKeys({ gameId, minPlayers, maxPlayers, locationName, locationLat, locationLng, description, ownerId: req.claim.playerId, hasBoard, time }), '*')
    .then(session => {
      newSession = session[0];
      newSession.playerCount = 1;
      newSession.sessionId = newSession.id;

      const playerRow = {
        sessionId: newSession.id,
        playerId: req.claim.playerId
      };

      return knex('players_sessions')
        .insert(decamelizeKeys(playerRow));
    })
    .then(() => {
      return res.send(camelizeKeys(newSession));
    })
    .catch(err => next(err));
});

router.patch('/:id', authorize, ev(validations.patch), (req, res, next) => {
  const { gameId, minPlayers, maxPlayers, locationName, locationLat, locationLng, description, hasBoard, time } = req.body;

  knex('sessions')
    .where('id', req.params.id)
    .first()
    .then(session => {
      if (session.owner_id !== req.claim.playerId) {
        throw boom.create(401, 'Unauthorized');
      }

      return knex('sessions')
        .update(decamelizeKeys({ gameId, minPlayers, maxPlayers, locationName, locationLat, locationLng, description, hasBoard, time }))
        .returning('*')
        .where('id', req.params.id);
    })
    .then(session => res.send(camelizeKeys(session[0])))
    .catch(err => next(err));
});

router.delete('/:id', authorize, (req, res, next) => {
  knex('sessions')
    .where('id', req.params.id)
    .first()
    .then(session => {
      if (!session) {
        throw boom.create(404, 'Session does not exist');
      }
      if (session.owner_id !== req.claim.playerId) {
        throw boom.create(401, 'Unauthorized');
      }

      return knex('sessions')
        .del('*')
        .where('id', req.params.id);
    })
    .then(session => res.send(camelizeKeys(session[0])))
    .catch(err => next(err));
});

module.exports = router;
