const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

if (process.env.NODE_ENV !== 'test') {
  const logger = require('morgan')
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
})

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, _req, res, _next) => {
 if (err.status) {
   return res
     .status(err.status)
     .send(err);
 }

 if (err.output && err.output.statusCode) {
   return res
     .status(err.output.statusCode)
     .set('Content-Type', 'text/plain')
     .send(err.message);
 }

 console.error(err.stack);
 res.sendStatus(500);
});

module.exports = app
