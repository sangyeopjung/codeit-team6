var express = require('express');
var router = express.Router();

router.post('/sort', function(req, res, next) {
  console.log(req.body);
  var out = req.body;
  out = out.sort(function(a, b) { return a - b; });
  res.send(out);
});

module.exports = router;
