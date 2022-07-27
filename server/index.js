const express = require('express')
const path = require('path')
const app = express()

app.get("/", function (req, res) {
  // the following makes index.html run on a server
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// gets the port from heroku, or uses 4004
const port = process.env.PORT || 4004;

app.listen(port, () => {
  console.log(`smoldering on port ${port}`);
});