/*
Alexander Dammers
10528415
Dataprogressing week 6
Script for a refreshing barchart
*/

var div2,
    svg2;


function Year(selected) {
    var ClearBarChart = d3.selectAll("#barchart-title-year").remove();

    svg2.append("text")
        .attr("id", "barchart-title-year")
        .attr("x", (width / 2) + 155)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(selected);
}

// create function for barchart frame
function Frame_Barchart(bar_data, width, height) {

    div2 = d3.select("body")
       .append("div")
        .attr("id", "barchart")

    var formatValue = d3.format(".2s");
        
        
    svg2 = div2.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", (height) + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "barchart_y")
    

    svg2.append("text")
          .attr("id", "barchart-title")
          .attr("x", (width / 2))
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")
          .style("font-size", "15px")
          .style("text-decoration", "underline")
          .text("Comperison of deaths in region in year: ");

    var countryNames = bar_data["2015"]
        .map(function(d) { return d.country_Name; });
    var serieNames = bar_data["2015"][0]
        .country.map(function(d) { return d.serie; });
    
    
    // scaling of the bar chart frame
    y_1 = d3.scale.linear().range([height, 0]);
    x_1 = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    x_2 = d3.scale.ordinal();

    x_1.domain(countryNames);
    x_2.domain(serieNames)
        .rangeRoundBands([0, x_1.rangeBand()]);
    y_1.domain([0, 5000000]);
    
    // create X and Y axis
    var xAxis = d3.svg.axis()
        .scale(x_1)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y_1)
        .tickFormat(function(d) { return formatValue(d)})
        .orient("left");

    // call X and Y axis
    d3.select(".barchart_y").append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "translate(0," + 10 + ")rotate(-45)")

    d3.select(".barchart_y").append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 80)
        .attr("x", 0 - (height / 2))
        .attr("dy", "3em")
        .style("text-anchor", "middle")
        .text("Number of Deaths")
        .attr("class", "y axis label");
}

// create function for legenda of barchart
function Legend_Barchart(bar_data, width) {
    bar_data = bar_data["1960"]
    
    // create legend with color scheme
    var legend = svg2.selectAll(".legend")
        .data(bar_data[0].country.map(function(d) { 
            return d.serie; }).reverse())
    .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { 
            return "translate(0," + i * 25 + ")"; })
        .style("opacity","0");

    color = d3.scale.ordinal().range(["#e5f5f9","#99d8c9","#2ca25f"]);
    
    legend.append("rect")
        .attr("x", width - 20)
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", function(d) { 
            return color(d); });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d; });
    
    legend.style("opacity","2");
}

// create function for calling and flling single bars in barchart
function Barchart(bar_data, year) {

    // remove old graph
    var clear_barchart = d3.selectAll(".g").remove();

    // create list
    bar_data = bar_data[year]


    var slice = svg2.selectAll(".slice")
        .data(bar_data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { 
            return "translate(" + x_1(d.serie) + ",0)"; });
    
    svg2.select(".y")
        .transition()
        .duration(350)
        .delay(1500)
        .style("opacity","1");

    // create and fill single bar chart
    var single_bar = slice.selectAll("rect")
            .data(function(d) { return d.country; })
           .enter().append("rect")
            .attr("width", x_2.rangeBand())
            .attr("height", function(d) { return height - y_1(0); })
            .attr("y", function(d) { return y_1(0); })
            .attr("x", function(d) { return x_2(d.serie); })
            .style("fill", function(d) { return color(d.serie) })
            .on("mouseover", function(d) {
                d3.select(this).style("fill", "steelblue") })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", color(d.serie)); });


    slice.selectAll("rect")
        .transition()
        .attr("height", function(d) { return height - y_1(d.value); })
        .attr("y", function(d) { return y_1(d.value); })
        .duration(1250);

}
