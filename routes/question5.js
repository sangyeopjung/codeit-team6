var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/horse-racing', function(req, res, next) {
  var horseplace = [{
    "Name" : "",
    "Count" : 0
  }];
  var jockeyplace = [];
  var trainerplace = [];
  var hr_count = 0;
  var sort = function(field, reverse, primer){
     var key = primer ?
         function(x) {return primer(x[field])} :
         function(x) {return x[field]};

     reverse = !reverse ? 1 : -1;

     return function (a, b) {
         return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
       }
  }

  for(var i = 0; i < req.body.data.length; i++){
    if(req.body.data[i].Placing == 1){
        if(horseplace[Name[i]] == req.body.data[i].Horse){
          horseplace[Count[i]]++
        }else{
          horseplace.push({
          "Name" : req.body.data[i].Horse,
          "Count" : 1
          })
        }
      }
  }
      /*
      jockeyplace.push({
        "Jockey" :  req.body.data[i].jockeycode,
        "Placing" :  req.body.data[i].Placing
      })
      trainerplace.push({
        "Trainer" :  req.body.data[i].Trainer,
        "Placing" :  req.body.data[i].Placing
      })
      */
  horseplace.sort(sort('Count', true, parseInt));
//  trainerplace.sort(sort('Count', true, parseInt));
//  jockeyplace.sort(sort('count', true, parseInt));


  var response = {horseplace}
  res.status(200).send(response);

});

module.exports = router;
