nv.addGraph(function() {
  var sinandcoschart = nv.models.lineWithFocusChart()
  .useInteractiveGuideline(true);                // use for x axis mark guideline on mouseover
  sinandcoschart.interactiveLayer.tooltip.fixedTop(100);  // so tooltip can contain multiple traces

  sinandcoschart.xAxis
      .axisLabel('Timeseries')
      .tickFormat(d3.format(',f'));
  sinandcoschart.yAxis
      .axisLabel('Capacitance')
      .tickFormat(d3.format(',.2f'));

  sinandcoschart.y2Axis
      .tickFormat(d3.format(',.2f'));

  d3.select('#sinandcoschart svg')
      .datum(sinandcos())
      .transition().duration(500)
      .call(sinandcoschart);

  nv.utils.windowResize(chart.update);

  return chart;
});

function sinandcos(){
  var sin = [],
      cos = [];
      tan = [];

  for (var i = 0; i < 1000; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
    tan.push({x: i, y: Math.tan(i/2000)});
  }

  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: 'lightblue'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: 'lightgrey'
    },
    {
      values: tan,
      key: 'Slow Increase',
      color: 'lightgreen'
    }
  ];
}
