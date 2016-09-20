var dates = dateArray(50)
var data1 = newDataArray(dates, randArrayMaker(50,5,80))
var data2 = newDataArray(dates, randArrayMaker(50,5,123))
var data3 = newDataArray(dates, randArrayMaker(50,5,20))

$(function () {
    $('#container').highcharts(  {
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
            labels: {
                formatter: function () {
                  debugger
                    return this.value + ' units';
                }
            }
             // in Highstock only supported type
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
console.log(dateArray(50));

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
    dateArray.push((randomDate(new Date(2000, 0, 1), new Date())).toString())
  }
  return dateArray
}

function newDataArray(array1, array2) {
  result = [];
  for ( var i = 0; i < array1.length; i++ ) {
    result.push( [ array1[i], array2[i] ] );
  }
  return result
}
