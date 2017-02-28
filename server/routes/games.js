/* eslint-disable new-cap, arrow-parens, max-len*/
'use strict';

const router = require('express').Router();
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/games.js');
const authorize = require('../authorize');

router.get('/', (req, res, next) => {
  knex('games')
    .orderBy('name', 'ASC')
    .then(games => res.send(camelizeKeys(games)))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  knex('games')
    .where({ id: req.params.id })
    .first()
    .then(game => res.send(camelizeKeys(game)))
    .catch(err => next(err));
});

router.post('/', authorize, ev(validations.post), (req, res, next) => {
  const { name, description, maxPlayers, minPlayers, playingTime, type } = req.body;

  knex('games')
    .insert(decamelizeKeys({ name, description, maxPlayers, minPlayers, playingTime, type }), '*')
    .then(game => res.send(camelizeKeys(game)))
    .catch(err => next(err));
});

module.exports = router;
