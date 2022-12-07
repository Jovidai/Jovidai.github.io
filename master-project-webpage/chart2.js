// Parse the Data      
d3.csv("FINAL_Boston_Median_Household_Income.csv")
  .then(function(data) {

    console.log(data);


    //FOREACH

    data.forEach(function(d) {
       // d.police_district = parseFloat(d.police_district);
        d.total_of_population_race_ethnicity = parseFloat(d.total_of_population_race_ethnicity);
        d.total_of_2020_median_household_income = parseFloat(d.total_of_2020_median_household_income);
        d.total_of_2015_median_household_income = parseFloat(d.total_of_2015_median_household_income);
    });


   drawBubbles(data);
 })
       
       function drawBubbles(data){

        // set the dimensions and margins of the graph
        width = 1550,
        height = 550;
        
        var margin = {left: 1120, right: 120, top: 20, bottom: 1120}
        var innerWidth = width;
        var innerHeight = height;
        
        // append the svg object to the body of the page
        var svg = d3.select("#chart2")
        .attr("width", width)
        .attr("height", height);
        console.log("dd",data); 
        
        // A scale that gives a X target position for each group
        var x = d3.scaleOrdinal()
        .domain([1, 2, 3])
        .range([50, 200, 340])
        
        // A color scale
        var color = d3.scaleOrdinal()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        .range([ "#C0392B", "#E74C3C", "#9B59B6", "#7D3C98", "#5499C7", "#2874A6", "#1ABC9C", "#138D75", "#FF6699", "#FF9999", "#FFCC99", "#FFFF99"])
        
        var radiusScale = d3.scaleLinear()
        .domain([600, 1000000])
        .range([60, 20]);
        
        //Tooltip style
        let tooltip = d3.select("#tooltip3")
            .style("z-index", "10")
            .style("padding", "30px")
            .style("background", "white")
            .style("border-radius", "90px")
            .style("color", "#121212")
            .style("box-shadow","15px 10px 20px #1F9DBB")
            .style("font-family","Source Serif Pro, serif");
        
        // Initialize the circle: all located at the center of the svg area
        var node = svg
            .selectAll("circle")
            .data(data)
            .enter()
            .append("g")
            .append("circle")
            .attr("r", function(d){return radiusScale(d.total_of_population_race_ethnicity);})
            .attr("cx", innerWidth / 2)
            .attr("cy", innerHeight / 2)
            .style("fill", function(d){ return color(d.police_district);})
            .style("fill-opacity", 0.8)
        .call(d3.drag() // call specific function when circle is dragged
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
        
        .on("mouseover", function(event, d) {
        tooltip.html(
        
        "Police District: <b>" +
        d.police_district +
        "</b></br>Neighborhood: <b>" +
        d.neighborhood+
        "</b></br>Zip code: <b>" +
        d.zip_code+
        "</b></br>County: <b>" +
        d.county+
        "</b></br>City: <b>" +
        d.city+
        "</b></br>2020 Median Household Income: $<b>" +
        d.total_of_2020_median_household_income  +
        "</b></br>2015 Median Household Income: $<b>" +
        d.total_of_2015_median_household_income  +
        "</b></br>Population of Race & Ethnicity: <b>" +
        d.total_of_population_race_ethnicity+
        "</b></br>White: <b>" +
        d.total_of_white+
        "</b></br>Black: <b>" +
        d.total_of_black +
        "</b></br>Asian <b>" +
        d.total_of_asian+
        "</b></br>Islander: <b>" +
        d.total_of_islander+
        "</b></br>Other: <b>" +
        d.total_of_other+
        "</b></br>Two: <b>" +
        d.total_of_two +
        "</b></br>Hispanic: <b>" +
        d.total_of_hispanic+
        "</b></br>Population of Female: <b>" +
        d.total_of_population_female+
        "</b></br>Population of Male: <b>" +
        d.total_of_population_male+
        "</b>")
        .style("opacity", 1)
        .style("top", event.pageY + 10 + "px")
        .style("left", event.pageX + 10 + "px")
        ;
        
        
        console.log("hover", d);
        })
        .on("mouseout", function() {
        tooltip.html(``).style("opacity", 0);
        });
        
        //Circle labels
        var txt = svg.selectAll("g").append("text");
        txt.attr("y",width / 5)
        .attr("x",height / 5)
        .text(function(d)
        {
        return d.police_district;
        })
        .attr("baseline-shift", "-25%");
        
        
        //Start simulation (collection of forces)
        var simulation = d3.forceSimulation()
        
        
        //Moving them to center of SVG
        .force("xCenter", d3.forceX(width/2).strength(.04))
        .force("yCenter", d3.forceY(height/2).strength(.05))
        
        
        //Collision to avoid
        .force("noCollision", d3.forceCollide(function (d) {
        return radiusScale(d.total_of_population_race_ethnicity) + 3;
        }))
        
        // Apply these forces to the nodes and update their positions.
        // Once the force algorithm is good with positions ('alpha' value is low enough), simulations will stop.
        
            simulation
            .nodes(data)
            .on("tick", function(d){
            node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; });
        
            txt
            .attr("x", function(d){ return d.x; })
            .attr("y", function(d){ return d.y; });
            });
        
        
        // When a circle is dragged?
            function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(.03).restart();
            d.fx = d.x;
            d.fy = d.y;
            }
            function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
            }
            function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(.03);
            d.fx = null;
            d.fy = null;
            }
            }