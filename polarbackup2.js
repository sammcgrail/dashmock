/*
*   This file includes all routines related to Polar
*	This is POC
*/

/****************************************************************************
    load Polar data
****************************************************************************/
function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}
function renderVoltageSum(sumVoltageData, sliderValue) {
    var sumVoltageTValues = sumVoltageData["t"];
    var sumVoltageRValues = sumVoltageData["r"];
    var tSelected = sumVoltageTValues[sliderValue];
    var rSelected = sumVoltageRValues[sliderValue];
    sliderLength = sumVoltageRValues.length - 1;
    if (sliderValue === sliderLength) {
      var latestColor = "lightgreen";
    } else {
      var latestColor = "orange";
    }

    // sum current chart
    var polarConfig = {
      "data": [
      // data for sum current cloud
      {
        "t": sumVoltageTValues,
        "r": sumVoltageRValues,
        "name": "Voltage Sum",
        "visible": true,
        "color": "blue",
        "geometry": "DotPlot",
    },
      //data for selected point
      {
        "t": [tSelected],
        "r": [rSelected],
        "name": "Selected Point",
        "visible": true,
        "color": "lightgreen",
        "geometry": "DotPlot",
      },
      //data for most recent point
      {
        "t": [sumVoltageTValues[sliderLength]],
        "r": [sumVoltageRValues[sliderLength]],
        "name": "Latest Value",
        "visible": true,
        "color": latestColor,
        "geometry": "DotPlot",
      }
        ],
      "layout": {
        "radialAxis": {
          "domain": [0,100],
          "orientation": -45,
          "visible": true,
          "gridLinesVisible": true,
          "tickOrientation": 'horizontal',
          "ticksSuffix": "mA"
        },
        "angularAxis": {
          "domain": [0,360],
          "visible": true,
          "gridLinesVisible": true,
          "labelsVisible": true,
          "tickOrientation": "horizontal",
          "ticksSuffix": "°"
        },
        "labelOffset": 15,
        "direction": "counterclockwise",
      },
    };
    micropolar.Axis()
    .config(polarConfig)
    .render(d3.select('#chart-sub-polar5'));

}
function renderCurrentSum(sumCurrentData, sliderValue) {
    var sumCurrentTValues = sumCurrentData["t"];
    var sumCurrentRValues = sumCurrentData["r"];
    var tSelected = sumCurrentTValues[sliderValue];
    var rSelected = sumCurrentRValues[sliderValue];
    sliderLength = sumCurrentRValues.length - 1;
    if (sliderValue === sliderLength) {
      var latestColor = "lightgreen";
    } else {
      var latestColor = "orange";
    }


    // sum current chart
    var polarOneConfig = {
      "data": [
      // data for sum current cloud
      {
        "t": sumCurrentTValues,
        "r": sumCurrentRValues,
        "name": "Current Sum",
        "visible": true,
        "color": "blue",
        "geometry": "DotPlot",
    },
      //data for selected point
      {
        "t": [tSelected],
        "r": [rSelected],
        "name": "Selected Point",
        "visible": true,
        "color": "lightgreen",
        "geometry": "DotPlot",
      },
      //data for most recent point
      {
        "t": [sumCurrentTValues[sliderLength]],
        "r": [sumCurrentRValues[sliderLength]],
        "name": "Latest Value",
        "visible": true,
        "color": latestColor,
        "geometry": "DotPlot",
      }
        ],
      "layout": {
        "radialAxis": {
          "domain": setSumRange(sumCurrentData),
          "orientation": -45,
          "visible": true,
          "gridLinesVisible": true,
          "tickOrientation": 'horizontal',
          "ticksSuffix": "mA"
        },
        "angularAxis": {
          "domain": [0,360],
          "visible": true,
          "gridLinesVisible": true,
          "labelsVisible": true,
          "tickOrientation": "horizontal",
          "ticksSuffix": "°"
        },
        "labelOffset": 15,
        "direction": "counterclockwise",
      },
    };
    micropolar.Axis()
    .config(polarOneConfig)
    .render(d3.select('#chart-sub-polar1'));
    micropolar.Axis()
    .config(polarOneConfig)
    .render(d3.select('#chart-sub-polar3'));

}

function renderPhasor(phasorData, sliderValue) {
    var phasorBlueData = phasorData[0];
    var phasorBlueTData = phasorBlueData["t"];
    var phasorBlueRData = phasorBlueData["r"];
    var phasorRedData = phasorData[1];
    var phasorRedTData = phasorRedData["t"];
    var phasorRedRData = phasorRedData["r"];
    var phasorYellowData = phasorData[2];
    var phasorYellowTData = phasorYellowData["t"];
    var phasorYellowRData = phasorYellowData["r"];
    if (phasorData.length > 3) {
        var phasorBlueVoltageData = phasorData[3];
        var phasorBlueVoltageTData = phasorBlueVoltageData["t"];
        var phasorBlueVoltageRData = phasorBlueVoltageData["r"];
        var phasorRedVoltageData = phasorData[4];
        var phasorRedVoltageTData = phasorRedVoltageData["t"];
        var phasorRedVoltageRData = phasorRedVoltageData["r"];
        var phasorYellowVoltageData = phasorData[5];
        var phasorYellowVoltageTData = phasorYellowVoltageData["t"];
        var phasorYellowVoltageRData = phasorYellowVoltageData["r"];
        var polarTwoConfigTpf = {
          "data": [
          {
            "t": [phasorRedTData[sliderValue]],
            "r": [phasorRedRData[sliderValue]],
            "name": "I-R",
            "visible": true,
            "color": "red",
            "geometry": "DotPlot",
          },
          {
            "t": [phasorYellowTData[sliderValue]],
            "r": [phasorYellowRData[sliderValue]],
            "name": "I-Y",
            "visible": true,
            "color": "yellow",
            "geometry": "DotPlot",
          },
          {
            "t": [phasorBlueTData[sliderValue]],
            "r": [phasorBlueRData[sliderValue]],
            "name": "I-B",
            "visible": true,
            "color": "blue",
            "geometry": "DotPlot",
        },
        {
          "t": [phasorRedVoltageTData[sliderValue]],
          "r": [phasorRedVoltageRData[sliderValue]],
          "name": "V-R",
          "visible": true,
          "color": "pink",
          "geometry": "DotPlot",
        },
        {
          "t": [phasorYellowVoltageTData[sliderValue]],
          "r": [phasorYellowVoltageRData[sliderValue]],
          "name": "V-Y",
          "visible": true,
          "color": "orange",
          "geometry": "DotPlot",
        },
        {
          "t": [phasorBlueVoltageTData[sliderValue]],
          "r": [phasorBlueVoltageRData[sliderValue]],
          "name": "V-B",
          "visible": true,
          "color": "lightblue",
          "geometry": "DotPlot",
        }
      ],
          "layout": {
            "radialAxis": {
              "domain": setPhasorRange(phasorStats, "tpf"),
              "orientation": -45,
              "visible": true,
              "gridLinesVisible": true,
              "tickOrientation": 'horizontal',
              "ticksSuffix": "mA"
            },
            "angularAxis": {
              "domain": [0,360],
              "visible": true,
              "gridLinesVisible": true,
              "labelsVisible": true,
              "tickOrientation": "horizontal",
              "ticksSuffix": "°"
            },
            "labelOffset": 15,
            "direction": "counterclockwise",
          },

        };

        micropolar.Axis()
          .config(polarTwoConfigTpf)
          .render(d3.select('#chart-sub-polar4'));

    }
    var polarTwoConfig = {
      "data": [
      {
        "t": [phasorRedTData[sliderValue]],
        "r": [phasorRedRData[sliderValue]],
        "name": "I-R",
        "visible": true,
        "color": "red",
        "geometry": "DotPlot",
      },
      {
        "t": [phasorYellowTData[sliderValue]],
        "r": [phasorYellowRData[sliderValue]],
        "name": "I-Y",
        "visible": true,
        "color": "yellow",
        "geometry": "DotPlot",
      },
      {
        "t": [phasorBlueTData[sliderValue]],
        "r": [phasorBlueRData[sliderValue]],
        "name": "I-B",
        "visible": true,
        "color": "blue",
        "geometry": "DotPlot",
      }],
      "layout": {
        "radialAxis": {
          "domain": setPhasorRange(phasorStats, "rpf"),
          "orientation": -45,
          "visible": true,
          "gridLinesVisible": true,
          "tickOrientation": 'horizontal',
          "ticksSuffix": "mA"
        },
        "angularAxis": {
          "domain": [0,360],
          "visible": true,
          "gridLinesVisible": true,
          "labelsVisible": true,
          "tickOrientation": "horizontal",
          "ticksSuffix": "°"
        },
        "labelOffset": 15,
        "direction": "counterclockwise",
      },

    };
	micropolar.Axis()
	  .config(polarTwoConfig)
	  .render(d3.select('#chart-sub-polar2'));


}

function loadCurrentSum(id, dt1, dt2) {
	var data = {
		format : "polar",
		table : "Sum Currents",
		entityId : id,
		startTime : dt1,
		endTime : dt2
		};
    var sumCurrentAjax = $.ajax({
        method: "POST",
        async: false,
        url: "b/json/gettabledata",
		contentType: "application/json",
		data: JSON.stringify(data)
    });
    return sumCurrentAjax.responseJSON;
}

function loadCurrentPhasors(id, dt1, dt2) {
	var data = {
		format : "sequential",
		entityId : id,
		startTime : dt1,
		endTime : dt2
		};
    var phasorAjax = $.ajax({
        method: "POST",
        async: false,
        url: "b/json/getbushingsetphasors",
		contentType: "application/json",
		data: JSON.stringify(data)
    });
    return phasorAjax['responseJSON'];
}

function loadVoltageSum(id, dt1, dt2) {
	var data = {
		format : "polar",
		table : "Sum Voltages",
		entityId : id,
		startTime : dt1,
		endTime : dt2
		};
    var sumVoltageAjax = $.ajax({
        method: "POST",
        async: false,
        url: "b/json/gettabledata",
		contentType: "application/json",
		data: JSON.stringify(data)
    });

    return sumVoltageAjax.responseJSON;
}

function renderSlider(sliderLength) {
    dragFixedSlider = document.getElementById('drag-fixed');
    dragFixedTpf = document.getElementById('drag-fixed-tpf');
    noUiSlider.create(dragFixedSlider, {
    	start: [ 0 ],
    	step: 1,
    	range: {
    		'min':  0,
    		'max':  ( sliderLength )
    	},
    	pips: {
    	mode: 'range',
    	density: 1
        }
    });
    noUiSlider.create(dragFixedTpf, {
        start: [ 0 ],
        step: 1,
        range: {
            'min':  0,
            'max':  ( sliderLength )
        },
        pips: {
        mode: 'range',
        density: 1
        }
    });
    dragFixedSlider.noUiSlider.on('update', function(){
        sliderValue = parseInt(this.get());
        renderCurrentSum(sumCurrentData, sliderValue);
        renderPhasor(phasorData, sliderValue);
    });
    if (sumVoltageData != null) {
        dragFixedTpf.noUiSlider.on('update', function(){
            sliderValue = parseInt(this.get());
            renderCurrentSum(sumCurrentData, sliderValue);
            renderPhasor(phasorData, sliderValue);
            renderVoltageSum(sumVoltageData, sliderValue);
        });
    }
}

function updateRpfSliderStatus() {
  // change the "data" to reflect the new values
  var rpfStatus = {
    "columns" : [
      {"title" : "Interval"},
      {"title" : "Timestamp"},
      {"title" : "Current Sum Mag"},
      {"title" : "Current Sum PA"},
      {"title" : "I-R Mag"},
      {"title" : "PA1"},
      {"title" : "I-Y Mag"},
      {"title" : "PA2"},
      {"title" : "I-B Mag"},
      {"title" : "PA3"}
    ],
    "data" : [
      ["10", "2016-05-16 11:25:18", "0.17", "9.78", "3.27", "0.17", "9.78", "3.27", "0.17", "0.23"]
    ]
  };

  refreshGrid({
    data: rpfStatus,
    selector: "#dt-RpfPolarStatus",
    dom: "t",
    sort: false
  });
}

function setPhasorRange(phasorStats, type) {
    var rMax = phasorStats['r_max'];
    // var rMin = phasorStats['r_min'];
    if (type == "tpf") {
        var buffer = 40;
        var rangeArray = [ 0, (rMax + buffer)]; // min value 0 for origin at 0
    } else {
        var buffer = 20;
        var rangeArray = [ 0, (rMax + buffer)]; // min value 0 for origin at 0
    }
    return rangeArray
}

function setSumRange (sumData) {
    var rMax = sumData['r_max'];
    // var rMin = sumData['r_min'];
    var rangeArray = [ 0, (rMax + 0.1)];   // min value 0 for origin at 0
    return rangeArray;
}

function clearSliders() {
    if (dragFixedSlider.noUiSlider != null) {
        dragFixedSlider.noUiSlider.destroy();
    }
    if (tpfSlider.noUiSlider != null) {
        tpfSlider.noUiSlider.destroy();
    }
}

function updateTpfSliderStatus() {
}

var sumCurrentData;
var sumCurrenStats;
var phasorData;
var phasorStats;
var phasorJSON;
var sumVoltageData;
var sumVoltageStats;
var sliderValue;
var sliderLength = 20;
var tpfSlider = document.getElementById('drag-fixed-tpf');
var dragFixedSlider = document.getElementById('drag-fixed');
