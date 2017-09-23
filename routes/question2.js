var express = require('express');
var _ = require('underscore');
var router = express.Router();

router.post('/heist', function(req, res, next) {
  console.log(req.body);
  var maxWeight = req.body.maxWeight;
  var vault = req.body.vault;

  if (vault.length == 0 || maxWeight == 0)
    res.send({"heist":0});

  else {
      for (var i = 0; i < vault.length; i++) {
          vault[i].efficiency = vault[i].value / vault[i].weight;
      }
      vault = _.sortBy(vault, 'efficiency');
      console.log(vault);
      var index = vault.length - 1;
      var cWeight = 0;
      var heist = 0;
      while (cWeight < maxWeight && index >= 0) {
          if (vault[index].weight >= 1) {
              heist += vault[index].efficiency;
              cWeight++;
              vault[index].weight--;
          } else if (vault[index].weight > 0) {
              heist += (vault[index].efficiency * vault[index].weight);
              cWeight += vault[index].weight;
              vault[index].weight = 0;
          } else {
              index--;
          }
      }
      var msg = {"heist": heist};
      console.log(msg);
      res.send(msg);
  }

  // var max = req.body.maxWeight;
  // var q = 0;
  // var t = 0;
  // var gasung = [];
  // var heist = 0;
  //
  // console.log(req.body);
  //
  // for (var i = 0; i < req.body.vault.length; i++) {
  //   gasung.push({
  //     "Weight" :  req.body.vault[i].weight,
  //     "Gasung" :  req.body.vault[i].value / req.body.vault[i].weight
  //   });
  // }
  //
  // var sort = function(field, reverse, primer){
  //    var key = primer ?
  //        function(x) {return primer(x[field])} :
  //        function(x) {return x[field]};
  //
  //    reverse = !reverse ? 1 : -1;
  //
  //    return function (a, b) {
  //        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  //      }
  // };
  //
  // gasung.sort(sort('Gasung', true, parseInt));
  //
  // for(var w = 0; w < 10000; w++){
  //   if(t == gasung[q].Weight){
  //     q++
  //     t = 0
  //   }
  //
  //   if(w == max){
  //     break;
  //   }
  //
  //   heist = heist + gasung[q].Gasung;
  //   t++;
  // }
  //
  // var response = { "heist" : heist };
  //
  // res.status(200).send(response);

});

module.exports = router;
