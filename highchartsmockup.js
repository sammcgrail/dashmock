$(function () {
    $('#container').highcharts('StockChart',  {
        chart: {
            zoomType: 'xy'
        },
        // title: {
        //     text: 'High Stock Prime Mockup'
        // },
        subtitle: {
            text: 'Prime Random Test Data'
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
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
            shared: true
        },
        rangeSelector: {
            enabled: false
        },
        navigator: {
            height: 40
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
            data: randArrayMaker(50,5,80),
            tooltip: {
                valueSuffix: ' pF'
            }

        }, {
            name: 'Voltage',
            type: 'line',
            yAxis: 2,
            data: randArrayMaker(50,20,120),
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' kV'
            }

        }, {
            name: 'Temperature',
            type: 'spline',
            data: randArrayMaker(50,1,20),
            tooltip: {
                valueSuffix: ' °C'
            }
        }]
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
