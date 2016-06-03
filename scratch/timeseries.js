nv.addGraph(function() {
 var timeseries = nv.models.lineChart();

 timeseries.xAxis
     .axisLabel('Date')
     .rotateLabels(-45)
     .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); });

 timeseries.yAxis
     .axisLabel('DGA')
     .tickFormat(d3.format('d'));

 d3.select('#timeseries svg')
     .datum(fakeActivityByDate())
     .transition().duration(500)
     .call(timeseries);

 nv.utils.windowResize(function() { d3.select('#timeseries svg').call(chart) });

 return chart;
});
function days(num) {
return num*60*60*1000*24
}


function fakeActivityByDate() {
 var lineData = [];
 var y=0;
 var start_date = new Date() - days(365); // one year ago
 for (var i = 0; i < 100; i++) {
   lineData.push({x: new Date(start_date + days(i)), y: y});
   y=y+Math.floor((Math.random()*10)-3);
 }
 return [
   {
     values: lineData,
     key: 'DGA',
     color: '#ff7f0e'
   }
 ];
}
