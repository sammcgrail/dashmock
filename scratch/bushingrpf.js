/*
*   This file includes all routines related to BushingRpf
*
*/

function loadBushingRpf() {
    var id = localStorage.getItem('dp-tv-id');
    var dt1 = $("#dt1").val();
    var dt2 = $("#dt2").val();

	if (theseAreEmpty([id, dt1, dt2])) return;

	if ($("#showCharts").is(':checked')) {
		if ($("#divShowPolar input[name='chartType']:checked").val() == "polar") {
			$("#div-bushingRpf-polar").show();
			$("#div-bushingRpf-charts").hide();

			loadBushingRpfPolar(id, dt1, dt2);
		}
		else {
			$("#div-bushingRpf-charts").show();
			$("#div-bushingRpf-polar").hide();

			loadBushingRpfCharts(id, dt1, dt2);
		}
	}
	else {
		$("#div-bushingRpf-polar").hide();
		$("#div-bushingRpf-charts").hide();
		refreshChart({data: null, selector: "#chart-tcm"});
		refreshChart({data: null, selector: "#chart-pa"});
		refreshChart({data: null, selector: "#chart-pf1"});
		refreshChart({data: null, selector: "#chart-pf2"});
		refreshChart({data: null, selector: "#chart-cap1"});
		refreshChart({data: null, selector: "#chart-cap2"});
	}
	loadBushingRpfGrids(id, dt1, dt2);
}

function loadBushingRpfPolar(id, dt1, dt2) {
    dragFixedSlider = document.getElementById('drag-fixed');
    sumCurrentData = loadCurrentSum(id, dt1, dt2);
    phasorJSON = loadCurrentPhasors(id, dt1, dt2);
    phasorData = phasorJSON['data'];
    phasorStats = phasorJSON['statistics'];
    if (phasorStats != null) {
        renderCurrentSum(sumCurrentData, 0);
        renderPhasor(phasorData, 0);
        clearSliders();
        clearNoDataMessageRpf();
        renderSlider(sumCurrentData['date'].length - 1);
    } else {
      showNoDataMessageRpf();
    }
}

function showNoDataMessageRpf() {
  console.log("Cleanup this no data message format");
  var noDataMessageDiv = document.getElementById("chart-sub-polar1");
  noDataMessageDiv.innerHTML = "No Data In Range";
  var noDataMessageDiv = document.getElementById("chart-sub-polar2");
  noDataMessageDiv.innerHTML = "No Data In Range";
}

function clearNoDataMessageRpf() {
  console.log("Cleanup this no data message removal format");
  var noDataMessageDiv = document.getElementById("chart-sub-polar1");
  noDataMessageDiv.innerHTML = "";
  var noDataMessageDiv = document.getElementById("chart-sub-polar2");
  noDataMessageDiv.innerHTML = "";
}

function loadBushingRpfGrids(id, dt1, dt2) {
    var ip = {
        entityId: id,
        startTime: dt1,
        endTime: dt2,
        format: "grid"
    };

	ajaxCall({
		method: DATA_METHOD.BushingSetSummary,
		input: {
            entityId: id,
            format: "grid"
        },
		ctrlInput: {selector: "#dt-pf", dom: "t", sort: false}
	});

    ip["table"] = DATA_VIEW.BushingSetMeasurements;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {selector: "#dt-meas"}
	});

}

function loadBushingRpfCharts(id, dt1, dt2) {
    var ip = {
        entityId: id,
        startTime: dt1,
        endTime: dt2,
        format: "chart",
        number: null
    };

    ip["table"] = DATA_VIEW.BushingSetCurrent;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
  			selector: "#chart-tcm",
        	y2: "Bushing 3"
  		}
	});

    ip["table"] = DATA_VIEW.BushingSetNormalizedPhase;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chart-pa",
        	y2: "Tap 3"
  		}
	});

    ip["number"] = 1;
    ip["table"] = DATA_VIEW.BushingPowerFactor;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chart-pf1",
      		y2: "Weekly"
  		}
	});

    ip["number"] = 1;
    ip["table"] = DATA_VIEW.BushingCapacitance;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chart-cap1",
			y2: "Weekly"
	  	}
	});

    ip["number"] = 2;
    ip["table"] = DATA_VIEW.BushingPowerFactor;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chart-pf2",
			y2: "Weekly"
	  	}
	});

    ip["number"] = 2;
    ip["table"] = DATA_VIEW.BushingCapacitance;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chart-cap2",
			y2: "Weekly"
	  	}
	});

    ip["number"] = 3;
    ip["table"] = DATA_VIEW.BushingPowerFactor;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chart-pf3",
			y2: "Weekly"
	  	}
	});

    ip["number"] = 3;
    ip["table"] = DATA_VIEW.BushingCapacitance;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chart-cap3",
			y2: "Weekly"
	  	}
	});
}
