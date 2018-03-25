/*
Alexander Dammers
10528415
Dataprogressing week 6
Script that creates dropdow menu
*/


// create dropdown menu
function Dropdown() {

    // create dictionary of continents and continent codes
    var options = {"Arab World": "ARB","Central Europe and the Baltics": "CEB", "East Asia & Pacific": "EAS",
                   "Euro Erea": "EMU", "European Union": "EUU", "Latin America & Caribbean": "LCN",
                   "Middle East & North Africa": "MEA", "North America": "NAC", "OECD members": "OED",
                   "South Asia": "SAS", "Sub-Saharan Africa": "SSF", "World": "WLD"};

    // append div
    var select = d3.select("body")
        .append("select")
    	.attr("class","select")
        .on("change", onchange)

    // add option element
    var countries = select.selectAll("option")
        .data(Object.keys(options)).enter()
        .append("option")
        .text(function (d) { return d; });

    // add country code as value
    var country_code = select.selectAll("option")
        .data(Object.values(options)).enter()

    var addvalue = select.selectAll("option")
        .attr("value", function (d) { return d; });

}
