// set the dimensions and margins of the graph
var margin = {
    top: 30,
    right: 30,
    bottom: 100,
    left: 100
  },
  width = 920 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

var YEAR = 2018;

//SECTION 7 graphics
d3.csv('data/Vaccines_Merged(4).csv').then(function(data) {
  // set the ranges
  var xScale = d3.scaleLinear()
    .range([0, width + margin.right + 70])
    .domain([d3.min(data, function(d) {
      return d.GDPCapita;
    }), d3.max(data, function(d) {
      return d.GDPCapita;
    })]);
  var yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

  //Axis and menu
  var yAxis = 'Tuberculosis Vaccine';
  var xAxis = 'GDP';
  var yAxisOptions = ["Tuberculosis Vaccine", "Diptheria-Tetanus-Pertussis Vaccine",
    "Hepatitis B Vaccine", "Haemophilus Influenzae Type B Vaccine", "Measles-Dose-1 Vaccine",
    "Measles-Dose-2 Vaccine", "At-Birth Tetanus Vaccine", "Pneumococcal Diseases Vaccine", "Polio Vaccine", "Rotavirus Vaccine"];
  var descriptions = {
    "Tuberculosis Vaccine": "BCG Vaccination Rate (%)",
    "Diptheria-Tetanus-Pertussis Vaccine": "DTP3 Vaccination Rate (%)",
    "Hepatitis B Vaccine": "HepB3 Vaccination Rate (%)",
    "Haemophilus Influenzae Type B Vaccine": "Hib3 Vaccination Rate (%)",
    "Measles-Dose-1 Vaccine": "MCV1 Vaccination Rate (%)",
    "Measles-Dose-2 Vaccine": "MCV2 Vaccination Rate (%)",
    "At-Birth Tetanus Vaccine": "PAB Vaccination Rate (%)",
    "Pneumococcal Diseases Vaccine": "PCV3 Vaccination Rate (%)",
    "Polio Vaccine": "Pol3 Vaccination Rate (%)",
    "Rotavirus Vaccine": "ROTAC Vaccination Rate (%)"
  };
  var yAxisKey = {
    "Tuberculosis Vaccine": "BCG",
    "Diptheria-Tetanus-Pertussis Vaccine": "DTP3",
    "Hepatitis B Vaccine": "HepB3",
    "Haemophilus Influenzae Type B Vaccine": "Hib3",
    "Measles-Dose-1 Vaccine": "MCV1",
    "Measles-Dose-2 Vaccine": "MCV2",
    "At-Birth Tetanus Vaccine": "PAB",
    "Pneumococcal Diseases Vaccine": "PCV3",
    "Polio Vaccine": "Pol3",
    "Rotavirus Vaccine": "ROTAC"
  }

  //Create the SVG
  var svg = d3.select("#S7-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right + 75)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .classed('S7-chart', true)
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  //Create the menu and mouse events
  d3.select("#S7-y-axis-menu")
    .selectAll('li')
    .data(yAxisOptions)
    .enter()
    .append('li')
    .text(function(d) {
      return d;
    })
    .classed('selected', function(event, d) {
      return d === yAxis;
    })
    .on('click', function(event, d) {
      yAxis = d;
      updateChart();
      updateMenus();
    });

  //Create the country name text
  svg.append('text')
    .attr("id", 'countryLabel')
    .attr("x", margin.left)
    .attr("y", height/1.5)
    .style('font-size', '48px')
    .style('font-weight', 'bold')
    .style('fill', 'black');

  //Create X Axis
  svg.append("g")
    .attr("transform", "translate(0," + (height) + ")")
    .call(d3.axisBottom(xScale));

  //Create Y axis
  svg.append("g")
    //.attr('transform', 'translate(30, 0)')
    .call(d3.axisLeft(yScale));

  //X axis label
  svg.append("text")
    .attr("id", "xLabel")
    .attr("x", (width / 2))
    .attr("y", height + (margin.bottom / 2))
    .attr("text-anchor", "middle")
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .text(xAxis);

  //Y axis label
  svg.append('text')
    .attr('transform', 'translate( -' + (margin.left / 2) + ',' + (height / 2) + ')rotate(-90)')
    .attr("id", "yLabel")
    .attr("text-anchor", "middle")
    .style('font-weight', 'bold')
    .style('font-size', '20px')
    .text(descriptions[yAxis]);

  //Render the points and the mouse events to get the country label
  svg.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr('cx', function(d) {
      return (!isNaN(d.GDPCapita) && d.GDPCapita != 0 && d[yAxisKey[yAxis]] != 0 && d.Year == YEAR) ? xScale(d.GDPCapita) : d3.select(this).attr('cx');
    })
    .attr('cy', function(d) {
      return (!isNaN(d[yAxisKey[yAxis]]) && d.GDPCapita != 0 &&  d[yAxisKey[yAxis]] != 0 && d.Year == YEAR) ? yScale(d[yAxisKey[yAxis]]) : d3.select(this).attr('cy');
    })
    .attr("fill", "black")
    .style('cursor', 'pointer')
    .on('mouseover', function(event, d) {
      svg.select("#countryLabel")
        .text(d.Country)
        .transition()
        .style('opacity', 1);
    })
    .on('mouseout', function(event, d) {
      d3.select("#countryLabel")
        .transition()
        .duration(1500)
        .style('opacity', 0);
    });

  updateChart(true);
  updateMenus();

  //Updates the chart by plotting the points and new axis label
  function updateChart(init) {
    svg.selectAll('circle')
      .transition()
      .duration(500)
      .ease(d3.easeQuad)
      .attr('cx', function(d) {
        return (!isNaN(d.GDPCapita) && d.GDPCapita != 0 && d[yAxisKey[yAxis]] != 0 && d.Year == YEAR) ? xScale(d.GDPCapita) : d3.select(this).attr('cx');
      })
      .attr('cy', function(d) {
        return (!isNaN(d[yAxisKey[yAxis]]) && d.GDPCapita != 0 && d[yAxisKey[yAxis]] != 0 && d.Year == YEAR) ? yScale(d[yAxisKey[yAxis]]) : d3.select(this).attr('cy');
      })
      .attr('r', function(d) {
        return (!isNaN(d.GDPCapita) && d.GDPCapita != 0 && d[yAxisKey[yAxis]] != 0 && d.Year == YEAR) || (!isNaN(d[yAxisKey[yAxis]]) && d.Year == 2018) ? 5 : 0;
      })
      .style("fill", "black");

    // Update axis labels
    d3.select('#yLabel')
      .text(descriptions[yAxis]);
  }

  //Updates the menu selection
  function updateMenus() {
    d3.select('#S7-y-axis-menu')
      .selectAll('li')
      .classed('selected', function(d) {
        return d === yAxis;
      });
    d3.select('#yLabel')
      .text(descriptions[yAxis]);
  }
})
