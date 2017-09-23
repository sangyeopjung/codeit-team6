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

function radixBucketSort (arr) {
    var idx1, idx2, idx3, len1, len2, radix, radixKey;
    var radices = {}, buckets = {}, num, curr;
    var currLen, radixStr, currBucket;

    len1 = arr.length;
    len2 = 7;  // radix sort uses ten buckets

    // find the relevant radices to process for efficiency
    for (idx1 = 0;idx1 < len1;idx1++) {
        radices[arr[idx1].toString().length] = 0;
    }

    // loop for each radix. For each radix we put all the items
    // in buckets, and then pull them out of the buckets.
    for (radix in radices) {
        // put each array item in a bucket based on its radix value
        len1 = arr.length;
        for (idx1 = 0;idx1 < len1;idx1++) {
            curr = arr[idx1];
            // item length is used to find its current radix value
            currLen = curr.toString().length;
            // only put the item in a radix bucket if the item
            // key is as long as the radix
            if (currLen >= radix) {
                // radix starts from beginning of key, so need to
                // adjust to get redix values from start of stringified key
                radixKey = curr.toString()[currLen - radix];
                // create the bucket if it does not already exist
                if (!buckets.hasOwnProperty(radixKey)) {
                    buckets[radixKey] = [];
                }
                // put the array value in the bucket
                buckets[radixKey].push(curr);
            } else {
                if (!buckets.hasOwnProperty('0')) {
                    buckets['0'] = [];
                }
                buckets['0'].push(curr);
            }
        }
        // for current radix, items are in buckets, now put them
        // back in the array based on their buckets
        // this index moves us through the array as we insert items
        idx1 = 0;
        // go through all the buckets
        for (idx2 = 0;idx2 < len2;idx2++) {
            // only process buckets with items
            if (buckets[idx2] != null) {
                currBucket = buckets[idx2];
                // insert all bucket items into array
                len1 = currBucket.length;
                for (idx3 = 0;idx3 < len1;idx3++) {
                    arr[idx1++] = currBucket[idx3];
                }
            }
        }
        buckets = {};
    }
}

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
            counter[bucket].push(array[j]);
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

// var extractDigit = function( a, bitMask, shiftRightAmount ) {
//     var digit = (a & bitMask) >>> shiftRightAmount; // extract the digit we are sorting based on
//     return digit;
// }
//
// function radixSortLSD(_input_array) {
//     var numberOfBins = 256;
//     var Log2ofPowerOfTwoRadix = 8;
//     var _output_array = new Array(_input_array.length);
//     var count = new Array(numberOfBins);
//     var _output_array_has_result = false;
//
//     var bitMask = 255;
//     var shiftRightAmount = 0;
//
//     var startOfBin = new Array( numberOfBins );
//     var endOfBin   = new Array( numberOfBins );
//
//     while( bitMask != 0 ) // end processing digits when all the mask bits have been processed and shifted out, leaving no bits set in the bitMask
//     {
//         for (var i = 0; i < numberOfBins; i++ )
//             count[ i ] = 0;
//         for (var _current = 0; _current < _input_array.length; _current++ ) // Scan the array and count the number of times each digit value appears - i.e. size of each bin
//             count[ extractDigit( _input_array[ _current ], bitMask, shiftRightAmount ) ]++;
//
//         startOfBin[ 0 ] = endOfBin[ 0 ] = 0;
//         for( var i = 1; i < numberOfBins; i++ )
//             startOfBin[ i ] = endOfBin[ i ] = startOfBin[ i - 1 ] + count[ i - 1 ];
//         for ( var _current = 0; _current < _input_array.length; _current++ )
//             _output_array[ endOfBin[ extractDigit( _input_array[ _current ], bitMask, shiftRightAmount ) ]++ ] = _input_array[ _current ];
//
//         bitMask <<= Log2ofPowerOfTwoRadix;
//         shiftRightAmount += Log2ofPowerOfTwoRadix;
//         _output_array_has_result = !_output_array_has_result;
//
//         var tmp = _input_array, _input_array = _output_array, _output_array = tmp; // swap input and output arrays
//     }
//     if ( _output_array_has_result )
//         for ( var _current = 0; _current < _input_array.length; _current++ ) // copy from output array into the input array
//             _input_array[ _current ] = _output_array[ _current ];
//
//     return _input_array;
// }
//
// function countingSort(arr, min, max) {
//     var i, z = 0, count = [];
//     for (i = min; i <= max; i++) {
//         count[i] = 0;
//     }
//     for (i=0; i < arr.length; i++) {
//         count[arr[i]]++;
//     }
//     for (i = min; i <= max; i++) {
//         while (count[i]-- > 0) {
//             arr[z++] = i;
//         }
//     }
//
//     return arr;
// }

router.post('/sort', function(req, res, next) {
    res.connection.setTimeout(10000);
    var sort = req.body;
    for (var i = 0; i < sort.length; i++)
        sort[i] += 10000;

    //sort = countingSort(sort, 0, 20010);
    //sort = radixSortLSD(sort);
    //sort = sortLSD(sort, 7);
    radixBucketSort(sort);

    for (var i = 0; i < sort.length; i++)
        sort[i] -= 10000;

    console.log(sort);
    res.send(sort);
});

module.exports = router;
