var express = require('express');
var router = express.Router();
//var roots = require('quadratic-roots');

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

//  res.send(response.toString());
  else if(req.body.hasOwnProperty("circle") == true){

    if (child_x + child_radius < container_x || child_x - child_radius > container_px){
      inside_area = 0;
      response = [(container_area - inside_area).toFixed(2)]
    }
    else if (child_y + child_radius < container_y || child_y - child_radius > container_py){
      inside_area = 0;
      response = [(container_area - inside_area).toFixed(2)]
    }
    else if (child_x - child_radius >= container_x && child_x + child_radius <= container_px && child_y - child_radius >= container_y && child_y + child_radius < container_py){
      inside_area = Math.PI * Math.pow(child_radius, 2);
      response = [(container_area - inside_area).toFixed(2)]
    }
    else{
    var x_roots = [];
    var y_roots = [];
    var x1_count = 0, x2_count = 0, y1_count = 0, y2_count = 0;
    //calculate roots for container_x
    var b = -2 * child_y;
    var c = Math.pow(child_y, 2) - Math.pow(child_radius, 2) + Math.pow((container_x - child_x), 2)
    var curr_roots = roots(1, b, c);
    console.log(curr_roots)
    for (var i = 0; i < 2; i++){
      if (curr_roots[i] <= container_py && curr_roots[i] >= container_y){
        y_roots.push([container_x, curr_roots[i]]);
        x1_count++;
        console.log("1")
      }
    }
    //calculate roots for container_px
    var b = -2 * child_y;
    var c = Math.pow(child_y, 2) - Math.pow(child_radius, 2) + Math.pow((container_px - child_x), 2)
    var curr_roots = roots(1, b, c);
    for (var i = 0; i < 2; i++){
      if (curr_roots[i] <= container_py && curr_roots[i] >= container_y){
        y_roots.push([container_px, curr_roots[i]]);
        x2_count++;
      }
    }
    // calculate roots for container_y
    var b = -2 * child_x;
    var c = Math.pow(child_x, 2) - Math.pow(child_radius, 2) + Math.pow((container_y - child_y), 2)
    var curr_roots = roots(1, b, c);
    for (var i = 0; i < 2; i++){
      if (curr_roots[i] <= container_px && curr_roots[i] >= container_x){
        x_roots.push([curr_roots[i], container_y]);
        y1_count++;
        console.log("2")
      }
    }
    // calculate roots for container_py
    var b = -2 * child_x;
    var c = Math.pow(child_x, 2) - Math.pow(child_radius, 2) + Math.pow((container_py - child_y), 2)
    var curr_roots = roots(1, b, c);
    for (var i = 0; i < 2; i++){
      if (curr_roots[i] <= container_px && curr_roots[i] >= container_x){
        x_roots.push([curr_roots[i], container_py]);
        y2_count++;
      }
    }
    for (var i = 0; i < x_roots.length; i++){
      console.log("X-Roots: " + x_roots[i]);
    }
    for (var i = 0; i < y_roots.length; i++){
      console.log("Y-Roots: " + y_roots[i]);
    }
    //Calculate number of vertices inside the circle
    var vertices = [[container_x, container_y],[container_x, container_py],[container_px, container_y],[container_px, container_py]];
    var num_vertices = 0;
    var vertices_indicator = [0, 0, 0, 0]
    for (var i = 0; i < 4; i++){
      var distance = Math.sqrt(Math.pow(child_x - vertices[i][0], 2) + Math.pow(child_y - vertices[i][1], 2));
      if (distance < child_radius){
        num_vertices++;
        vertices_indicator++;
      }
    }

    function numerically_integrate(a, b, dx, f) {

	// calculate the number of trapezoids
	n = (b - a) / dx;

	// define the variable for area
	Area = 0;

	//loop to calculate the area of each trapezoid and sum.
	for (i = 1; i <= n; i++) {
		//the x locations of the left and right side of each trapezpoid
		x0 = a + (i-1)*dx;
		x1 = a + i*dx;

		// the area of each trapezoid
		Ai = dx * (f(x0) + f(x1))/ 2.;

		// cumulatively sum the areas
		Area = Area + Ai

	}
	return Area;
}
function f1(x){
	return Math.sqrt(Math.pow(child_radius, 2) - Math.pow((x - child_x), 2)) + child_y;
}
function g1(x){
  return 0 - Math.sqrt(Math.pow(child_radius, 2) - Math.pow((x - child_x), 2)) + child_y;
}
function f2(x){
	return Math.sqrt(Math.pow(child_radius, 2) - Math.pow((x - child_y), 2)) + child_x;
}
function g2(x){
  return 0 - Math.sqrt(Math.pow(child_radius, 2) - Math.pow((x - child_y), 2)) + child_x;
}
    var area = 0;
    if (num_vertices == 0){
      if (y1_count == 2){
        area += container_height * container_width;
        area -= numerically_integrate(Math.min(x_roots[0][0], x_roots[1][0]), Math.max(x_roots[0][0], x_roots[1][0]), 0.0001, f1);
      }
      else if (y2_count == 2){
        area += (Math.min(x_roots[0][0], x_roots[1][0]) - container_x) * container_height;
        area += (container_px - Math.max(x_roots[0][0], x_roots[1][0])) * container_height;
        area += numerically_integrate(Math.min(x_roots[0][0], x_roots[1][0]), Math.max(x_roots[0][0], x_roots[1][0]), 0.0001, g1);
      }
      else if (x1_count == 2){
        area += container_height * container_width;
        area -= numerically_integrate(Math.min(y_roots[0][1], y_roots[1][1]), Math.max(y_roots[0][1], y_roots[1][1]), 0.0001, f2);
      }
      else if (x2_count == 2){
        area += (Math.min(y_roots[0][1], y_roots[1][1]) - container_y) * container_width;
        console.log(area);
        area += (container_py - Math.max(y_roots[0][1], y_roots[1][1])) * container_width;
        console.log(area);
        area += numerically_integrate(Math.min(y_roots[0][1], y_roots[1][1]), Math.max(y_roots[0][1], y_roots[1][1]), 0.0001, g2);
        console.log(area);
      }
    }
    else if (num_vertices == 1){
      if (vertices_indicator[0] == 1){
        area += container_height * container_width;
        area -= numerically_integrate(container_x, x_roots[0][0], 0.0001, f1);
      }
      else if (vertices_indicator[1] == 1){
        area += container_height * (container_px - x_roots[0][0]);
        area -= numerically_integrate(container_x, x_roots[0][0], 0.0001, g1);
      }
      else if (vertices_indicator[2] == 2){
        area += container_height * container_width;
        area -= numerically_integrate(x_roots[0][0], container_px, 0.0001, f1);
      }
      else{
        area += container_height * (x_roots[0][0] - container_x);
        area -= numerically_integrate(x_roots[0][0], container_px, 0.0001, g1);
      }
    }
    response = area.toFixed(2);
    console.log(response);
  }

    response = response.toString();
  }
  res.send(response);

});

module.exports = router;
