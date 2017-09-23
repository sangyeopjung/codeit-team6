var express = require('express');
var router = express.Router();

// function quickSort(arr, left, right){
//     var len = arr.length,
//         pivot,
//         partitionIndex;
//
//
//     if(left < right){
//         pivot = right;
//         partitionIndex = partition(arr, pivot, left, right);
//
//         //sort left and right
//         quickSort(arr, left, partitionIndex - 1);
//         quickSort(arr, partitionIndex + 1, right);
//     }
//     return arr;
// }
//
// function partition(arr, pivot, left, right){
//     var pivotValue = arr[pivot],
//         partitionIndex = left;
//
//     for(var i = left; i < right; i++){
//         if(arr[i] < pivotValue){
//             swap(arr, i, partitionIndex);
//             partitionIndex++;
//         }
//     }
//     swap(arr, right, partitionIndex);
//     return partitionIndex;
// }
//
// function swap(arr, i, j){
//     var temp = arr[i];
//     arr[i] = arr[j];
//     arr[j] = temp;
// }

function sortLSD(array, maxDigitSymbols) {
    var mod = 10;
    var dev = 1;
    var counter = [[]];
    for (var i = 0; i < maxDigitSymbols; i++, dev *= 10, mod *= 10) {
        for (var j = 0; j < array.length; j++) {
            var bucket = parseInt((array[j] % mod) / dev);
            if (counter[bucket] == null ) {
                counter[bucket] = [];
            }
            counter[bucket].unshift(array[j]);
        }
        var pos = 0;
        for (var j = 0; j < counter.length; j++) {
            var value = null ;
            if (counter[j] != null ) {
                while ((value = counter[j].shift()) != null ) {
                    array[pos++] = value;
                }
            }
        }
    }
    return array;
}

router.post('/sort', function(req, res, next) {
  console.log(req.body);
  res.connection.setTimeout(10000);
  var sort = req.body;
  //res.send(quickSort(sort, 0, sort.length-1));
  res.send(sortLSD(sort, 7));
});

module.exports = router;
