var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/releaseSchedule', function(req, res, next) {
  console.log(req.body);
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
    console.log(offset_val);
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
    if (string_input[23] == '-'){
      return 0 - offset_val;
    }
    else{
      return offset_val;
    }
  }

  //Function that calculates the time length
  function get_time_length(start, end){
    var time_gap = end.getTime() - start.getTime();
    return time_gap/1000;
  }

  //---------------Main Body-------------------------------------

  //Set initial boundaries and param
  var info = req.body[0];
  var num_of_tasks = info.split(';')[0];
  var lower_bound = convertDate(info.split(';')[1]);
  var upper_bound = convertDate(info.split(';')[2]); // Set up background parameters
  var initial_tf = {
    start: lower_bound,
    end: upper_bound
  };

  //Set array of tasks to run through
  var tasks = []
  for (var ti = 0; ti < num_of_tasks; ti++){
    var task = req.body[ti+1];
    var task_timeframe = {
      start: convertDate(task.split(';')[1]),
      end: convertDate(task.split(';')[2])
    };
    tasks.push(task_timeframe);
  }

  //Output the initial param & tasks timeframes
  console.log(initial_tf.start + "   " + initial_tf.end);
  for (var i = 0; i < tasks.length; i++){
    console.log(tasks[i].start + "   " + tasks[i].end);
  }

  //Find the maximum vacant timeframe
  var max_len = 0;

  //Initialize the starting point of time_run (working pointer)
  var time_run = initial_tf.start;
  //console.log("Original: " + time_run);
  for (var i = 0; i < tasks.length; i++){
    if (time_run < tasks[i].end && time_run > tasks[i].start){
      time_run = tasks[i].end;
    }
  }
  //console.log("Updated: " + time_run);

  //Start the loop
  //console.log("Start Loop! \n");
  while(true){
    var next_timeframe = initial_tf.end;
    var new_timerun;
    //Find the next earliest starting timeframe
    for (var i = 0; i < tasks.length; i++){
      if (tasks[i].start < next_timeframe && tasks[i].start > time_run){
        next_timeframe = tasks[i].start;
        new_timerun = tasks[i].end;
      }
    }
    //console.log(next_timeframe)
    var len = get_time_length(time_run, next_timeframe);
    //console.log("Length: " + len);
    if (len > max_len){
      max_len = len;
    }
    //Check case where there is no such timeframe in the initial param.
    if (next_timeframe == initial_tf.end){
      //console.log("There exists no more timeframe inside the bound.")
      break;
    }
    //Update the timerun, and perform extension of the timerun
    time_run = new_timerun;
    //console.log("Original: " + time_run);
    for (var i = 0; i < tasks.length; i++){
      if (time_run < tasks[i].end && time_run > tasks[i].start){
        time_run = tasks[i].end;
      }
    }
    /*console.log("Updated: " + time_run);
    console.log("New Timerun: " + time_run);
    console.log("------------------------------------------")*/
    //Check if the new timerun exceeds the upper bound
    if (time_run >= initial_tf.end){
      //console.log("The next timeframe exceeds the upper bound.")
      break;
    }
  }
  var max_num = max_len.toFixed(0);
  console.log(max_num.toString());
  res.send(max_num.toString());
});

module.exports = router;
