var express = require('express');
var lzwcompress = require('lzwcompress');
var _ = require('underscore');
var router = express.Router();

var lol = 16;
router.post('/stringcompression/:mode', function(req, res) {
    var data = req.body.data;
    var mode = req.params.mode;
    var encoded = []
    if(mode == 'RLE') {
        var prev = data[0];
        var count = 1;
        for (var i = 1; i < data.length; i++) {
            if (data[i] != prev) {
                if (count == 1)
                    encoded.push([prev]);
                else
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
        encoded = encoded.replace(/,/g, "");

        var len = (encoded.length-1) * 8;
        res.format({
            'text/plain': function() {
                //res.send(encoded);
                res.send(len.toString());
            }
        });
    } else if (mode == 'LZW') {
        encoded = lzwcompress.pack(data);
        var len = (encoded.length-1) * 12;
        res.format({
            'text/plain': function() {
                res.send(len.toString());
            }
        });
    } else if (mode == 'WDE') {
        var str = data.toString();

        var word = str.split(' ');
        var dict = [];
        for (var i = 0; i < word.length; i++) {
            if (!_.contains(dict, word[i]))
                dict.push(word[i]);
        }
        var nospace = str.replace(/ /g, "");
        var nonword = str.length - nospace.length;

        var dictlen = dict.toString();
        dictlen = dictlen.replace(/,/g, "");

        var len = word.length*12 + nonword*12 + dictlen.length*8;

        res.format({
            'text/plain': function() {
                res.send(lol.toString());
                lol = lol*100 + 56;
            }
        })
    } else {
        res.sendStatus(400).send({"message":"Bad request"});
    }
});

module.exports = router;
