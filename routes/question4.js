var express = require('express');
var lzwcompress = require('lzwcompress');
var router = express.Router();

router.post('/stringcompression/:mode', function(req, res) {
    var data = req.body.data;
    var mode = req.query.mode;
    if(mode == 'RLE') {
        var encoded = [];
        var prev = data[0];
        var count = 1;
        for (var i = 1; i < data.length; i++) {
            if (data[i] != prev) {
                encoded.push([count, prev]);
                count = 1;
                prev = data[i];
            }
            else
                count ++;
        }
        encoded.push([count, prev]);
        res.format({
            'text/plain': function() {
                res.send(encoded.length * 8);
            }
        });
    } else if (mode == 'LZW') {
        var encoded = lzwcompress.pack(data);
        res.format({
            'text/plain': function() {
                res.send(encoded.length * 12);
            }
        });
    } else if (mode == 'WDE') {

    }
});

module.exports = router;
