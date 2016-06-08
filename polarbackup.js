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
    // var sumVoltageTValues = sumVoltageData["t"];
    // var sumVoltageRValues = sumVoltageData["r"];
    // var tSelected = sumVoltageTValues[sliderValue];
    // var rSelected = sumVoltageRValues[sliderValue];
    // sliderLength = sumVoltageRValues.length - 1;
    // if (sliderValue === sliderLength) {
    //   var latestColor = "lightgreen";
    // } else {
    //   var latestColor = "orange";
    // }

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

    // console.log("Test of R Value autoscale: " + sumVoltageRValues)
    radialUpperLimitWithBuffer = ( getMaxOfArray(sumVoltageRValues) + 0.15 )
    //   console.log(sumVoltageRValues);
    //   console.log(getMaxOfArray(sumVoltageRValues))
    //   console.log(getMaxOfArray(sumVoltageRValues) + 0.15 )
    //   console.log(radialUpperLimitWithBuffer)

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
          "domain": [0,radialUpperLimitWithBuffer],
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

    // console.log("Test of R Value autoscale: " + sumCurrentRValues)
    radialUpperLimitWithBuffer = ( getMaxOfArray(sumCurrentRValues) + 0.15 )
    //   console.log(sumCurrentRValues);
    //   console.log(getMaxOfArray(sumCurrentRValues))
    //   console.log(getMaxOfArray(sumCurrentRValues) + 0.15 )
    //   console.log(radialUpperLimitWithBuffer)

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
          "domain": [0,radialUpperLimitWithBuffer],
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
        var radialUpperLimitWithBufferPolar = ( getMaxOfArray(phasorBlueVoltageRData) + 20 )
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
              "domain": [0,radialUpperLimitWithBufferPolar],
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
          "domain": [0,80],
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
    return phasorAjax['responseJSON']['data'];
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
    dragFixedTpf.noUiSlider.on('update', function(){
        sliderValue = parseInt(this.get());
        renderCurrentSum(sumCurrentData, sliderValue);
        renderPhasor(phasorData, sliderValue);
        renderVoltageSum(sumVoltageData, sliderValue);
    });
}
var sumCurrentData;
var phasorData;
var sumVoltageData;
var sliderValue;
var sliderLength = 20;
var tpfSlider = document.getElementById('drag-fixed-tpf');
var dragFixedSlider = document.getElementById('drag-fixed');
noUiSlider.create(dragFixedSlider, {
	start: [ 10 ],
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
noUiSlider.create(tpfSlider, {
	start: [ 10 ],
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

$(document).ready(function() {
    $("#side-menu").on("click", ".list-group-item", function(event){
        console.log('clicked');
    });
})

$('a.btn, li.list-group-item, .node-selected').click(function() {
        // var id = localStorage.getItem('dp-tv-id');
        // var dt1 = $("#dt1").val();
        // var dt2 = $("#dt2").val();
        // var tpfSlider = document.getElementById('drag-fixed-tpf');
        // sumCurrentData = loadCurrentSum(id, dt1, dt2);
        // phasorData = loadCurrentPhasors(id, dt1, dt2);
        // renderCurrentSum(sumCurrentData, 0);
        // renderPhasor(phasorData, 0);
        // dragFixedSlider.noUiSlider.destroy();
        // tpfSlider.noUiSlider.destroy();
        // renderSlider(sumCurrentData['date'].length - 1);
});

dragFixedSlider.noUiSlider.on('set', function(){
	sliderValue = parseInt(this.get());
    renderCurrentSum(sumCurrentData, sliderValue);
    renderPhasor(phasorData, sliderValue);
    renderVoltageSum(sumVoltageData, sliderValue);
});
