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

const authorize = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;
    next();
  });
};

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

module.exports = router;
