/*
Alexander Dammers
10528415
Dataprogressing week 6
Script for an interactive line chart
*/

var x,
    y,
    graph,
    tooltipLine,
    toolTip;

// draw linechart frame
function Frame_Linechart(linedata, width, height) {

    // format the data
    var xData = linedata["EMU"][0]["values"];

    xData.forEach(function(d) {
        d.Age = +d.Age;
        d.year = parseTime(d.year);
    });
    
    // set the ranges for the frame
    x = d3.time.scale().range([0, width]);
    y = d3.scale.linear().range([height, 0]);
  

    // set domain y for Age and domain x for period
    x.domain(d3.extent(xData, function(d) { return d.year; }));
    y.domain([35, 85]);

    // append div
    div = d3.select("body").append("div")
      .attr("id", "graph")

    // append the svg
    svg = d3.select("#graph").append("svg")
        .attr("height", height + margin.top + 80)
        .attr("width", width + margin.left + margin.right)
       .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "graph")

    svg.append("text")
        .attr("id", "line-title")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Life expectations for World Region:");

    // create x axis
    var x_axis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // create y axis
    var y_axis = d3.svg.axis()
        .scale(y)
        .orient("left");      

    // call x and y axis
    d3.select(".graph").append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x_axis)
       .append("text")
        .attr("x", (width / 2))
        .attr("y", 45)
        .style("text-anchor", "middle")
        .text("Year")
        .attr("class", "x axis label");

    d3.select("g").append("g")
        .attr("class", "y axis")
        .call(y_axis)
       .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "2em")
        .style("text-anchor", "middle")
        .text("Life expectancy in years")
        .attr("class", "y axis label");
}

function Linechart(linedata, country) {

    // parse time data
    var parse_time = d3.time.format("%Y").parse;

    // create list
    var linedata = linedata[country]

    for (i = 0; i < 3; i++) {
        linedata[i]["values"].forEach(function(d) {
            if (typeof d.year == "string") {
                d.Age = +d.Age;
                d.year = parse_time(d.year);
            }
        });
    };

    // remove old graph
    var clearpage = d3.selectAll(".graphcontent").remove();


    graph = d3.select(".graph")
       .append("g")
        .attr("class", "graphcontent")
      
    show = graph.selectAll()
        .data(linedata).enter()
       .append("div")
        .attr("class","show value");
        
    tooltipLine = graph.append("line")

    tooltip = graph.selectAll()
        .data(linedata).enter()
       .append("div")
        .attr("id","tooltip");
 
    // create line    
    var line = d3.svg.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.Age); });

 

    graph.selectAll()
        .data(linedata).enter()
       .append("path")
        .attr("fill", "none")
        .attr("stroke", d => d.color)
        .attr("stroke-width", 1.5)
        .datum(d => d.values)
        .attr("d", line);
    
    graph.selectAll()   
        .data(linedata).enter()
       .append("text")
        .html(d => d.serie + ":")
        .attr("fill", d => d.color)
        .attr("alignment-baseline", "middle")
        .attr("x", width)
        .attr("dx", ".5em")
        .attr("y", d => y(d.values[55].Age));

    M_over= graph.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("opacity", 0)
        .on("mousemove", drawTooltip)

        // draw interactive mouse of chart lines
    function drawTooltip() {

        var year = (x.invert(d3.mouse(M_over.node())[0]));
        clearValue = d3.selectAll("#displayed-value").remove();
        clearYear = d3.selectAll("#line-title-year").remove();
       
        // add year to title
        svg.append("text")
            .attr("id", "line-title-year")
            .attr("x", (width / 2) + 190)
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text(year.getFullYear());

        // display values at end of lines
        graph.selectAll()
            .data(linedata).enter()
           .append("text")
            .text(d => d.values.find(h => h.year.getFullYear() == year.getFullYear()).Age + "Y")
            .attr("fill", d => d.color)
            .attr("id", "displayed-value")
            .attr("alignment-baseline", "middle")
            .attr("x", width + 55)
            .attr("dx", ".5em")
            .attr("y", d => y(d.values[55].Age))
        
            // make vertical interactive line
        tooltipLine.attr("stroke", "black")
            .attr("x1", x(year))
            .attr("x2", x(year))
            .attr("y1", height)
            .attr("y2", 0);

        tooltip.html(year.getFullYear())
            .selectAll()
            .data(linedata).enter();

    }
}
