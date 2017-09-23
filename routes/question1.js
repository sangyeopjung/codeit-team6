var express = require('express');
//var quickSort = require('js-quicksort')
var timsort = require('timsort')
var router = express.Router();

/* GET users listing. */
router.post('/sort', function(req, res, next) {
  console.log(req.body);
  var input = req.body;
  res.send(timsort.sort(input));
});

module.exports = router;
