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
    .whereBetween('location_lat', [Math.min(lat1, lat2), Math.max(lat1, lat2)])
    .whereBetween('location_lng', [Math.min(lng1, lng2), Math.max(lng1, lng2)])
    .then(sessions => res.send(camelizeKeys(sessions)))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  knex('sessions')
    .where('id', req.params.id)
    .first()
    .then(session => res.send(camelizeKeys(session)))
    .catch(err => next(err));
});

router.post('/', authorize, ev(validations.post), (req, res, next) => {
  const { gameId, minPlayers, maxPlayers, locationName, locationLat, locationLng, description, hasBoard } = req.body;

  knex('sessions')
    .insert(decamelizeKeys({ gameId, minPlayers, maxPlayers, locationName, locationLat, locationLng, description, ownerId: req.claim.playerId, hasBoard }), '*')
    .then(session => res.send(camelizeKeys(session[0])))
    .catch(err => next(err));
});

router.patch('/:id', authorize, ev(validations.patch), (req, res, next) => {
  const { gameId, minPlayers, maxPlayers, locationName, locationLat, locationLng, description, hasBoard } = req.body;

  knex('sessions')
    .where('id', req.params.id)
    .first()
    .then(session => {
      if (session.owner_id !== req.claim.playerId) {
        throw boom.create(401, 'Unauthorized');
      }

      return knex('sessions')
        .update(decamelizeKeys({ gameId, minPlayers, maxPlayers, locationName, locationLat, locationLng, description, hasBoard }))
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
