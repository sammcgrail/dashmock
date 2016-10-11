if ($("#landing_page_chart").length > 0) {
  var landing_page_chart = c3.generate({
      bindto: document.getElementById('landing_page_chart'),
      data: {
        x: 'date',
        xFormat: '%Y-%m-%d %H:%M:%S',
        json: {
          "date": ["2015-10-26 14:26:07", "2015-10-26 15:26:07", "2015-10-26 16:26:07", "2015-10-26 17:26:07", "2015-10-26 18:26:07"],
          "Capacitance1": [30, 33, 16, 34, 25],
          "PowerFactor1": [45, 3, 26, 24, 56],
          "SystemVoltage1": [50, 33, 16, 34, 25],
          "LossAngle1": [30, 63, 26, 34, 25],

          "Capacitance2": [70, 33, 26, 34, 25],
          "PowerFactor2": [85, 3, 26, 24, 56],
          "SystemVoltage2": [90, 33, 16, 34, 25],
          "LossAngle2": [40, 33, 36, 34, 25],

          "Capacitance3": [50, 33, 36, 34, 25],
          "PowerFactor3": [65, 3, 26, 24, 56],
          "SystemVoltage3": [70, 33, 36, 34, 25],
          "LossAngle3": [80, 33, 16, 34, 25]
        },
        hide: ['SystemVoltage1', 'LossAngle1',
              'SystemVoltage2', 'LossAngle2',
              'SystemVoltage3', 'LossAngle3']
      },
      axis: {
        x: {
          label: {
            text: 'Date',
            position: 'outer-center'
          },
          type: 'timeseries',
          tick: {
            format: "%Y-%m-%d %H"
          }
        },
        y: {
          label: {
            text: 'Capacitance',
            position: 'outer-middle'
          }
        },
        y2: {
          show: true,
          label: {
            text: 'True/Relative Power Factor',
            position: 'outer-middle'
          }
        }
      },
      line:     {width: {ratio: 0.5}},
      point:    {show: false},
      tooltip:  {grouped: true},
      subchart: {show: true},
      zoom:     {enabled: true},
      grid:     {x: {show: true},
                 y: {show: true}},
});}

function show_data2() {
    landing_page_chart.show(['data2']);
}
function hide_data2() {
    landing_page_chart.hide(['data2']);
}
function show_data3() {
    landing_page_chart.show(['data3']);
}
function hide_data3() {
    landing_page_chart.hide(['data3']);
}


function show_all() {
    landing_page_chart.show(['data1', 'data2', 'data3']);
}
function hide_all() {
    landing_page_chart.hide(['data1', 'data2', 'data3']);
}
