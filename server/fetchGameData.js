/* eslint-disable arrow-parens */
'use strict';

const request = require('request-promise');
const { decamelizeKeys } = require('humps');
const knex = require('../knex');

request('https://bgg-json.azurewebsites.net/collection/edwalter')
  .then(response => {
    const gameArr = JSON.parse(response).map(game => {
      const {
        gameId,
        name,
        thumbnail,
        minPlayers,
        maxPlayers,
        playingTime,
        yearPublished
      } = game;

      return {
        gameId,
        name,
        imageUrl: thumbnail,
        minPlayers,
        maxPlayers,
        playingTime,
        yearPublished,
        type: 'board'
      };
    });

    return knex('games')
      .insert(decamelizeKeys(gameArr), '*');
  })
  .then(response => {
    console.log(response);
  });
