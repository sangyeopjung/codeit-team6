var express = require('express');
var router = express.Router();
var roots = require('quadratic-roots');

/* GET users listing. */
router.post('/calculateemptyarea', function(req, res, next) {
  var container_width = req.body.container.width;
  var container_height = req.body.container.height;
  var container_area = container_width * container_height;
  var container_x = req.body.container.coordinate.X ;
  var container_y = req.body.container.coordinate.Y;
  var container_px = container_x + container_width;
  var container_py = container_y + container_height;
  var child_x, child_y;
  var child_width, child_height, child_radius, child_area;
  var child_px, child_py;
  var x_diff, y_diff;
  var empty_area;

  if(req.body.hasOwnProperty("square") == true){
//    child_area = Math.pow(req.body.square.width,2);
    child_width = req.body.square.width;
    child_height = req.body.square.width;
    child_area = child_height * child_width;
    child_x = req.body.square.coordinate.X;
    child_y = req.body.square.coordinate.Y;
    child_px = child_x + child_width;
    child_py = child_y + child_height;
  }else if(req.body.hasOwnProperty("rectangle") == true){
    child_width = req.body.rectangle.width;
    child_height = req.body.rectangle.height;
    child_area = child_height * child_width;
    child_x = req.body.rectangle.coordinate.X;
    child_y = req.body.rectangle.coordinate.Y;
    child_px = child_x + child_width;
    child_py = child_y + child_height;
  }else if(req.body.hasOwnProperty("circle") == true){
    child_radius = req.body.circle.radius;
    child_area = Math.PI * Math.pow(child_radius,2);
    child_x = req.body.circle.center.X;
    child_y = req.body.circle.center.Y;
  }else{
    child_area = 0;
  }

  if(req.body.hasOwnProperty("square") == true ||
    req.body.hasOwnProperty("rectangle") == true){
      if(container_x <= child_x){
          if(container_px <= child_x &&
              container_px < child_px){
                x_diff = 0;
          }else if (container_px > child_x &&
              container_px < child_px) {
                x_diff = child_width + container_px - child_px;
          }else if (container_px > child_x &&
              container_px >= child_px) {
                x_diff= child_width;
          }
      }else if(container_x > child_x){
          if(container_x >= child_px &&
            container_x > child_x){
            x_diff = 0;
          }else if (container_x > child_x &&
            container_x < child_px) {
            x_diff = child_px - container_x;
          }
      }
      {
        if(container_y <= child_y){
            if(container_py <= child_y &&
                container_py < child_py){
                  y_diff = 0;
            }else if (container_py > child_y &&
                container_py < child_py) {
                  y_diff = child_height + container_py - child_py;
            }else if (container_py > child_y &&
                container_py >= child_py) {
                  y_diff= child_height;
            }
        }else if(container_y > child_y){
            if(container_y >= child_py &&
              container_y > child_y){
              y_diff = 0;
            }else if (container_y > child_y &&
              container_y < child_py) {
              y_diff = child_py - container_y;
            }
        }

    }
}
/*
child_radius = req.body.circle.radius;
child_area = Math.PI * Math.pow(child_radius,2);
child_x = req.body.circle.center.X;
child_y = req.body.circle.center.Y;
var container_x = req.body.container.coordinate.X ;
var container_y = req.body.container.coordinate.Y;
var container_px = container_x + container_width;
var container_py = container_y + container_height;
*/

else if(req.body.hasOwnProperty("circle") == true){
  var x_roots = [];
  var y_roots = [];
  //calculate roots for container_x
  var b = -2 * child_y;
  var c = Math.pow(child_y, 2) - Math.pow(child_radius, 2) + Math.pow((container_x - child_x), 2)
  var curr_roots = roots(1, b, c);
  for (var i = 0; i < 2; i++){
    if (curr_roots[i] <= container_py && curr_roots[i] >= container_y){
      y_roots.push([container_x, curr_roots[i]]);
    }
  }
  //calculate roots for container_px
  var b = -2 * child_y;
  var c = Math.pow(child_y, 2) - Math.pow(child_radius, 2) + Math.pow((container_px - child_x), 2)
  var curr_roots = roots(1, b, c);
  for (var i = 0; i < 2; i++){
    if (curr_roots[i] <= container_py && curr_roots[i] >= container_y){
      y_roots.push([container_px, curr_roots[i]]);
    }
  }
  // calculate roots for container_y
  var b = -2 * child_x;
  var c = Math.pow(child_x, 2) - Math.pow(child_radius, 2) + Math.pow((container_y - child_y), 2)
  var curr_roots = roots(1, b, c);
  for (var i = 0; i < 2; i++){
    if (curr_roots[i] <= container_px && curr_roots[i] >= container_x){
      x_roots.push([container_y, curr_roots[i]]);
    }
  }
  // calculate roots for container_py
  var b = -2 * child_x;
  var c = Math.pow(child_x, 2) - Math.pow(child_radius, 2) + Math.pow((container_py - child_y), 2)
  var curr_roots = roots(1, b, c);
  for (var i = 0; i < 2; i++){
    if (curr_roots[i] <= container_px && curr_roots[i] >= container_x){
      x_roots.push([container_py, curr_roots[i]]);
    }
  }

  var inside_area;
  //Divide cases according to number of roots
  var roots = [];
  for (var i = 0; i < x_roots.length; i++){
    if (!roots.includes(x_roots[i])){
      roots.push(x_roots[i]);
    }
  }
  for (var i = 0; i < y_roots.length; i++){
    if (!roots.includes(y_roots[i])){
      roots.push(y_roots[i]);
    }
  }
  var vertices = [[container_x, container_y],[container_x, container_py],[container_px, container_y],[container_px, container_py]];
  var num_roots = roots.length;
  if (num_roots == 0 || num_roots == 1){
    //Totally inside
    if (child_x <= container_px && child_x >= container_x && child_y <= container_py && child_y >= container_y){
      inside_area = Math.PI * Math.pow(child_radius, 2)
    }
    //Totally outside
    else{
      inside_area = 0;
    }
  }
  else if (num_roots == 2){
    var num_vertices = 0;
    for (var i = 0; i < 4; i++){
      var distance = Math.sqrt(Math.pow(child_x - vertices[i][0], 2) + Math.pow(child_y - vertices[i][1], 2));
      if (distance < radius){
        num_vertices++;
      }
    }
    if (num_vertices == 0){
      if (child_x <= container_px && child_x >= container_x && child_y <= container_py && child_y >= container_y){

      }
      else{

      }
    }
    else if (num_vertices == 1){
      
    }
  }

}

      //comparing x coordinates
      /*
      if(container_x < child_x){
        x_diff = child_x - container_x;
        if(container_y < child_y){
          y_diff = child_y - container_y;
        }else if(container_y => child_y){

        }
      }else if(container_x => child_x){
        x_diff = container_x - child_x;
        if(container_y < child_y){

        }else if(container_y => child_y){
          empty_area = container_area - (x_diff * y_diff);
        }
      }else{

      }
      */
//    }else if(req.body.hasOwnProperty("circle") == true){



  var response = [(container_area - (x_diff*y_diff)).toString()]
//  res.send(response.toString());
  res.send(response);


});

module.exports = router;
