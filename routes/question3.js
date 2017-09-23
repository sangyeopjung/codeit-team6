var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/releaseSchedule', function(req, res, next) {
  //Function that converts string into date obj.
  function convertDate(string_input){
    var day, month, year, hour, minute, second, millisecond, offset_val;
    day = parseInt(string_input.slice(0, 2));
    month =  parseInt(string_input.slice(3, 5));
    year =  parseInt(string_input.slice(6, 10));
    hour =  parseInt(string_input.slice(11, 13));
    minute =  parseInt(string_input.slice(14, 16));
    second =  parseInt(string_input.slice(17, 19));
    millisecond = parseInt(string_input.slice(20, 23));
    offset_val = offset(string_input);
    hour = hour - offset_val;
    if (hour < 0){
      day = day - 1;
      hour = hour + 24;
    }
    return new Date(year, month, day, hour, minute, second, millisecond);
  }

  //Function that fixes date obj. to certain timezone
  function offset(string_input){
    var offset_val;
    if (string_input[23] == 'Z'){
      offset_val = 0;
    }
    else{
      offset_val = parseInt(string_input[25]);
    }
    return offset_val;
  }

  //Function that calculates the time length
  function get_time_length(start, end){
    var time_gap = end.getTime() - start.getTime();
    return time_gap/1000;
  }

  var info = req.body[0];
  var num_of_tasks = info.split(';')[0];
  var lower_bound = convertDate(info.split(';')[1]);
  var upper_bound = convertDate(info.split(';')[2]); // Set up background parameters
  var initial_tf = {
    start: lower_bound,
    end: upper_bound
  };
  console.log(initial_tf.start + "   " + initial_tf.end);
  var available_timeframe = [initial_tf]; //Initialize the array of available timeframes
  for (var ti = 0; ti < num_of_tasks; ti++){
    var task = req.body[ti+1];
    offset(task.split(';')[1]);
    var comparing_tf = {
      start: convertDate(task.split(';')[1]),
      end: convertDate(task.split(';')[2])
    };
    console.log(comparing_tf.start + "   " + comparing_tf.end);
    for (var ai = 0; ai < available_timeframe.length; ai++){
      var curr_tf = available_timeframe[ai];
      //Check if it crosses the lower bound
      if(curr_tf.start < comparing_tf.end && curr_tf.start > comparing_tf.start){
        curr_tf.start = comparing_tf.start;
      }
      else if(curr_tf.end > comparing_tf.start && curr_tf.end < comparing_tf.end){
        curr_tf.end = comparing_tf.end;
      }
      else if(curr_tf.start < comparing_tf.start && curr_tf.end > comparing_tf.end){
        var ending_time = curr_tf.end;
        curr_tf.end = comparing_tf.start;
        var new_tf = {
          start: comparing_tf.end,
          end: ending_time
        };
        available_timeframe.push(new_tf);
      }
    }
  }
  for (var i = 0; i < available_timeframe.length; i++){
    console.log(i + ": " + available_timeframe[i].start + " -> " + available_timeframe[i].end);
  }
  var time_lengths = []
  for (var i = 0; i < available_timeframe.length; i++){
      time_lengths.push(get_time_length(available_timeframe[i].start, available_timeframe[i].end));
  }
  var ans = Math.max.apply(null, time_lengths);
  res.send(ans.toString());
});

module.exports = router;
