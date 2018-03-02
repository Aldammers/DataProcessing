/*
Alexander Dammers
10528415
Dataprogressing week 4
Script that creates a legend 
*/
window.onload = function(){

    // import svg from file
    d3.xml("test_legend.svg", "image/svg+xml", function(error, xml) {
        if (error) throw error;
        document.body.appendChild(xml.documentElement);
    
        // remove legend
        var clearLegend = d3.selectAll("rect").remove();

        // Set names and colors
        var data = d3.scale.ordinal().range(["1", "0.1", "0.01","0.001","0.0001", "Missing Data"]);

        // define legend element
        var legend = d3.select("svg").append("g")
        .selectAll("g")
        .data(data.range())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        // define size of scale of legend    
        var scale = { width: 22, height: 15, padding: 3 };
  
        // add text to legend
        legend.append("text")
        .attr("x", scale.width + scale.padding)
        .attr("y", scale.height - scale.padding)
        .text(function(d) { return d; });

        // define colors of legend rectangles
        var color = d3.scale.ordinal().range(["#bd0026","#f03b20","#fd8d3c","#feb24c","#fed976","#ffffb2"]);

        // add rectangles with color
        legend.append("rect")
        .attr("height", scale.height)
        .attr("width", scale.width)
        .style("fill", color);
    });
}
