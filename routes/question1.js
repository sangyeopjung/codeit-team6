var express = require('express');
var quickSort = require('js-quicksort')
var router = express.Router();

/* GET users listing. */
router.post('/sort', function(req, res, next) {
  console.log(req.body);
  var input = req.body;
  res.send(quickSort(input));
});

module.exports = router;
