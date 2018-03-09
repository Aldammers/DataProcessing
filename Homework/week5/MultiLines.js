




// create graph after page is loaded
window.onload = function(){
    
    
    // set dimension
    var margin = {top: 20, right: 20, bottom: 40, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set and define svg element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        g = svg.append("g").attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

              
    // format time data          
    var parse_Time = d3.timeParse("%Y");

    // set scale range
    var x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]);

    // define all 6 lines
    var line1 = d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d.Date); })
            .y(function(d) { return y(d.Military_Usa); })
        line2 = d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d.Date); })
            .y(function(d) { return y(d.Export_Usa); })
        line3 = d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d.Date); })
            .y(function(d) { return y(d.Import_Usa); })
        line4 = d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d.Date); })
            .y(function(d) { return y(d.Military_Russia); })
        line5 = d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d.Date); })
            .y(function(d) { return y(d.Export_Russia); });
        line6 = d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d.Date); })
            .y(function(d) { return y(d.Import_Russia); });
     

    // Getting the json data
    d3.json("data_samen.json", function(error, data) {
        if (error) throw error;

    // format the data
        data.forEach(function(d)  {
            d.Date = parse_Time(d.Date);
            d.Military_Russia = +d.ME_R;
            d.Military_Usa = +d.ME_U;
            d.Export_Russia = +d.EXP_R;
            d.Export_Usa = +d.EXP_U;
            d.Import_Russia= +d.IMP_R;
            d.Import_Usa = +d.IMP_U;
        });
        
        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.Date; }));
        y.domain([ 0, 63])
        
        // interactive data pointer 
        // create rect
        var Rect = svg.append("rect")
           .attr("x", 1)
           .attr("y", 1)
           .attr("width", width)
           .attr("height", height)
           .attr("fill", "black")
           .attr("opacity", 0);

        // creat a vertical line and horizontal line thats crosses each other
        var vertical = svg.append("line")
           .attr("opacity", 0)
           .attr("y1", 0)
           .attr("y2", height)
           .attr("stroke", "green")
           .attr("stroke-width", 0.5)
           .attr("pointer-events", "none");
        horizontal = svg.append("line")
           .attr("opacity", 0)
           .attr("x1", 0)
           .attr("x2", width)
           .attr("stroke", "green")
           .attr("stroke-width", 0.5)
           .attr("pointer-events", "none");

        // ineractive mouse movement of both lines
        Rect.on("mousemove", function(){
            cross = d3.mouse(this);
            line_x = cross[0];
            line_y = cross[1];
            vertical.attr("x1", line_x).attr("x2", line_x).attr("opacity", 1);
            horizontal.attr("y1", line_y).attr("y2", line_y).attr("opacity", 1)
        })

            .on("mouseout", function(){
                vertical.attr("opacity", 0);
                horizontal.attr("opacity", 0);
            });
     
    // Add three line paths
        g.append("path")
           .data([data])
           .attr("class", "line")
           .attr("d", line4)
           .style("stroke-width", 1.5)
           .style("stroke", "red");

        g.append("path")
           .data([data])
           .attr("class", "line")
           .attr("d", line5)
           .style("stroke-width", 1.5)
           .style("stroke", "lightblue");

        g.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", line6)
            .style("stroke-width", 1)
            .style("stroke", "darkblue");  
        
        // create x axis
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
            
        // define and add text to x axis
        g.append("text")
            .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 15) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .text("Year")
        
        // name graph lines
        g.append("text")
            .attr("transform", "translate(" + ((width/2)+ 400 )+ " ," + (height + margin.top - 65) + ")")
            .style("text-anchor", "middle")
            .text("Military expenditure")
            .style("font-weight", "bold")
            
        g.append("text")
            .attr("transform", "translate(" + ((width/2)+ 400 )+ " ," + (height + margin.top - 170) + ")")
            .style("text-anchor", "middle")
            .text("Exported goods of service")
            .style("font-weight", "bold")
        
        g.append("text")
            .attr("transform", "translate(" + ((width/2)+ 400 )+ " ," + (height + margin.top - 220) + ")")
            .style("text-anchor", "middle")
            .text("Imported goods of service")
            .style("font-weight", "bold")
                
        
          // create y axis
        g.append("g")
           .call(d3.axisLeft(y));

        // define and add text to y axis
        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .text("Percentage of GDP %");
    });
}
       

