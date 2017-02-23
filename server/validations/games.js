'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    name: Joi.string()
      .label('Name')
      .trim()
      .required(),
    type: Joi.string()
      .label('Type')
      .trim()
      .required(),
    minPlayers: Joi.number().integer()
      .label('Minimum Players')
      .required(),
    maxPlayers: Joi.number().integer()
      .label('Maximum Players')
      .required(),
    description: Joi.string()
      .label('Description'),
    imageUrl: Joi.string()
      .label('Image URL'),
    playingTime: Joi.number().integer()
      .label('Playing Time'),
    yearPublished: Joi.number().integer()
      .label('Year Published')
  }
};
