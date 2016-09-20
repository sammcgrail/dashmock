$(function () {
    $('#container').highcharts('StockChart',  {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'High Stock Prime Mockup'
        },
        subtitle: {
            text: 'Random Data'
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
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
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Capacitance',
            type: 'line',
            yAxis: 1,
            data: [1, 2, 3, 4, 5, 6, 7, 8],
            tooltip: {
                valueSuffix: ' pF'
            }

        }, {
            name: 'Voltage',
            type: 'line',
            yAxis: 2,
            data: [2, 4, 6, 20, 10, 5, 6, 12],
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
            data: [10, 8, 7, 6, 21, 4, 6],
            tooltip: {
                valueSuffix: ' °C'
            }
        }]
    });
});
