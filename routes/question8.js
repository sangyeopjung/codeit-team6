var express = require('express');
var router = express.Router();



router.post('/mini-exchange', function(req, res, next) {
    var message = req.body;
    var messageType = [
        "SOD",
        "NEW",
        "QUANTITY",
        "PRICE",
        "CANCEL",
        "EOD"
    ];

    var out = [];

    for (var i = 0; i < message.length; i++) {
        if (message[i].messageType == messageType[0]) {
            ;
        }
    }
});

module.exports = router;
