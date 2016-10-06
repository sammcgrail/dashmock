
(function(){
  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }
})();

var color1 = "#434348";
var color2 = "#7cb5ec";
var color3 = "#E3A869";

$( document ).ready(function() {
  var dates = dateArray(5000);
  var dates1 = dateArray(5000);
  var dates2 = dateArray(5000);
  var dates3 = dateArray(5000);
  var data1 = newDataArray(dates1, randArrayMaker(5000,5,80));
  data1[1000][1] = 3000;
  data1[1004][1] = 3050;
  var data2 = newDataArray(dates2, randArrayMaker(5000,20,123));
  var data3 = newDataArray(dates3, randArrayMaker(5000,10,20));

  $(function () {
      window.chart = new Highcharts.StockChart(  {
          chart: {
            panning: true,
            pinchType: 'x',
            inverted: false,
            renderTo : 'container'
          },
          // title: {
          //     text: 'High Stock Prime Mockup'
          // },
          subtitle: {
              text: '10k points per trace - across 16 years'
          },
          plotOptions: { //multiseries nav
            series: {
              states: {
                  hover: {
                      enabled: false
                  }
              },
              // showInNavigator: true
            }
          },
          xAxis: [{
              // minorTickInterval: 'auto', // GRIDLINES

              // categories: dates,
              // startOnTick: false, // only when navigator enabled
              // endOnTick: false, // only when navigator enabled
              // minPadding: 0,
              // maxPadding: 0,
              ordinal: false,
              // title: {
              //     text: null
              // },
              // labels: {
              //     overflow: 'justify'
              // },
              // showLastLabel: true,
              type: 'datetime'
              // labels: {
              //     formatter: function () {
              //       debugger
              //         return this.value + ' units';
              //     }
              // }
              //  // in Highstock only supported type
          }],
          yAxis: [{ // Primary yAxis
              ordinal: false,
              labels: {
                  format: '{value} °C',
                  style: {
                      color: color3
                  }
              },
              title: {
                  text: 'Temperature',
                  style: {
                      color: color3
                  }
              },
              opposite: false

          }, { // Secondary yAxis
              ordinal: false,
              gridLineWidth: 0,
              title: {
                  text: 'Capacitance',
                  style: {
                      color: color1
                  }
              },
              labels: {
                  format: '{value} pF',
                  style: {
                      color: color1
                  }
              }

          }, { // Tertiary yAxis
              ordinal: false,
              gridLineWidth: 0,
              title: {
                  text: 'Voltage',
                  style: {
                      color: color2
                  }
              },
              labels: {
                  format: '{value} kV',
                  style: {
                      color: color2
                  }
              },
              opposite: true
          },
          { // Primary yAxis
            // ordinal: false,
            top: '110%',
            height: 60,
            right: '-7%',
          	id: 'ynav1',
            visible: false
          }
          ,
          { // Secondary yAxis
            top: '110%',
            height: 60,
          	id: 'ynav2',
            right: '-12%',
            visible: false
          }, { // Tertiary yAxis
            top: '110%',
            height: 60,
            id: 'ynav3',
            visible: false
          }
        ],
          tooltip: {
              shared: true,
              valueDecimals: 2
          },
          rangeSelector: {
              enabled: false
          },
          scrollbar: {
              liveRedraw: false  //set to false to improve performance
          },
          navigator: {
              height: 60,
              enabled: true,
               xAxis: {
                   // minorTickInterval: 'auto', // GRIDLINES

                   // categories: dates,
                   // startOnTick: false, // only when navigator enabled
                   // endOnTick: false, // only when navigator enabled
                   // minPadding: 0,
                   // maxPadding: 0,
                   // ordinal: true,
                   // title: {
                   //     text: null
                   // },
                   // labels: {
                   //     overflow: 'justify'
                   // },
                   // showLastLabel: true,
                   ordinal: false //multiseries nav - smoothing thing
                   // labels: {
                   //     formatter: function () {
                   //       debugger
                   //         return this.value + ' units';
                   //     }
                   // }
                   //  // in Highstock only supported type
               },
               yAxis: [{ // Primary yAxis
                   ordinal: false,
                   opposite: true
               }],

              series: {
                visible: false
              },
              line: {
                dataGrouping: {
                  // smoothed: false
                }
              }
          },
          rangeselector: {
              height: 40
          },
          legend: {
              layout: 'vertical',
              enabled: true,
              align: 'left',
              x: 80,
              verticalAlign: 'top',
              y: 55,
              floating: true,
              backgroundColor: '#FFFFFF'
          },
          series: [{
              name: 'Capacitance',
              type: 'line',
              yAxis: 1,
              data: data1,
              // showInNavigator: true,
              color: color1,
              tooltip: {
                  valueSuffix: ' pF'
              }

          }, {
              name: 'Voltage',
              type: 'line',
              yAxis: 2,
              data: data2,
              color: color2,
              // showInNavigator: true,
              marker: {
                  enabled: false
              },
              tooltip: {
                  valueSuffix: ' kV'
              }

          }, {
              name: 'Temperature',
              type: 'line',
              data: data3,
              color: color3,
              yaxis: 0,
              // showInNavigator: true,
              tooltip: {
                  valueSuffix: ' °C'
              }
          }]
      });



      window.chart.addSeries({
        xAxis: 1,
        yAxis: 'ynav2',
        type: "line",
        enableMouseTracking: false,
        isInternal: true,
        color: color2,
        data : data2,
        showInLegend:false,
        lineWidth: 1
      });

      window.chart.addSeries({
        xAxis: 1,
        yAxis: 'ynav3',
        type: "line",
        enableMouseTracking: false,
        isInternal: true,
        color: color3,
        data : data3,
        showInLegend:false,
        lineWidth: 1
      });

      window.chart.addSeries({
        xAxis: 1,
        yAxis: 'ynav1',
        type: "line",
        enableMouseTracking: false,
        isInternal: true,
        color: color1,
        data : data1,
        showInLegend:false,
        lineWidth: 1
      });









      $('#container2').highcharts( {
          chart: {
            panning: true,
            pinchType: 'x',
            inverted: false
          },
          // title: {
          //     text: 'High Stock Prime Mockup'
          // },
          subtitle: {
              text: 'Prime Random Test Data'
          },
          xAxis: [{
              // categories: dates,
              // startOnTick: false, // only when navigator enabled
              // endOnTick: false, // only when navigator enabled
              // minPadding: 0,
              // maxPadding: 0,
              // ordinal: true,
              // title: {
              //     text: null
              // },
              // labels: {
              //     overflow: 'justify'
              // },
              // showLastLabel: true,
              type: 'datetime',
              crosshair: true
              // labels: {
              //     formatter: function () {
              //       debugger
              //         return this.value + ' units';
              //     }
              // }
              //  // in Highstock only supported type
          }],
          yAxis: [{ // Primary yAxis
              labels: {
                  format: '{value} °C',
                  style: {
                      color: Highcharts.getOptions().colors[2]
                  }
              },
              title: {
                  text: 'Temperature',
                  style: {
                      color: Highcharts.getOptions().colors[2]
                  }
              },
              opposite: true

          }, { // Secondary yAxis
              gridLineWidth: 0,
              title: {
                  text: 'Capacitance',
                  style: {
                      color: Highcharts.getOptions().colors[0]
                  }
              },
              labels: {
                  format: '{value} pF',
                  style: {
                      color: Highcharts.getOptions().colors[0]
                  }
              }

          }, { // Tertiary yAxis
              gridLineWidth: 0,
              title: {
                  text: 'Voltage',
                  style: {
                      color: Highcharts.getOptions().colors[1]
                  }
              },
              labels: {
                  format: '{value} kV',
                  style: {
                      color: Highcharts.getOptions().colors[1]
                  }
              },
              opposite: true
          }],
          tooltip: {
              shared: true,
              valueDecimals: 2
          },
          rangeSelector: {
              enabled: false
          },
          scrollBar: {
            barBackgroundColor: "#bfc8d1",
            barBorderColor: "#bfc8d1",
            barBorderRadius: 0,
            barBorderWidth: 1,
            buttonArrowColor: "#666",
            buttonBackgroundColor: "#ebe7e8",
            buttonBorderColor: "#bbbbbb",
            buttonBorderRadius: 0,
            buttonBorderWidth: 1,
            enabled: true,
            minWidth: 6,
            rifleColor: "#666",
            showFull: true,
            trackBackgroundColor: "#eeeeee",
            trackBorderColor: "#eeeeee",
            trackBorderRadius: 0,
            trackBorderWidth: 1
          },
          navigator: {
              height: 60,
              enabled: true,
        //       xAxis: {
        //           categories: dates,
        //           plotOptions: {
        //             line : {
        //               dataLabels : {
        //                 enabled : true,
        //                 formatter: function() {
        //                   var first = this.series.data[0],
        //                       last  = this.series.data[this.series.data.length - 1];
        //                   if ((this.point.category === first.category && this.point.y === first.y) ||
        //                       (this.point.category === last.category  && this.point.y === last.y)) {
        //                     return this.point.y;
        //                   }
        //                   return "";
        //                 }
        //               },
        //             },
        // }
        //       }
          },
          rangeselector: {
              height: 40
          },
          legend: {
              layout: 'vertical',
              enabled: true,
              align: 'left',
              x: 80,
              verticalAlign: 'top',
              y: 55,
              floating: true,
              backgroundColor: '#FFFFFF'
          },
          series: [{
              name: 'Capacitance',
              type: 'line',
              yAxis: 1,
              data: data1,
              tooltip: {
                  valueSuffix: ' pF'
              }

          }, {
              name: 'Voltage',
              type: 'line',
              yAxis: 2,
              data: data2,
              marker: {
                  enabled: false
              },
              dashStyle: 'shortdot',
              tooltip: {
                  valueSuffix: ' kV'
              }

          }, {
              name: 'Temperature',
              type: 'line',
              data: data3,
              tooltip: {
                  valueSuffix: ' °C'
              }
          }]
      });
  });
});






































function randArrayMaker(length,volatility,constant) {
  data = []
  for ( i = 0; i < length; i++ ) {
       var randNum = 0;
       var randNum = (Math.random() * volatility) + constant;
        data.push(randNum)
  }
  return data
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function dateArray(length) {
  var dateArray = [];
  for ( i = 0; i < length; i++ ) {
    dateArray.push((randomDate(new Date(2000, 0, 1), new Date())))
  }
  dateArray.sortBy(function(o){ return o.date  });
  return dateArray
}

function newDataArray(array1, array2) {
  var result = [];
  for ( var i = 0; i < array1.length; i++ ) {
    result.push( [ array1[i].getTime(), array2[i] ] );
  }
  return result
}

function makeString(array) {
  var newArray = array.slice();
  $.each( newArray , function( index, value ) {
    newArray[index] = value.toString();
  });
  return newArray
}
