'use strict';

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'vagrant',
    password: '',
    database: 'twitter'
});

var app = express();

connection.connect(function(err) {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log('Connected to the database.');
    
    app.listen(8080, function() {
        console.log('Web server now listening on port 8080!');
    });
});


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

// homepage get route
app.get('/', function(req, res) {
    var query = 'SELECT * FROM Tweets ORDER BY created_at DESC';

    connection.query(query, function(err, results) {
        if(err) {
            console.log(err);
        }

        for (var i = 0; i < results.length; i++) {
            var tweet = results[i];
            tweet.time_from_now = moment(tweet.created_at).fromNow();
        }
        
        res.render('tweets', { tweets: results });
    });
});

// edit tweet get route
app.get('/tweets/:id([0-9]+)/edit', function(req, res) {
    res.send(req.params.id);
});

// post route
app.post('/tweets/create', function(req, res) {
    var query = 'INSERT INTO Tweets(handle, body) VALUES(?, ?)';

    var handle = req.body.handle;
    var body = req.body.body;

    connection.query(query, [handle, body], function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

