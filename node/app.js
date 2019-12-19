var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var busboy = require('connect-busboy');
var sample = require('./routes/sample');

let reporter = function(type, ...rest) {
  // remote reporter logic goes here
};

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function(err) {
  console.error(new Date().toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);

  reporter(
    'uncaughtException',
    new Date().toUTCString(),
    err.message,
    err.stack
  );

  process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function(reason, promise) {
  console.error('unhandled rejection:', reason.message || reason);

  reporter(
    'uncaughtException',
    new Date().toUTCString(),
    reason.message || reason
  );
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/api/v1/sample', sample);

app.use(busboy());

app.post('/api/excel-reader-api/api/ReadColumnHeaders', function(req, res) {
  if (req.busboy) {
    req.busboy.on('file', function(
      fieldName,
      fileStream,
      fileName,
      encoding,
      mimeType
    ) {
      //Handle file stream here
      console.info('Received the file' + fileName + ' [' + mimeType + ']');

      fileStream.on('readable', () => {
        let chunk;
        while (null !== (chunk = fileStream.read())) {
          for (var i = 0; i < 5000000; i++) {
            // do nothing, just slow the response a little.
          }
          console.log(`Received ${chunk.length} bytes of data.`);
        }
      });

      fileStream.on('end', () => {
        console.log('There will be no more data.');

        const successBody =
          '{ "outcome": "received file data", "status": 200 }';

        for (var i = 0; i < 5000000; i++) {
          // do nothing, just slow the response a little.
        }

        res.statusCode = 200;
        res.write(successBody);
        res.end();
      });
    });

    return req.pipe(req.busboy);
  }

  //Something went wrong -- busboy was not loaded
  console.error('Catastrophe! Busboy not loaded.');
});

module.exports = app;
