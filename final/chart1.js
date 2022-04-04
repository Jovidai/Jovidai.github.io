d3.select("#chart1")
  .on("mousemove", function(event) {

      var tooltip = d3.select("#tooltip")
        .style("display", "block")
        .style("top", event.pageY + 20 + "px")
        .style("left", event.pageX + 20 + "px")

        tooltip.select("#university").html(" ");

        tooltip.select("#year").html(" ");

        tooltip.select("#rank_display").html(" ");
        
  })
  .on("mouseout", function() {
    d3.select("#tooltip")
      .style("display", "none");
  });











  