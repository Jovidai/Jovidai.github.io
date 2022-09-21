d3.csv("qs_world_university_rankings_2017_to_2022_V4.csv")
  .then(function(data) {

    console.log(data);


    //FOREACH

    data.forEach(function(d) {
        d.rank_display = parseFloat(d.rank_display);
        d.faculty_count = parseFloat(d.faculty_count);
    });


   drawBubbles(data);
 })
       
       
       
       function drawBubbles(data){

        // set the dimensions and margins of the graph
        var width = 1000
        var height = 800
        
        var margin = {left: 20, right: 20, top: 20, bottom: 20}
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
        .domain([1, 2, 3, 4, 5, 6])
        .range([ "#BB8FCE", "#A569BD", "#8E44AD","#7D3C98", "#6C3483", "#5B2C6F"])
        
        var radiusScale = d3.scaleLinear()
        .domain([600, 10000])
        .range([60, 20]);
        
        //Tooltip style
        let tooltip = d3.select("#tooltip3")
            .style("z-index", "10")
            .style("padding", "30px")
            .style("background", "white")
            .style("border-radius", "20px")
            .style("color", "#121212")
            .style("box-shadow","15px 10px 20px #6C3483")
            .style("font-family","futura");
        
        // Initialize the circle: all located at the center of the svg area
        var node = svg
            .selectAll("circle")
            .data(data)
            .enter()
            .append("g")
            .append("circle")
            .attr("r", function(d){return radiusScale(d.faculty_count);})
            .attr("cx", innerWidth / 2)
            .attr("cy", innerHeight / 2)
            .style("fill", function(d){ return color(d.type);})
            .style("fill-opacity", 0.8)
        .call(d3.drag() // call specific function when circle is dragged
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
        
        .on("mouseover", function(event, d) {
        tooltip.html(
        
        "University: <b>" +
        d.university +
        "</b></br>Country: <b>" +
        d.country+
        "</b></br>Rank: <b>" +
        d.rank_display+
        "</b></br>Type: <b>" +
        d.type+
        "</b></br>Numbers of faculty: <b>" +
        d.faculty_count+
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
        return d.rank_display;
        })
        .attr("baseline-shift", "-35%");
        
        
        //Start simulation (collection of forces)
        var simulation = d3.forceSimulation()
        
        
        //Moving them to center of SVG
        .force("xCenter", d3.forceX(width/2).strength(.04))
        .force("yCenter", d3.forceY(height/2).strength(.05))
        
        
        //Collision to avoid
        .force("noCollision", d3.forceCollide(function (d) {
        return radiusScale(d.faculty_count) + 3;
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