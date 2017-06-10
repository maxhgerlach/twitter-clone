'use strict';

var express = require('express');
var app = express();

// get route
app.get('/', function(req, res) {
    res.send('Hello world!');
});

// listen for requests
app.listen(8080, function() {
    console.log('Web server listening on port 8080!');
});
