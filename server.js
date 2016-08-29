var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

//var peopleMock = require('./mock/people.json');
//var teamMock = require('./mock/team.json');
MongoClient.connect('mongodb://pandas.lss.emc.com:27017/pandas', function(err, db) {
    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/players', function(req, res, next) {
       // res.json(peopleMock);
        var cursor = db.collection('players').find();
        var numMatches = 0;
        var data = {};
        data.players = [];

        cursor.forEach(
            function(doc) {
                numMatches = numMatches + 1;
                data.players.push(doc);
            },
            function(err) {
                assert.equal(err, null);
                console.log("Matching documents for players: " + numMatches);
                data.total = numMatches;
                res.json(data);
            }
        );


    });

    app.get('/teams', function(req, res, next) {
        var cursor = db.collection('teams').find();
        var numMatches = 0;
        var data = {};
        data.teams = [];

        cursor.forEach(
            function(doc) {
                numMatches = numMatches + 1;
                data.teams.push(doc);
            },
            function(err) {
                assert.equal(err, null);
                console.log("Matching documents for teams: " + numMatches);
                data.total = numMatches;
                res.json(data);
            }
        );

    });
});
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});

app.use(express.static('.'));