nv.addGraph(function() {
  var chart = nv.models.lineWithFocusChart()
  .useInteractiveGuideline(true);                // use for x axis mark guideline on mouseover
  chart.interactiveLayer.tooltip.fixedTop(100);  // so tooltip can contain multiple traces

  chart.xAxis
      .axisLabel('Timeseries')
      .tickFormat(d3.format(',f'))
      .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); });
  chart.yAxis
      .axisLabel('Capacitance')
      .tickFormat(d3.format(',.2f'));

  chart.y2Axis
      .tickFormat(d3.format(',.2f'));

  d3.select('#chart svg')
      .datum(testData())
      .transition().duration(500)
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});


function testData() {
  return stream_layers(3,10000,.1).map(function(data, i) {
    return {
      key: 'Bushing ' + (i + 1) ,
      values: data
    };
  });
}
