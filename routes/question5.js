var express = require('express');
var _ = require('underscore');
var router = express.Router();

/* GET users listing. */
router.post('/horse-racing', function(req, res, next) {
    var horse = [];
    var jockey = [];
    var trainer = [];
    for (var i = 0; i < req.body.data.length; i++) {
        var contestant = req.body.data[i];
        if (contestant.Placing == 1) {
            var index = _.findWhere(horse, { "Name": contestant.Horse });
            if (index === undefined) {
                horse.push({
                    "Index": horse.length,
                    "Name": req.body.data[i].Horse,
                    "Wins": 1
                });
            } else {
                horse[index.Index].Wins++;
            }

            index = _.findWhere(jockey, { "Name": contestant.jockeycode });
            if (index === undefined) {
                jockey.push({
                    "Index": jockey.length,
                    "Name": req.body.data[i].jockeycode,
                    "Wins": 1
                });
            } else {
                jockey[index.Index].Wins++;
            }

            index = _.findWhere(trainer, { "Name": contestant.Trainer });
            if (index === undefined) {
                trainer.push({
                    "Index": trainer.length,
                    "Name": req.body.data[i].Trainer,
                    "Wins": 1
                });
            } else {
                trainer[index.Index].Wins++;
            }
        }
    }
    var maxHorse = { "Wins" : 0 };
    var maxJockey = { "Wins" : 0 };
    var maxTrainer = { "Wins" : 0 };
    for (var i = 0; i < horse.length; i++)
        if (horse[i].Wins > maxHorse.Wins)
            maxHorse = horse[i];

    for (var i = 0; i < jockey.length; i++)
        if (jockey[i].Wins > maxJockey.Wins)
            maxJockey = jockey[i];

    for (var i = 0; i < trainer.length; i++)
        if (trainer[i].Wins > maxTrainer.Wins)
            maxTrainer = trainer[i];

    var q1 = {
        "horse": maxHorse.Name,
        "jockey": maxJockey.Name,
        "trainer": maxTrainer.Name
    }
    console.log(q1);
    console.log(maxHorse.Name);

    ////////////////////////////////////////////

    horse = [];
    jockey = [];
    trainer = [];
    for (var i = 0; i < req.body.data.length; i++) {
        var contestant = req.body.data[i];
        if (contestant.Placing == 1) {
            var index = _.findWhere(horse, { "Name": contestant.Horse });
            if (index === undefined) {
                horse.push({
                    "Index": horse.length,
                    "Name": req.body.data[i].Horse,
                    "Wins": 7
                });
            } else {
                horse[index.Index].Wins += 7;
            }

            index = _.findWhere(jockey, { "Name": contestant.jockeycode });
            if (index === undefined) {
                jockey.push({
                    "Index": jockey.length,
                    "Name": req.body.data[i].jockeycode,
                    "Wins": 7
                });
            } else {
                jockey[index.Index].Wins += 7;
            }

            index = _.findWhere(trainer, { "Name": contestant.Trainer });
            if (index === undefined) {
                trainer.push({
                    "Index": trainer.length,
                    "Name": req.body.data[i].Trainer,
                    "Wins": 7
                });
            } else {
                trainer[index.Index].Wins += 7;
            }
        } else if (contestant.Placing == 2) {
            var index = _.findWhere(horse, { "Name": contestant.Horse });
            if (index === undefined) {
                horse.push({
                    "Index": horse.length,
                    "Name": req.body.data[i].Horse,
                    "Wins": 3
                });
            } else {
                horse[index.Index].Wins += 3;
            }

            index = _.findWhere(jockey, { "Name": contestant.jockeycode });
            if (index === undefined) {
                jockey.push({
                    "Index": jockey.length,
                    "Name": req.body.data[i].jockeycode,
                    "Wins": 3
                });
            } else {
                jockey[index.Index].Wins += 3;
            }

            index = _.findWhere(trainer, { "Name": contestant.Trainer });
            if (index === undefined) {
                trainer.push({
                    "Index": trainer.length,
                    "Name": req.body.data[i].Trainer,
                    "Wins": 3
                });
            } else {
                trainer[index.Index].Wins += 3;
            }
        } else if (contestant.Placing == 3) {
            var index = _.findWhere(horse, { "Name": contestant.Horse });
            if (index === undefined) {
                horse.push({
                    "Index": horse.length,
                    "Name": req.body.data[i].Horse,
                    "Wins": 1
                });
            } else {
                horse[index.Index].Wins++;
            }

            index = _.findWhere(jockey, { "Name": contestant.jockeycode });
            if (index === undefined) {
                jockey.push({
                    "Index": jockey.length,
                    "Name": req.body.data[i].jockeycode,
                    "Wins": 1
                });
            } else {
                jockey[index.Index].Wins++;
            }

            index = _.findWhere(trainer, { "Name": contestant.Trainer });
            if (index === undefined) {
                trainer.push({
                    "Index": trainer.length,
                    "Name": req.body.data[i].Trainer,
                    "Wins": 1
                });
            } else {
                trainer[index.Index].Wins++;
            }
        }
    }

    maxHorse = { "Wins" : 0 };
    maxJockey = { "Wins" : 0 };
    maxTrainer = { "Wins" : 0 };
    for (var i = 0; i < horse.length; i++)
        if (horse[i].Wins > maxHorse.Wins)
            maxHorse = horse[i];

    for (var i = 0; i < jockey.length; i++)
        if (jockey[i].Wins > maxJockey.Wins)
            maxJockey = jockey[i];

    for (var i = 0; i < trainer.length; i++)
        if (trainer[i].Wins > maxTrainer.Wins)
            maxTrainer = trainer[i];

    var q2 = {
        "horse": maxHorse.Name,
        "jockey": maxJockey.Name,
        "trainer": maxTrainer.Name
    }

    //////////////////////////////////////////////

    res.send({
        "q1": q1,
        "q2": q2,
        "q3": ""
    });


//   var horseplace = [{
//     "Name" : "",
//     "Count" : 0
//   }];
//   var jockeyplace = [];
//   var trainerplace = [];
//   var hr_count = 0;
//   var sort = function(field, reverse, primer){
//      var key = primer ?
//          function(x) {return primer(x[field])} :
//          function(x) {return x[field]};
//
//      reverse = !reverse ? 1 : -1;
//
//      return function (a, b) {
//          return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
//        }
//   }
//
//   for(var i = 0; i < req.body.data.length; i++){
//     if(req.body.data[i].Placing == 1){
//         if(horseplace[Name[i]] == req.body.data[i].Horse){
//           horseplace[Count[i]]++
//         }else{
//           horseplace.push({
//           "Name" : req.body.data[i].Horse,
//           "Count" : 1
//           })
//         }
//       }
//   }
//       /*
//       jockeyplace.push({
//         "Jockey" :  req.body.data[i].jockeycode,
//         "Placing" :  req.body.data[i].Placing
//       })
//       trainerplace.push({
//         "Trainer" :  req.body.data[i].Trainer,
//         "Placing" :  req.body.data[i].Placing
//       })
//       */
//   horseplace.sort(sort('Count', true, parseInt));
// //  trainerplace.sort(sort('Count', true, parseInt));
// //  jockeyplace.sort(sort('count', true, parseInt));
//
//
//   var response = {horseplace}
//   res.status(200).send(response);

});

module.exports = router;
