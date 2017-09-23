var express = require('express');
var quickSort = require('js-quicksort')
var router = express.Router();

/* GET users listing. */
router.post('/sort', function(req, res, next) {
  console.log(req.body);
  var input = [];
  for (var i = 0; i < req.body.length; i++){
    input.push(req.body[i]);
  }
  try {
      var sort = quickSort(input);
  } catch (err) {
      console.log(err);
  }
  res.send(quickSort(input));
});

module.exports = router;
