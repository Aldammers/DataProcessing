/*
Week 3 
Alexander Dammers
10528415
Show bar charts with input of JSON data
*/


// set area for barcharts
var margin = {top: 50, right: 35, bottom: 100, left: 50},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    

  
// set width and height of the SVG element to outer dimension  
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    console.log(chart)
    
// scale x axis
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

// scale y axis
var y = d3.scale.linear()
    .range([height, 0]);

    
// Set x axis at the bottom    
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    
// set y axis at the left of the chart area    
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");
    
    
d3.json(faillissementen.json, function(error, data) {
    console.log(data);



//d3.json("faillissementen.json", function(error, data) {
 // if(error) console.log("Can not load data");


// range scaling of data
    x.domain(data.map(function(d) { return d.Periode; }));
    y.domain([0, d3.max(data, function(d) { return d.Aantal; })]);


// d3.csv("Faillissementen_jan2018.csv", function(error, data) {
// x.domain([0, d3.max(data, function(d) { return d.value; })]);


// create x axis and label it
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-90)")
        .attr("x", "-0.4em")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Aantal Faillissementen");


    // create y axis and label it
    chart.append("g")
        .attr("class", "y axis")
    // .attr("transform", "translate(0," + height + ")")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Aantal Faillissementen");
  
 
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", ".71em");
    
    
    // draw the chartbars 
    chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Periode); })
        .attr("y", function(d) { return y(d.Aantal); })
        .attr("height", function(d) { return height - y(d.Aantal); })
        .attr("width", x.rangeBand());
    
}) 
