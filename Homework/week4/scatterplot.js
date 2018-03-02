/*
Dataprogressing
Week 4
10528415
Alexander Dammers
This script displays a scatterplot of the top 15 oil producing countries and their percentage of renewable energy
usage and GDP per capita in 2014.
*/

// define scatterplot margin
var margin = {top: 20, right: 25, bottom: 30, left: 75},
    width = 1400    - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// make scatterplot after page is load
window.onload = function(){

    // define lineair scales for range of x and y axis and dot size
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var w = d3.scale.linear().range([0, 70])

    // colors for different groups
    var color = d3.scale.category10();

    // set x axis
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    // set y axis
    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

    // define the svg element using the scatterplot margin
    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // create tooltip element 
   var tooltip = svg.append("g")
       .attr("class", tooltip)
       .style("display", "none");

    // import csv data
    d3.csv("data.csv", function(error, data) {
        if (error) throw error;
        console.log(data)

        // retransform data 
        data.forEach(function(d) {
            d.LOCATION = d.LOCATION;
            d.OIL_PRODUCTION = +d.OIL_PRODUCTION;
            d.PERCENTAGE_RENEWABLE_ENERGY = +d.PERCENTAGE_RENEWABLE_ENERGY;
            d.GDP = +d.GDP;
        });

        // set x, y and w domains
        x.domain(d3.extent(data, function(d) { return d.PERCENTAGE_RENEWABLE_ENERGY; })).nice();
        y.domain(d3.extent(data, function(d) { return d.GDP; })).nice();
        w.domain(d3.extent(data, function(d) { return d.OIL_PRODUCTION; })).nice();

        // create 'group' element to draw x axis
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .style("font-size", "2em")
        .text("Renewable energy (% of total energy production)");

        // create 'group' element to draw y axis
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "2em")
        .text("GDP (per capita)")

        // create scatter plots in different continents colours
        svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return w(d.OIL_PRODUCTION); })
        .attr("cx", function(d) { return x(d.PERCENTAGE_RENEWABLE_ENERGY); })
        .attr("cy", function(d) { return y(d.GDP); })
        .style("fill", function(d) { return color(d.Continents); })

      
        // The state of the scatterplot when the mouse isn't at the dot
        .on("mouseout", function() {
            tooltip.style("display", "none");
            d3.select(this).attr("r", function(d) { return w(d.OIL_PRODUCTION); })
            .style("fill", function(d) { return color(d.Continents); });
        })
        
        // When the mouse is over the dot
        .on("mouseover", function() {
            tooltip.style("display", null);
            d3.select(this).attr("r", function(d) { return w(d.OIL_PRODUCTION); })
            .style("fill", "#514f40")
        })


        // Add information of hovering mouse over dot
        .on("mousemove", function(d) {
            var position_x = d3.mouse(this)[0] - 25;
            var position_y = d3.mouse(this)[1] - 75;
            tooltip.attr("transform", "translate(" + position_x + "," + position_y + ")");
            tooltip.select("text").text(d.LOCATION +  ", Renewable energy: "
                                    + d.PERCENTAGE_RENEWABLE_ENERGY + "%" + ", GDP per capita: "
                                    + d.GDP + " \n" + ", Oil production: " + d.OIL_PRODUCTION + " Ktoe");
        });
  
        // add components to tooltip
        tooltip.append("text")
        .attr("x", 20)
        .attr("dy", "2em")
        .style("font-size", "1.5em");
    

        // define legend
        var legend = d3.select("svg")
        .append("g")
        .selectAll("g")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
      
        // create text for legend
        legend.append("text")
        .attr("x", width - 24)
        .attr("y", 10)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

        // create colour box for legend
        legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);
    });
}
