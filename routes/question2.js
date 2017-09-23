var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/heist', function(req, res, next) {
  var max = req.body.maxWeight;
  var q = 0;
  var t = 0;
  var gasung = [];
  var heist = 0;

  for (var i = 0; i < req.body.vault.length; i++) {
    gasung.push({
      "Weight" :  req.body.vault[i].weight,
      "Gasung" :  req.body.vault[i].value / req.body.vault[i].weight
    });
  }

  var sort = function(field, reverse, primer){
     var key = primer ?
         function(x) {return primer(x[field])} :
         function(x) {return x[field]};

     reverse = !reverse ? 1 : -1;

     return function (a, b) {
         return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
       }
  };

  gasung.sort(sort('Gasung', true, parseInt));

  console.log(gasung);

  for(var w = 0; w < 10000; w++){
    if(t == gasung[q].Weight){
      q++
      t = 0
    }

    if(w == max){
      break;
    }

    heist = heist + gasung[q].Gasung;
    t++;
    console.log(heist);
  }

  var response = { "heist" : heist };

  res.status(200).send(response);

});

module.exports = router;
