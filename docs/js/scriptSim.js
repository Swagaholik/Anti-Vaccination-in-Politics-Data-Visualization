var width = 960,
    height = 500,
    radius = 20;

var topology = hexTopology(radius, width, height);

var projection = hexProjection(radius);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select(".sim").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "sim2");

svg.append("g")
    .attr("class", "hexagon")
  .selectAll("path")
    .data(topology.objects.hexagons.geometries)
  .enter().append("path")
    .attr("d", function(d) { return path(topojson.feature(topology, d)); })
    .attr("class", function(d) { return d.fill ? "fill" : null; })
    .on("mousedown", mousedown)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

svg.append("path")
    .datum(topojson.mesh(topology, topology.objects.hexagons))
    .attr("class", "mesh")
    .attr("d", path);

var border = svg.append("path")
    .attr("class", "border")
    //.call(clearAll)
    .call(redraw);

var mousing = 0;

function mousedown(d) {
  mousing = d.fill ? -1 : +1;
  mousemove.apply(this, arguments);
}

function mousemove(d) {
  if (mousing) {
    d3.select(this).classed("fill", d.fill = mousing > 0);
    border.call(redraw);
  }
}

function mouseup() {
  mousemove.apply(this, arguments);
  mousing = 0;
}

function redraw(border) { //This draws the black lines around groups of infected.
  border.attr("d", path(topojson.mesh(topology, topology.objects.hexagons, function(a, b) { return a.fill ^ b.fill; })));
}

function hexTopology(radius, width, height) {
  var dx = radius * 2 * Math.sin(Math.PI / 3),
      dy = radius * 1.5,
      m = Math.ceil((height + radius) / dy) + 1,
      n = Math.ceil(width / dx) + 1,
      geometries = [],
      arcs = [];

  for (var j = -1; j <= m; ++j) {
    for (var i = -1; i <= n; ++i) {
      var y = j * 2, x = (i + (j & 1) / 2) * 2;
      arcs.push([[x, y - 1], [1, 1]], [[x + 1, y], [0, 1]], [[x + 1, y + 1], [-1, 1]]);
    }
  }

  for (var j = 0, q = 3; j < m; ++j, q += 6) {
    for (var i = 0; i < n; ++i, q += 3) {
      geometries.push({
        type: "Polygon",
        arcs: [[q, q + 1, q + 2, ~(q + (n + 2 - (j & 1)) * 3), ~(q - 2), ~(q - (n + 2 + (j & 1)) * 3 + 2)]],
        fill: Math.random() > i / n * 2
      });
    }
  }

  return {
    transform: {translate: [0, 0], scale: [1, 1]},
    objects: {hexagons: {type: "GeometryCollection", geometries: geometries}},
    arcs: arcs
  };
}

function hexProjection(radius) {
  var dx = radius * 2 * Math.sin(Math.PI / 3),
      dy = radius * 1.5;
  return {
    stream: function(stream) {
      return {
        point: function(x, y) { stream.point(x * dx / 2, (y - (2 - (y & 1)) / 3) * dy / 2); },
        lineStart: function() { stream.lineStart(); },
        lineEnd: function() { stream.lineEnd(); },
        polygonStart: function() { stream.polygonStart(); },
        polygonEnd: function() { stream.polygonEnd(); }
      };
    }
  };
}

button = d3.select(".clear").append("svg")
    .attr("width", 250)
    .attr("height", 150);

function clearAll(border){
    d3.selectAll("path").classed("fill", false);
    topology = hexTopology(radius, width, height);
    d3.select(".border").attr("d", path(topojson.mesh(topology, topology.objects.hexagons, function(a, b) { return a.fill ^ b.fill; })));
    redraw(border);
}

function showPercentageOnHex(percent){
    array = d3.select(".hexagon").selectChildren();
    console.log(array);
    infected = Math.round(array.size() * percent);
    console.log(infected)
    d3.select(".hexagon").selectChildren().each(function (d,i) {
        if (infected > 0){
            d3.select(this).classed("fill", true);
        } else {
            d3.select(this).classed("fill", false);
        }
        infected--;
    });
}
clearAll(border);


var df = null;


d3.csv("data/HerdImmunity4.csv", function(data) {

    df = data;
    d3.select(".rangeslider").append("p2").text("Avg Spread Rate (persons): ").append("span2").attr("id", "Rnull").attr("class", "Rnull");
    d3.select(".rangeslider").append("input").attr("type", "range").attr("min", "1.0").attr("max", "5.0").attr("value", "3.5")
                                .attr("step", "0.5").attr("class", "myslider1").attr("id", "RnullSlider");

    //d3.select(".rangeslider").append("p2").text("Spread Variability: ").append("span2").attr("id", "Rrange").attr("class", "Rrange");
    //d3.select(".rangeslider").append("input").attr("type", "range").attr("min", "0.0").attr("max", "1.0").attr("value", "0.0")
     //                           .attr("step", "0.2").attr("class", "myslider2").attr("id", "RrangeSlider");

    d3.select(".rangeslider").append("p2").text("Natural Immunity: ").append("span2").attr("id", "natImmune").attr("class", "natImmune");
    d3.select(".rangeslider").append("input").attr("type", "range").attr("min", "10").attr("max", "90").attr("value", "10")
                                .attr("step", "10").attr("class", "myslider3").attr("id", "natImmuneSlider");

    d3.select(".rangeslider").append("p2").text("Vaccine Immunity: ").append("span2").attr("id", "vacImmune").attr("class", "vacImmune");
    d3.select(".rangeslider").append("input").attr("type", "range").attr("min", "10").attr("max", "100").attr("value", "70")
                                .attr("step", "10").attr("class", "myslider4").attr("id", "vacImmuneSlider");

    d3.select(".rangeslider").append("p2").text("Vaccination rate: ").append("span2").attr("id", "vacRate").attr("class", "vacRate");
    d3.select(".rangeslider").append("input").attr("type", "range").attr("min", "10").attr("max", "100").attr("value", "40")
                                .attr("step", "10").attr("class", "myslider5").attr("id", "vacRateSlider");


    rangeslider1 = document.getElementById("RnullSlider");
    output1 = document.getElementById("Rnull");
    if (parseFloat(rangeslider1.getAttribute("value")) == parseInt(rangeslider1.getAttribute("value"))){
            output1.innerHTML = rangeslider1.getAttribute("value") + ".0";
        } else {
            output1.innerHTML = parseFloat(rangeslider1.getAttribute("value"));
        }

    rangeslider1.oninput = function() {
        if (parseFloat(this.value) == parseInt(this.value)){
            output1.innerHTML = this.value + ".0";
        } else {
            output1.innerHTML = parseFloat(this.value);
        }
    };

/*
    rangeslider2 = document.getElementById("RrangeSlider");
    output2 = document.getElementById("Rrange");
    output2.innerHTML = rangeslider2.value;
    rangeslider2.oninput = function() {
        output2.innerHTML = this.value;
    };
*/
    rangeslider3 = document.getElementById("natImmuneSlider");
    output3 = document.getElementById("natImmune");
    output3.innerHTML = rangeslider3.value + " %";
    rangeslider3.oninput = function() {
        output3.innerHTML = this.value  + " %";
    };

    rangeslider4 = document.getElementById("vacImmuneSlider");
    output4 = document.getElementById("vacImmune");
    output4.innerHTML = rangeslider4.getAttribute("value")+ " %";
    rangeslider4.oninput = function() {
        output4.innerHTML = this.value  + " %";
    };

    rangeslider5 = document.getElementById("vacRateSlider");
    output5 = document.getElementById("vacRate");
    output5.innerHTML = rangeslider5.getAttribute("value") + " %";
    rangeslider5.oninput = function() {
        output5.innerHTML = this.value + " %";
    };
});

var infectedVac = 0;
var infectedUnvac = 0;
var uninfectedVac = 0;
var uninfectedUnvac = 0;

function runSimulation(value) {
    nat = parseFloat(d3.select(".natImmune").text()) / 100.0;
    vacImmune = parseFloat(d3.select(".vacImmune").text()) / 100.0;
    vacRate = parseFloat(d3.select(".vacRate").text()) / 100.0;
    Rrange = 0.0 //d3.select(".Rrange").text();
    population = 100;
    Rnull = d3.select(".Rnull").text();
    var BreakException = {};
    try{
        df.forEach(function(d) {
        if (parseFloat(d.natImmunity) == parseFloat(nat) && parseFloat(d.vacImmunity) == parseFloat(vacImmune) && parseFloat(d.vaccinated) == parseFloat(vacRate) &&
        parseFloat(d.Rrange) == parseFloat(Rrange) && parseFloat(d.Rnull) == parseFloat(Rnull)){
            console.log(d);
            infectedVac = parseFloat(d["Infected vaccinated"]);
            infectedUnvac = parseFloat(d["Infected unvaccinated"]);
            uninfectedUnvac = parseFloat(d["Healthy unvaccinated"]);
            uninfectedVac = parseFloat(d["Healthy vaccinated"]);
            totalInfectedPercent = 0;
            if (!value){
                totalInfectedPercent = d.totInfected;
            } else {
                 totalInfectedPercent = value;
            }
            console.log(totalInfectedPercent);
            showPercentageOnHex(totalInfectedPercent);
            throw BreakException;
        //console.log("NOT FOUND")
    }
  });
  console.log("NOT FOUND");
  }

  catch (e) {
      if (e !== BreakException) {
      throw e;
      }
  }
  console.log(infectedVac)
  //setPie();
}
/*
function setPie() {
    console.log(infectedVac)
      var canvas = d3v3.select('#pie')
						.append('svg')
						.attr({'width':650,'height':500});
        total = infectedVac + infectedUnvac + uninfectedUnvac + uninfectedVac
        console.log(total)
		var data = [{"label":"Infected Vaccinated", "value":infectedVac / total},
            {"label":"Infected UnVaccinated", "value":infectedUnvac / total},
            {"label":"Healthy Vaccinated", "value":uninfectedVac / total},
            {"label": "Healthy Unvaccinated", "value":uninfectedUnvac / total}];

            var colors = ['rgb(96,0,0)', 'rgb(208,0,0)', 'rgb(0,100,0)', 'rgb(0,150,0)'];

		var arc = d3v3.svg.arc()
						.innerRadius(0)
						.outerRadius(100);

		var arcOver = d3v3.svg.arc()
						.innerRadius(0)
        				.outerRadius(150 + 10);

		var pie = d3v3.layout.pie()
						.value(function(d){ return d.value; });


		var renderarcs = canvas.append('g')
						.attr('transform','translate(440,200)')
						.selectAll('.arc')
						.data(pie(data))
						.enter()
						.append('g')
						.attr('class',"arc");

		renderarcs.append('path')
				.attr('d',arc)
				.attr('fill',function(d,i){ return colors[i]; })
				.on("mouseover", function(d) {
		            	d3.select(this).transition()
			               .duration(1000)
			               .attr("d", arcOver);
		             })
				.on("mouseout", function(d) {
		            	d3.select(this).transition()
			               .duration(1000)
			               .attr("d", arc);
		             });

		renderarcs.append('text')
				.attr('transform',function(d) {
						var c = arc.centroid(d);
						console.log(c);
            			return "translate(" + c[0] +"," + c[1]+ ")";
             		})
				.text(function(d){ return d.value+"%"; });
}*/