if ($("#landing_page_chart").length > 0) {
  var landing_page_chart = c3.generate({
      bindto: document.getElementById('landing_page_chart'),
      data: {
        x: 'date',
        xFormat: '%Y-%m-%d %H:%M:%S',
        json: {
          "date": ["2015-10-26 14:26:07", "2015-10-26 15:26:07", "2015-10-26 16:26:07", "2015-10-26 17:26:07", "2015-10-26 18:26:07"],
          "Current1": [30, 33, 16, 34, 25],
          "Raw Voltage1": [30, 33, 16, 34, 25],
          "Current2": [70, 33, 26, 34, 25],
          "Raw Voltage2": [30, 33, 16, 34, 25],
          "Current3": [50, 33, 36, 34, 25],
          "Raw Voltage3": [30, 33, 16, 34, 25],
                  },
        hide: ['Raw Voltage1', 'Raw Voltage2', 'Raw Voltage3']
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
            text: 'Current Magnitude mA',
            position: 'outer-middle'
          }
        },
        y2: {
          show: true,
          label: {
            text: 'Raw Voltage',
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
