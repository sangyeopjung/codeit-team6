var express = require('express');
var lzwcompress = require('lzwcompress');
var router = express.Router();

router.post('/stringcompression/:mode', function(req, res) {
    var data = req.body.data;
    var mode = req.params.mode;
    console.log(data, mode);
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
        encoded.push(count.toString());
        encoded.push(prev.toString());
        encoded = encoded.toString();
        encoded = encoded.replace(/1/g, "");
        encoded = encoded.replace(/,/g, "");

        var len = encoded.length * 8;
        res.format({
            'text/plain': function() {
                //res.send(encoded);
                res.send(len.toString());
            }
        });
    } else if (mode == 'LZW') {
        var encoded = lzwcompress.pack(data);
        var len = encoded.length * 12;
        res.format({
            'text/plain': function() {
                res.send(len.toString());
            }
        });
    } else if (mode == 'WDE') {
        
    } else {
        res.sendStatus(400).send({"message":"Bad request"});
    }
});

module.exports = router;
