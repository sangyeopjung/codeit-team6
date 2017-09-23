var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/releaseSchedule', function(req, res, next) {
  console.log(req.body);
  //Function that converts string into date obj.
  function convertDate(string_input){
    /*var day, month, year, hour, minute, second, millisecond, offset_val;
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
    }*/
    var date = string_input.split(' ')[0];
    var time = string_input.split(' ')[1].split('.')[0];
    var mili_offset = string_input.split(' ')[1].split('.')[1];

    var year = parseInt(date.split('-')[2]);
    var month = parseInt(date.split('-')[1]);
    var day = parseInt(date.split('-')[0]);
    var hour = parseInt(time.split(':')[0]);
    var minute = parseInt(time.split(':')[1]);
    var second = parseInt(time.split(':')[2]);
    var millisecond = parseInt(mili_offset.slice(0, 3));
    var offset_str = mili_offset.slice(3, 8);
    var offset_hr, offset_min;
    if (offset_str[0] == 'Z'){
      offset_hr = 0;
      offset_min = 0;
    }
    else if (offset_str[0] == '+'){
      offset_hr = parseInt(offset_str.slice(1, 3));
      offset_min = parseInt(offset_str[3]) * 10 + parseInt(offset_str[4]);
    }
    else if (offset_str[0] == '-'){
      offset_hr = 0 - parseInt(offset_str.slice(1, 3));
      offset_min = 0 - parseInt(offset_str[3]) * 10 + parseInt(offset_str[4]);
    }
    console.log(offset_hr + "--" + offset_min);
    minute = minute - offset_min;
    if (minute < 0){
      hour = hour - 1;
      minute = minute + 60;
    }
    else if (minute >= 60){
      hour = hour + 1;
      minute = minute - 60;
    }
    hour = hour - offset_hr;
    if (hour < 0){
      day = day - 1;
      hour = hour + 60;
    }
    else if (hour >= 24){
      day = day + 1;
      hour = hour - 60;
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
      offset_val = parseInt(string_input.slice(24,26));
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
  /*console.log(initial_tf.start + "   " + initial_tf.end);
  for (var i = 0; i < tasks.length; i++){
    console.log(tasks[i].start + "   " + tasks[i].end);
  }
  */
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
