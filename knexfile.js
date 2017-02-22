'use strict';

module.exports = {
 development: {
   client: 'pg',
   connection: 'postgres://localhost/gameHub'
 },
 production: {
   client: 'pg',
   connection: process.env.DATABASE_URL
 }
};
