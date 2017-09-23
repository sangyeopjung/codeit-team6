var express = require('express');
var router = express.Router();
var roots = require('quadratic-roots');

/* GET users listing. */
router.post('/calculateemptyarea', function(req, res, next) {
  console.log(typeof(req.body.container));
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
  var response;

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
  response = [(container_area - (x_diff*y_diff)).toFixed(2)]
  response = response.toString();
}

<<<<<<< HEAD


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
console.log("container area " + container_area,
            " container x " +  container_x,
            " container y " +  container_y,
            " container width " +  container_width,
            " container height " +  container_height,
            " child x " +  child_x,
            " child y " +  child_y,
            " child width " +  child_width,
            " child height " +  child_height,
            "y - difference " + y_diff);

  var response = [(container_area - (x_diff*y_diff)).toString()];
//  res.send(response.toString());
=======
  else if(req.body.hasOwnProperty("circle") == true){
    if (child_x + child_radius < container_x || child_x - child_radius > container_px){
      inside_area = 0;
    }
    else if (child_y + child_radius < container_y || child_y - child_radius > container_py){
      inside_area = 0;
    }
    else{
      inside_area = Math.PI * Math.pow(child_radius, 2);
    }
    response = [(container_area - inside_area).toFixed(2)]
    response = response.toString();
  }
>>>>>>> f222d79273adc3f419d9d8dbdcc74931a3ce159d
  res.send(response);

});

module.exports = router;
