dropdb gameHub --if-exists
dropdb gameHub --if-exists

createdb gameHub
createdb gameHub

npm run knex migrate:latest

npm run knex seed:run

node server/fetchGameData.js
