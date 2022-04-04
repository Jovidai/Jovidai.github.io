d3.select("#chart1")
  .on("mousemove", function(event) {

      var tooltip = d3.select("#tooltip")
        .style("display", "block")
        .style("top", event.pageY + 20 + "px")
        .style("left", event.pageX + 20 + "px")

        tooltip.select("#name").html("Mexico");

        tooltip.select("#value").html("2.38");
        
  })
  .on("mouseout", function() {
    d3.select("#tooltip")
      .style("display", "none");
  });










  