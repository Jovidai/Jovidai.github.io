var width = 1000;
var height = 600;

var svg = d3.select("#map1")
         .attr("width", width)
         .attr("height", height);

    svg.select("#ocean")
       .attr("width", width)
       .attr("height", height);

     var map = svg.select("#map"); 

     d3.json("./world-alpha3.json")
       .then(function(world) {

         d3.csv("./qs_world_university_rankings_2017_to_2022_V2.csv")
            .then(function(myData) {


               var currentData = myData.filter(function(d) {
                  return d.year === "2022";
               });

               var countryData = Array.from(d3.group(currentData, 
                  function(d) {
                     return d.country;
                  }),
                  function(group) {

                     var country = group[0];
                     var universities = group[1];

                     var averageScore = d3.mean(universities, function(d) {
                        return d.score;
                     });

                     return  {
                        country: country,
                        count: universities.length,
                        averageScore: averageScore
                     };

                   

                  });

               console.log(countryData);

               console.log(world);
               var geoJSON = topojson.feature(world, world.objects.countries);

               geoJSON.features = geoJSON.features.filter(function(d) {
                  return d.id !== "ATA";
               });

               console.log(geoJSON);

               var proj = d3.geoMercator()
               .fitSize([width, height], geoJSON);

               var path = d3.geoPath()
               .projection(proj);

               var countries = map.selectAll("path")
               .data(geoJSON.features);

               countries.enter().append("path")
                  .attr("d", path)
                  .attr("vector-effect", "non-scaling-stroke")
                  .attr("stroke", "black")
                  .attr("stroke-width", "1px")
                  .attr("fill", function(feature) {

                     var localData = countryData.filter(function(d) {
                        return d.country === feature.properties.name;
                     });

                     if (localData.length) {
                        return "#6C3483";
                     }
                     else {
                        return "gray";
                     }

                  })
                  .on("mousemove", function(event, feature) {

                  var localData = countryData.filter(function(d) {
                  return d.country === feature.properties.name;
                  });
            
                  if (localData.length) {
                  var dataObject = localData[0];
                  d3.select("#tooltip") 
                  .style("display", "block")
                  .style("top", event.pageY + 20 + "px")
                  .style("left", event.pageX + 20 + "px")
                  .html("<b>Country: </b>" + dataObject.country)
                  .html("<b>Count: <b/>" + dataObject.universities.length)
                  .html("<b>Average: </b>" + dataObject.averageScore);
                  }
            
                  })
                  .on("mouseout", function(event, feature) {

                  d3.select("#tooltip")
                  .style("display", "none");
                  })
                
                  });


            var zoom = d3.zoom()
            .translateExtent([[0, 0], [width, height]])
            .scaleExtent([1, 8]) // 8 means if the number is more bigger, you can zoom more in the map.
            .on("zoom", zoomed);

             function zoomed(event) {
               map.attr("transform", event.transform);
         }

             svg.call(zoom);
          
      });

         