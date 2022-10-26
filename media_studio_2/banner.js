var url = "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRMp0PFUvYkXWWe6rM5b59FQxrJp9h6pXAT_UikwN3Tp075gi3xIR-gtUvb79AfmylO";

d3.json(url)
  .then(function(data) {

    d3.select("#banner")
      .style("background-image", "url('" + data[0].url + "')");

  });

var bannerPosition = d3.scaleLinear()
  .domain([0, window.innerHeight / 2])
  .range([100, 0]);

d3.select(window)
  .on("scroll", function() {

    var y = bannerPosition(window.scrollY);
    d3.select("#banner")
      .style("background-position", "50% " + y + "%");

  });