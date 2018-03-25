/*
Alexander Dammers
10528415
Dataprogressing week 6
Script for loading the linechart, barchart and dropdown script.
*/

var linedata,
    svg,
    div,
    colors;


// parse the time data 
var parseTime = d3.time.format("%Y").parse;

// set the dimensions and margins of the graph
var margin = {top: 50, right: 120, bottom: 220, left: 110},
    width = 1200 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

// create dropdown choice
Dropdown();

// load scripts
window.onload = function(){

    // queu data files
    d3.queue()
        .defer(d3.json, "data_linechart.json")
        .defer(d3.json, "data_barchart.json")
        .await(ready);

    function ready(error, linedata, bar_data) {
        if (error) throw window.alert("Wrong data");
        console.log(linedata);
    
        // drops down a menu
        Dropdown();
        
        // creates a frame for the linechart
        Frame_Linechart(linedata, width, height);
    
        // draw linechart
        Linechart(linedata, "EMU");
    
        // creates a frame for the barchart
        Frame_Barchart(bar_data, width, height);
    
        // creates a legenda
        Legend_Barchart(bar_data, width);
    
        // draws barchart
        Barchart(bar_data, "1999");
        
        // starting value for barchart    
        Year(1999);


    // when new region is selected, update linechart
    d3.select("select")
        .on("change",function(d) {
           
            var selected = d3.select(".select").node().value;
            Linechart(linedata, selected);

            // when selected, change barchart content
            d3.select(".graphcontent")
                .on("click", function(){

                    var selected = document.getElementById("tooltip").innerHTML;
                    Year(selected);
                    Barchart(bar_data, selected);
                })
        });
        
            // when selected, change barchart content
    d3.select(".graphcontent")
        .on("click", function(){

            var selected = document.getElementById("tooltip").innerHTML;
            Barchart(bar_data, selected);
            Year(selected);
            
        })
  };
}
