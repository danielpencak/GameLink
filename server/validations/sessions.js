'use strict';

const Joi = require('joi');

module.exports = {
  post: {
    body: {
      gameId: Joi.number().integer()
        .label('Game ID')
        .greater(-1)
        .required(),
      minPlayers: Joi.number().integer()
        .label('Minimum Players')
        .greater(-1)
        .required(),
      maxPlayers: Joi.number().integer()
        .label('Maximum Players')
        .greater(-1)
        .required(),
      locationName: Joi.string()
        .label('Location Name')
        .required()
        .trim(),
      locationLat: Joi.string()
        .label('Location Latitude')
        .required()
        .trim(),
      locationLng: Joi.string()
        .label('Location Longitude')
        .required()
        .trim(),
      description: Joi.string()
        .label('Description')
        .trim(),
      hasBoard: Joi.boolean()
        .label('Has Board'),
      time: Joi.number().integer()
        .label('Time')
        .required()
    }
  },
  patch: {
    body: {
      gameId: Joi.number().integer()
        .label('Game ID')
        .greater(-1),
      minPlayers: Joi.number().integer()
        .label('Minimum Players')
        .greater(-1),
      maxPlayers: Joi.number().integer()
        .label('Maximum Players')
        .greater(-1),
      locationName: Joi.string()
        .label('Location Name')
        .trim(),
      locationLat: Joi.string()
        .label('Location Latitude')
        .trim(),
      locationLng: Joi.string()
        .label('Location Longitude')
        .trim(),
      description: Joi.string()
        .label('Description')
        .trim(),
      hasBoard: Joi.boolean()
        .label('Has Board'),
      time: Joi.number().integer()
        .label('Time')
    }
  }
};
