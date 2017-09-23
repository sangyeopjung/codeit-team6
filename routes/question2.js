var express = require('express');
var quickSort = require('js-quicksort')
var router = express.Router();

/* GET users listing. */
router.post('/question2', function(req, res, next) {
  var max = req.body.maxWeight
  var q = 0;
  var t = 0;
  var gasung = [];
  var heist = 0;

  for (var i = 0; i < req.body.vault.length; i++) {
    gasung.push({
      "Weight" :  req.body.vault[i].weight,
      "Gasung" :  req.body.vault[i].value / req.body.vault[i].weight
    })
  }

  var sort_by = function(field, reverse, primer){
     var key = primer ?
         function(x) {return primer(x[field])} :
         function(x) {return x[field]};

     reverse = !reverse ? 1 : -1;

     return function (a, b) {
         return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
       }
  }

  gasung.sort(sort_by('Gasung', true, parseInt));

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
    t++
    console.log(heist);
  }
  //res.get(max)
  var response = { "heist" : heist }
  res.status(200).send(response);

});

module.exports = router;
