var express = require('express');
var router = express.Router();

function quickSort(arr, left, right)
{
    var i = left;
    var j = right;
    var tmp;
    var pivotidx = (left + right) / 2;
    var pivot = parseInt(arr[pivotidx.toFixed()]);
    /* partition */
    while (i <= j)
    {
        while (parseInt(arr[i]) < pivot)
            i++;
        while (parseInt(arr[j]) > pivot)
            j--;
        if (i <= j)
        {
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
            j--;
        }
    }

    /* recursion */
    if (left < j)
        quickSort(arr, left, j);
    if (i < right)
        quickSort(arr, i, right);
    return arr;
}

router.post('/sort', function(req, res, next) {
  console.log(req.body);
  var out = req.body;
  res.send(quickSort(out, 0, out.length-1));
});

module.exports = router;
