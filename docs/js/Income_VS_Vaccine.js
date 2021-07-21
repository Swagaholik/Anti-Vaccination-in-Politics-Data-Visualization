var dataIncome = [0, 40000, 80000, 120000, 160000, 200000];

var sliderIncome = d3
  .sliderBottom()
  .min(d3.min(dataIncome))
  .max(d3.max(dataIncome))
  .width(600)
  .ticks(5)
  .default(100000)
  .on('onchange', val => {
    // value below to use with other slider to calculate probability
   d3.select('h5#value-mortality').text(d3.format('.2%')(((sliderIncome.value()*(-0.000001119761681))+0.2151074971)+((sliderVaccination.value()*(-0.22244897959184))+0.23422448979592)));
  });

var gIncome = d3
  .select('div#slider-income')
  .append('svg')
  .attr('width', 1000)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');

var dataVaccination = [0, 0.25, 0.5, 0.75, 1];

var sliderVaccination = d3
  .sliderBottom()
  .min(d3.min(dataVaccination))
  .max(d3.max(dataVaccination))
  .width(600)
  .tickFormat(d3.format('.2%'))
  .ticks(5)
  .default(.5)
  .on('onchange', val => {

    d3.select('h5#value-mortality').text(d3.format('.2%')(((sliderIncome.value()*(-0.000001119761681))+0.2151074971)+((sliderVaccination.value()*(-0.22244897959184))+0.23422448979592)));
  });

var gVaccination = d3
  .select('div#slider-vaccination')
  .append('svg')
  .attr('width', 1000)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');
  // .attr('transform', 'translate(-50%,-50%)')
  // .attr('position', absolute)
  // .attr('left': 50%);

gIncome.call(sliderIncome);
    // value below to use with other slider to calculate probability
    // functions to find rates below found from data in Vaccines_Merged(4)
d3.select('h5#value-mortality').text(d3.format('.2%')(((sliderIncome.value()*(-0.000001119761681))+0.2151074971)+((sliderVaccination.value()*(-0.0022244897959184))+0.23422448979592)));

gVaccination.call(sliderVaccination);
// value below to use with other slider to calculate
// probability of child mortality from vaccine-preventable diseases
d3.select('h5#value-mortality').text(d3.format('.2%')(((sliderIncome.value()*(-0.000001119761681))+0.2151074971)+((sliderVaccination.value()*(-0.22244897959184))+0.23422448979592)));

// child mortality pictogram stuff below

//create svg element
// var svgDoc=d3.select("body").append("svg").attr("viewBox","0 0 100 100");
//
//  //define an icon store it in svg <defs> elements as a reusable component - this geometry can be generated from Inkscape, Illustrator or similar
// svgDoc.append("defs")
//     .append("g")
//     .attr("id","iconCustom")
//     .append("path")
//             .attr("d","M915,38c13.381-.181,48.313-2.166,57,2,29.66,14.227,52.66,23.78,68,50l3,1v4l4,1v4l3,1v4c0.38,0.609,3.65,2.394,4,3,1.1,1.879-.98,5.4,1,9,1.17,2.12,6.41,4.016,3,8,10.12,13.557,10.04,57.148,2,73q-0.495,6-1,12h-2c-1.46,2.189-.63,3.734-2,6h-2c-1.2,2.288,1.25,5.668-1,9-0.5.748-3.4,1.267-4,2,0.33,0.667.67,1.333,1,2-1.57,2.123-4.53,4.061-6,6-1.89,2.486-1.12,5.506-3,8-2.14,2.836-6.53,4.433-9,7-0.33,1.333-.67,2.667-1,4l-4,1c-0.33,1.333-.67,2.667-1,4l-4,1c-0.33,1.333-.67,2.667-1,4l-5,1c-1.79,1.116-2.37,4.761-4,6l-5,1c-0.74.55-2.25,3.539-3,4l-7,1c-0.614.413-1.386,3.612-2,4l-8,1c-6.136,3.478-15.6,5.769-22,9H950c-18.624,4.086-43.035-.41-55-7h-5v-2l-7-1c-0.639-.4-2.362-3.611-3-4-3.669-2.238-7.625-.65-11-3-11.551-8.042-28.443-24.785-37-36-3.886-5.093-4.187-11.726-8-17-2.119-2.931-13.647-25.82-10-30-4.6-6.175-6.16-33.59-2-42V137h2c0.214-.379-2.053-4.959-1-7,0.244-.474,3.713-2.513,4-3v-5h2q-0.5-2.5-1-5h2c1.779-3.357.123-5.928,2-9,2.53-4.141,7.494-8.85,10-13V91c0.9-1.225,4.126-1.531,5-3V84l4-1c2.287-2.374,2.52-6.853,5-9l5-1V71c2.04-1.875,5.138-2.983,7-5q0.5-2,1-4c1.375-1.122,7.219-1.849,9-3,1.456-.941,8.1-5.714,6-7,10.36-4.405,19.772-7.267,29-12C907.279,37.805,911.821,40.445,915,38Zm117,1005H844c-0.049-6.28-1.984-20.4-4-25-1.456-3.32,1.043-10.26,1-12-0.333-.33-0.667-0.67-1-1h-1V991h-2V972h-2c-1.662-3.789,1.051-11.743,1-14,1.207-1.882-1.806-.53-2-1V944h-2V928h-2c-1.3-2.967.018-11.461,1-13-4.589-7.636-4.618-36.192-7-47V852c-2.19-4.986-8.54-39.5-5-45-3.443-5.747.271-10.816-2-16-4.3-9.82-4.953-26.411-5-38-9.112-3.521-18.848-9.55-27-14h-5v-2l-7-1c-0.611-.383-2.393-3.645-3-4l-7-1c-0.7-.481-1.3-3.5-2-4l-5-1c-3.351-2.8-1.088-4.931-7-6-1.182-6.54-8.876-10.477-12-15q-0.5-3.5-1-7a81.234,81.234,0,0,1-8-20V496q0.5-15.5,1-31h2q0.5-6.5,1-13h2v-6h2q0.5-5,1-10c0.329-.582,3.632-2.412,4-3q0.5-3.5,1-7h2v-5c0.487-.759,3.344-1.273,4-2q-0.5-1.5-1-3c19.876-31.082,45.828-54,80-73l8-1,4-4h7v-2l12-1v-2h8v-2c7.906-3.6,46.93-1,59-1,29.44,0,71.629-4.885,93,5l12,1c8.9,4.566,19.77,8.936,28,14h4c24.09,16.667,45.8,35.536,63,59,0.33,2.333.67,4.667,1,7,2.34,3.654,6.96,8.141,9,12,0.33,3.333.67,6.667,1,10,0.28,0.5,3.72,2.5,4,3,1.99,3.548.28,8.028,1,10,1.21,3.283,4.45,10.562,6,14,3.18,7.029-1.33,19.9,1,30,1.85,8,1,20.335,1,30v57c0,26.462,3.75,91.393-4,106-9.42,17.736-21.06,33.605-39,46-7.91,5.464-37.03,12.3-41,19-3.81,6.29.05,16.113-3,23-5.92,13.344-1.03,32.257-7,46v17c-3.96,10.165-2.68,34.322-7,47-0.83,2.449,2.41,8.886,1,13-4.52,13.157-3.8,31.288-7,46v16c-3.24,7.38-3.12,19.389-5,28v16C1033.59,1012.77,1032.02,1035.13,1032,1043Zm-56-86c0.619-3.552,1.772-2.427,2-3,1.052-2.644-2.921-10.677-1-15h2V925h2c1.909-4.288-.274-12.9,2-18V895c2.155-9.6,1.57-21.3,5-29v-9c0.08-7,.209-16.571,3-22H884v1c5.515,3.786,1.051,18.2,4,25h2c3.218,7.282-2.5,25.912,1,34,1.778,4.105,6.735,22.394,3,28,2.809,4.439,6.4,29.321,5,34h77Z");
//
// //specify the number of columns and rows for pictogram layout
//   var numCols = 5;
//   var numRows = 2;
//
//   //padding for the grid
//   var xPadding = 10;
//   var yPadding = 15;
//
//   //horizontal and vertical spacing between the icons
//   var hBuffer = 8;
//   var wBuffer = 8;
//
//   //generate a d3 range for the total number of required elements
//   var myIndex=d3.range(numCols*numRows);
//
//   //text element to display number of icons highlighted
//   svgDoc.append("text")
//       .attr("id","txtValue")
//       .attr("x",xPadding)
//       .attr("y",yPadding)
//       .attr("dy",-3)
//       .text("0");
//
// //create group element and create an svg <use> element for each icon
// svgDoc.append("g")
//     .attr("id","pictoLayer")
//     .selectAll("use")
//     .data(myIndex)
//     .enter()
//     .append("use")
//         .attr("xlink:href","#iconCustom")
//         .attr("id",function(d)    {
//             return "icon"+d;
//         })
//         .attr("x",function(d) {
//             var remainder=d % numCols;//calculates the x position (column number) using modulus
//             return xPadding+(remainder*wBuffer);//apply the buffer and return value
//         })
//           .attr("y",function(d) {
//             var whole=Math.floor(d/numCols)//calculates the y position (row number)
//             return yPadding+(whole*hBuffer);//apply the buffer and return the value
//         })
//         .classed("iconPlain",true);
//
// //create a jquery slider to control the pictogram
//  $( "#sliderDiv" ).slider({
//       orientation: "horizontal",
//       min: 0,
//       max: numCols*numRows,
//       value: (((sliderIncome.value()*(-0.000001119761681))+0.2151074971)+((sliderVaccination.value()*(-0.22244897959184))+0.23422448979592)*10),
//       slide: function( event, ui ) {
//         d3.select("#txtValue").text((((sliderIncome.value()*(-0.000001119761681))+0.2151074971)+((sliderVaccination.value()*(-0.22244897959184))+0.23422448979592))*10);
//         d3.selectAll("use").attr("class",function(d,i){
//            if (d<(((sliderIncome.value()*(-0.000001119761681))+0.2151074971)+((sliderVaccination.value()*(-0.22244897959184))+0.23422448979592))*10)  {
//                return "iconSelected";
//            }    else    {
//                return "iconPlain";
//            }
//         });
//       }
//  });
