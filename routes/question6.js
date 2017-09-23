var express = require('express');
var _ = require('underscore');
var router = express.Router();

router.post('/trainPlanner', function(req, res, next) {
    var stations = req.body.stations;
    var stationIndex = stations.findIndex(function(obj) { return obj.name == req.body.destination; });
    //var stationIndex = _.findIndex(stations, function(obj) { return obj.name == req.body.destination; });
    console.log('number of stations: ', stationIndex);
    var destination = stations[stationIndex];

    var set = [];
    var queue = [];
    var output = [];

    set.push(destination.name);

    for (var i = 0; i < destination.connections.length; i++) {
        var node = destination.connections[i];

        set.push(node.station);
        queue.push({
            "name": node.station,
            "reachingVia": node.station
        });
        output.push({
            "line": node.line,
            "totalNumOfPassengers": 0,
            "reachingVia": node.station
        });
    }
    console.log('output ', output);
    console.log('set ', set);
    console.log('queue ', queue);

    while (queue.length > 0) {
        //Dequeue
        var out = queue.shift();
        console.log('queue popped ', out);
        var index = stations.findIndex(function(obj) { return obj.name == out.name; });
        //var index = _.findIndex(stations, out.name);
        var current = stations[index];
        console.log('current', current);

        //Add passengers
        //var outputIndex = _.findIndex(output, function(obj) { return obj.reachingVia == out.reachingVia; });
        var outputIndex = output.findIndex(function(obj) { return obj.reachingVia == out.reachingVia; });
        output[outputIndex].totalNumOfPassengers += current.passengers;

        //Queue new nodes
        for (var i = 0; i < current.connections.length; i++) {
            if (set.findIndex(function(obj) { return obj == current.connections[i].station; }) == -1) {
            // if (findIndex(set, current.connections[i]) == -1) {
                var node = current.connections[i];
                set.push(node.station);
                queue.push({
                    "name": node.station,
                    "reachingVia": out.reachingVia
                });
            }
        }
    }

    output = _.sortBy(output, 'totalNumOfPassengers');
    res.send(output[output.length-1]);
});

module.exports = router;
