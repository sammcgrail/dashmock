var svg = d3.select("body").append("svg")    //create the SVG panel
      .attr("width", 150)
      .attr("height", 100);

var circle = svg.append("circle")  //add the circle
      .attr("cx", 50)
      .attr("cy", 50)
      .attr("r",10)
      .style("fill","blue");

setInterval(function(){           //execute the following code every 3 seconds
    circle.transition().duration(500).attr("cx", 100)                 //animate the circle
    .transition().duration(500).delay(500).style("fill","red")
    .transition().duration(500).delay(1000).attr("r",20)
    .transition().duration(500).delay(1500).attr("cx", 50)
    .transition().duration(500).delay(2000).style("fill","blue")
    .transition().duration(500).delay(2500).attr("r",10);
}, 3000);
