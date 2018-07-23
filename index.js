const express = require('express');
const bodyParser = require('body-parser');
const utils = require('req-res-utils');
const artistHelper = require('./src/artist');

const port = process.env.PORT || 3030
const service_name = process.env.SERVICE_NAME || 'artist-info'
const failPercent = process.env.FAIL_PERCENT || 0.3;
const maxAllowed = process.env.MAX_ALLOWED || 10;

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use(
  bodyParser.json(),
  (req, res, next) => {
    const incomingHeaders = req.headers;
    const headers = Object.assign(
      utils.getCORSHeaders(),
      utils.forwardTraceHeaders(incomingHeaders)
    );
    res.set(headers);
    if (Math.random() < failPercent) {
      // Simulate a failure
      console.log("Failing");
      res.sendStatus(500);
    } else if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  }
);

// Simple REST endpoint for artist info
app.get('/artists', (req, res) => {
  try {
    const artists = require('./data/artists.json');

    const artistsResponse = utils.createResponse(
      req.query,
      maxAllowed,
      artists,
      artistHelper.createArtistInfo
    );
    res.send(artistsResponse);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`${service_name} listening on port ${port}!`);
  console.log(`Failure rate is set to ${failPercent}`);
  console.log(`Max allowed ids are set to ${maxAllowed}`);
});
