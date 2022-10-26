d3.select("#chart1")
  .on("mousemove", function(event) {

    var tooltip = d3.select("#tooltip")
      .style("display", "block")
      .style("left", event.pageX + 20 + "px")
      .style("top", event.pageY + 20 + "px");

    tooltip.select("#name").html("Mexico");

    tooltip.select("#value").html("2.3B");

  })
  .on("mouseout", function() {

    d3.select("#tooltip")
      .style("display", "none");

  });