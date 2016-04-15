// declare variables
var width = 960,
    height = 600,
    radius = Math.min(width, height) / 2,
    outerRadius = 300,
    innerRadius = 150;

// console.log(radius);

// ordinal scales have a discrete domain
// D3 scales are functions whose parameters you define. once they are created,
// you call the scale function, pass it a data value, and it nicely returns a
// scaled output value.
var color = d3.scale.ordinal()
    .range(["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#0000ff", "#8000ff", "#ff00ff", "#ff0080"]);

// console.log(color);

var fifths = [
    {"major" : "C", "minor" : "Am"},
    {"major" : "G", "minor" : "Em"},
    {"major" : "D", "minor" : "Bm"},
    {"major" : "A", "minor" : "F#m, Gbm"},
    {"major" : "E", "minor" : "C#m, Dbm"},
    {"major" : "B", "minor" : "G#m"},
    {"major" : "F#, Gb", "minor" : "D#m, Ebm"},
    {"major" : "C#, Db", "minor" : "A#m, Bbm"},
    {"major" : "Ab", "minor" : "Fm"},
    {"major" : "Eb", "minor" : "Cm"},
    {"major" : "Bb", "minor" : "Gm"},
    {"major" : "F", "minor" : "Dm"}
];

// constructs a new arc generator & sets the inner & outer radius
var arc = d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

// makes it easier to create a pie chart
// CONTINUE COMMENTING FROM HERE!!!!!
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        console.log(100 / fifths.length);
        return 100 / fifths.length;
    });

//
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// pass in fifths array
var g = svg.selectAll(".arc")
    .data(pie(fifths))
    .enter().append("g")
    .attr("class", "arc");

g.append("path")
    .attr("d", arc)
    .style("fill", function(d, i) {
        return color(i);
    });

g.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .text(function(d) {
        return d[1];
    });


function type(d) {
    d.population = +d.population;
    return d;
}
