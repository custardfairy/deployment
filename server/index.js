const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, "/../public")));

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get("/", function (req, res) {
  // the following makes index.html run on a server
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

rollbar.info("html file served successfully.");

try {
  nonExistentFunction();
} catch (error) {
  rollbar.error(error);
}

app.use(rollbar.errorHandler());

// gets the port from heroku, or uses 4004
const port = process.env.PORT || 4004;

app.listen(port, () => {
  console.log(`smoldering on port ${port}`);
});