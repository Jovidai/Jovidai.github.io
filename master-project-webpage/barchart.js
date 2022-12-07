// set the dimensions and margins of the graph
var margin = {top: 200, right: 150, bottom: 100, left:300},
width = 950,
height = 500;

// append the svg object to the body of the page
var barChartSvg = d3.select("#barchart")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("total_crime_incidents_from_2015_to_2022.csv")
.then(function(data) {
// all of your code goes indside here!

// X axis
var x = d3.scaleBand()
.range([ 0, 1010 ])
.domain(data.map(function(d) { return d.year; }))
.padding(0.5);
barChartSvg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(10,8)rotate(0)")
.style("text-anchor", "end")
.style("font-size", 20)
.style("font-family","Source Serif Pro, serif");

barChartSvg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 165)
    .attr("y", 570)
    .text("Source: City of Boston • Graphic: Zhaozhou Dai")
    .style("font-family","Source Serif Pro, serif");

barChartSvg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 500)
    .attr("y", -100)
    .text("Changes in the Total Number of Crimes in Boston from 2015 to 2022")
    .style("font-family","Source Serif Pro, serif")
    .style("font-size", "35px")
    .style("fill", "#34495E");

barChartSvg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 500)
    .attr("y", -60)
    .text("Includes murder and other crimes -- ")
    .style("font-family","Source Serif Pro, serif")
    .style("font-size", "25px")
    .style("fill", "#34495E");

barChartSvg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 500)
    .attr("y", -30)
    .text("2016 has the highest number of crime")
    .style("font-family","Source Serif Pro, serif")
    .style("font-size", "25px")
    .style("fill", "#34495E");


// Add Y axis
var y = d3.scaleLinear()
.domain([0, 50000])
.range([ height, 0]);
barChartSvg.append("g")
.call(d3.axisLeft(y))
.style("font-size", 20)
.style("font-family","Source Serif Pro, serif");

var tooltip=d3.select("#tooltip2")

// Bars
barChartSvg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.year); })
  .attr("width", x.bandwidth())
  .attr("fill", "#F39C12")
  // if no bar at the beginning :
  .attr("height", function(d) { return height - y(0); }) 
  .attr("y", function(d) { return y(0);})
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseout", mouseout)
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.total_crime_incidents); })
  .attr("height", function(d) { return height - y(d.total_crime_incidents); })
  .delay(function(d,i){console.log(i) ; return(i*100)})

function mousemove(event, d) {
d3.select(this)
.attr("fill","#df8351")
.attr("stroke-width", "1px")
.attr("fill-opacity", "1");
tooltip.style("display", "block")
.style("top", event.pageY + "px")
.style("left", event.pageX + "px")
.html(
  "Year: <b>" +
  d.year+
  "</b></br>Total number of Crime Incidents: <b>" +
  d.total_crime_incidents+
  "</b>"
)
   
}

function mouseover() {
  d3.select(this)
    .attr("fill","#df8351")
    .attr("stroke-width", "1px")
    .attr("fill-opacity", "1");
  tooltip.style("opacity", 1)
       
}

function mouseout() {
  d3.select(this)
    .attr("fill", "#F39C12")
    .attr("stroke-width", ".3")
    .attr("fill-opacity", "1");
  tooltip.style("display", "none");
}

});
