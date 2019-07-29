'use strict'

const express = require ('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./db/database');
const services = require('./services/jobs');
const Job = require('./db/models/job');

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// Remove x-powered-by header (doesn't let clients know we are using Express)
app.disable('x-powered-by');
// Support Cross-Browsing requests
app.use(cors());
// Support parsing of application/json type post data
app.use(bodyParser.json());
// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// Returns the middleware that parses http requests log.
app.use(morgan('dev'));

app.get('/api/remotejobs', (req, res) => {
  Job.find({})
    .then((jobs) => {
      console.log('Served /api/remotejobs call');
      console.log(`Fetched ${jobs.length} jobs from the MongoDB.`);
      res.status(200);
      res.json({
        status: 'success',
        message: 'Jobs',
        total: jobs.length,
        data: jobs
      });
    })
    .catch((err)=>{
      res.status(400);
      res.json({
        message: 'Error.',
        data: err
      });
    });
});

// error handlers

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Resource Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(req, res, err) {
      res.status(err.status || 500);
      console.error('Url: ' + req.url);
      console.error('Message: ' + err.message);
      console.error('Status: ' + err.status);
      res.json({
          message: err.message,
          error: err,
          title: 'error'
      });
  });
}

app.listen(port);
console.log(`✔ Server listening on: http://localhost:${port}`);
try {
  database.db;                                       // Initialize the DB connection for testing
  console.log(`✔ A list of jobs from MongoDB can be found at: http://localhost:${port}/api/remotejobs`);
} catch (e) {
  console.error('There has been an error with the MongoDB server.');
}

services.getJobs().then(() => {     // Fetches data from the remoteok.io/api
  services.getJob({company: 'Ascendle'}).then(res => {  // Fetches data from the MongoDB database
    console.log('From MongoDB:', res);
  });
});

