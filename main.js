var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

console.log(radius);

// ordinal scales have a discrete domain
// D3 scales are functions whose parameters you define. once they are created,
// you call the scale function, pass it a data value, and it nicely returns a
// scaled output value.
var color = d3.scale.ordinal()
    .range(["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#0000ff", "#8000ff", "#ff00ff", "#ff0080"]);

console.log(color);

var fifths = [
	["C","Am"],
	["G","Em"],
	["D","Bm"],
	["A","F#m, Gbm"],
	["E","C#m, Dbm"],
	["B","G#m"],
	["F#, Gb", "D#m, Ebm"],
	["C#, Db", "A#m", "Bbm"],
	["Ab", "Fm"],
	["Eb","Cm"],
	["Bb","Gm"],
	["F","Dm"]
];

// constructs a new arc generator
var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("data.csv", type, function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.age; });
});

function type(d) {
  d.population = +d.population;
  return d;
}
