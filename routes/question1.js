var express = require('express');
var router = express.Router();

    function countingSort(arr, min, max) {
        var i, z = 0, count = [];
        for (i = min; i <= max; i++) {
            count[i] = 0;
        }
        for (i=0; i < arr.length; i++) {
            count[arr[i]]++;
        }
        for (i = min; i <= max; i++) {
            while (count[i]-- > 0) {
                arr[z++] = i;
            }
        }

        return arr;
    }

router.post('/sort', function(req, res, next) {
    res.connection.setTimeout(10000);
    var sort = req.body;
    for (var i = 0; i < sort.length; i++)
        sort[i] += 10000;

    sort = countingSort(sort, 0, 20010);

    for (var i = 0; i < sort.length; i++)
        sort[i] -= 10000;

    console.log('in', req.body);
    console.log('out', sort);
    res.send(sort);
});

module.exports = router;
