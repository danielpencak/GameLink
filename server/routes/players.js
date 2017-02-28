/* eslint-disable new-cap, arrow-parens */
'use strict';

const router = require('express').Router();
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const ev = require('express-validation');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const validations = require('../validations/players');
const authorize = require('../authorize');

router.get('/', authorize, (req, res, next) => {
  knex('players')
    .where('id', req.claim.playerId)
    .first()
    .then((row) => {
      const player = camelizeKeys(row);

      delete player.hashedPassword;

      res.send(player);
    })
    .catch(err => next(err));
});

router.post('/', ev(validations.post), (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(boom.create(400, 'Password do not match'));
  }

  knex('players')
    .where('email', req.body.email)
    .first()
    .then((row) => {
      if (row) {
        throw boom.create(400, 'Email is already registered');
      }

      return knex('players')
        .where('username', req.body.username)
        .first();
    })
    .then((row) => {
      if (row) {
        throw boom.create(400, 'Username is already registered');
      }

      return bcrypt.hash(req.body.password, 12);
    })
    .then((hashedPassword) => {
      const player = {
        username: req.body.username,
        hashedPassword,
        email: req.body.email,
        skillLevel: req.body.skillLevel,
        avatar: req.body.avatar,
        bio: req.body.bio,
        birthDate: req.body.birthDate
      };

      return knex('players')
        .insert(decamelizeKeys(player), '*');
    })
    .then((players) => {
      const player = camelizeKeys(players[0]);
      const payload = {
        playerId: player.id
      };

      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '365 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 3600 * 24 * 365),
        secure: router.get('env') === 'production'
      });

      delete player.hashedPassword;

      res.send(player);
    })
    .catch(err => next(err));
});

router.get('/:id/sessions', authorize, (req, res, next) => {
  knex('players_sessions')
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
    .where('player_id', req.claim.playerId)
    .innerJoin('sessions', 'players_sessions.session_id', 'sessions.id')
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

module.exports = router;
