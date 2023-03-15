var express = require('express');
var app = express();
var uuid = require('node-uuid');

var { Pool } = require('pg');

var conString = process.env.DB; // "postgres://username:password@localhost/database";

// Routes
app.get('/api/status', function (req, res) {
  try {
    const pool = new Pool({
      connectionString: conString,
    });
    pool.query('SELECT now() as time', [], function (err, result) {
      //call `done()` to release the client back to the pool
      if (err) {
        return res.status(500).send('error running query');
      }

      return res.json({
        request_uuid: uuid.v4(),
        time: result.rows[0].time
      });
    });

  } catch (error) {
    console.log('error:')
    console.log(error)
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;