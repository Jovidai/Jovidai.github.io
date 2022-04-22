// set the dimensions and margins of the graph
var margin = {top: 40, right: 40, bottom: 30, left: 110},
width = 700 - margin.left - margin.right,
height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#barchart")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("qs_world_university_rankings_2017_to_2022_V3.csv")
.then(function(data) {
// all of your code goes indside here!

// X axis
var x = d3.scaleBand()
.range([ 0, 1010 ])
.domain(data.map(function(d) { return d.university; }))
.padding(0.5);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 3000])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

var tooltip=d3.select("#tooltip2")

// Bars
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.university); })
  .attr("width", x.bandwidth())
  .attr("fill", "#70e000")
  // if no bar at the beginning :
  .attr("height", function(d) { return height - y(0); }) 
  .attr("y", function(d) { return y(0);})
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseout", mouseout)
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.international_students); })
  .attr("height", function(d) { return height - y(d.international_students); })
  .delay(function(d,i){console.log(i) ; return(i*100)})

function mousemove(event, d) {
d3.select(this)
.attr("fill","#55a630")
.attr("stroke-width", "1px")
.attr("fill-opacity", "1");
tooltip.style("display", "block")
.style("top", event.pageY + "px")
.style("left", event.pageX + "px")
.html(
 "Size: <b>" +
   d.size+
   "</b></br>Number of international students: <b>" +
   d.international_students+
   "</b>"
)
   
}

function mouseover() {
  d3.select(this)
    .attr("fill","#55a630")
    .attr("stroke-width", "1px")
    .attr("fill-opacity", "1");
  tooltip.style("opacity", 1)
       
}

function mouseout() {
  d3.select(this)
    .attr("fill", "#70e000")
    .attr("stroke-width", ".3")
    .attr("fill-opacity", "1");
  tooltip.style("display", "none");
}

});



