var express = require('express');
var lzwcompress = require('lzwcompress');
var _ = require('underscore');
var router = express.Router();

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

        var len = encoded.length * 8;
        res.format({
            'text/plain': function() {
                //res.send(encoded);
                res.send(len.toString());
            }
        });
    } else if (mode == 'LZW') {
        console.log('lzw', req.body.data);
        encoded = lzwcompress.pack(data);
        console.log(encoded);
        var len = (encoded.length-1) * 12;
        res.format({
            'text/plain': function() {
                res.send(len.toString());
            }
        });
    } else if (mode == 'WDE') {
        console.log('wde', req.body.data)
        var strArr = data.split(/(\s+)/);
        var dict = {};
        var numNonword = 0;
        var dictSize = 0;
        var numWord = 0;

        for (var i = 0; i < strArr.length; i++){
            if (/^[^\W\d\s]/.test(strArr[i])) {
                var currentWord = strArr[i];
                if (currentWord in dict) {
                    dict["" + strArr[i]] += 1;
                } else {
                    dict["" + strArr[i]] = 1;
                }
            } else {
                numNonword +=1;
            }
        }
        for (var word in dict) {
            numWord += dict[word];
            dictSize += (8*word.length);
        }

        var len = (numWord + numNonword) * 12 + dictSize;

        res.format({
            'text/plain': function() {
                res.send(len.toString());
            }
        })
    } else {
        res.sendStatus(400).send({"message":"Bad request"});
    }
});

module.exports = router;
