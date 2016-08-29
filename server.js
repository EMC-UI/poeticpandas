var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var peopleMock = require('./mock/people.json');
var teamMock = require('./mock/team.json');
//MongoClient.connect('mongodb://pandas.lss.emc.com:27017/poeticpandas', function(err, db) {
   // assert.equal(null, err);
   // console.log("Successfully connected to MongoDB.");

    app.get('/players', function(req, res, next) {
        res.json(peopleMock);
    });

    app.get('/teams', function(req, res, next) {
        res.json(teamMock);
    });
//});
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});

app.use(express.static('.'));