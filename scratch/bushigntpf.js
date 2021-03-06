/*
*   This file includes all routines related to BushingTpf
*
*/
/****************************************************************************
    load dga data
****************************************************************************/
function loadBushingTpf() {
    var id = localStorage.getItem('dp-tv-id');
    var dt1 = $("#dt1").val();
    var dt2 = $("#dt2").val();

	if (theseAreEmpty([id, dt1, dt2])) return;

	if ($("#showCharts").is(':checked')) {
		if ($("#divShowPolar input[name='chartType']:checked").val() == "polar") {
			$("#div-bushingTpf-polar").show();
			$("#div-bushingTpf-charts").hide();

			loadBushingTpfPolar(id, dt1, dt2);
		}
		else {
			$("#div-bushingTpf-charts").show();
			$("#div-bushingTpf-polar").hide();

			loadBushingTpfCharts(id, dt1, dt2);
		}
	}
	else {
		$("#div-bushingTpf-polar").hide();
		$("#div-bushingTpf-charts").hide();
		refreshChart({data: null, selector: "#chartTpf-pf1"});
		refreshChart({data: null, selector: "#chartTpf-pf2"});
		refreshChart({data: null, selector: "#chartTpf-pf3"});
		refreshChart({data: null, selector: "#chartTpf-cap1"});
		refreshChart({data: null, selector: "#chartTpf-cap2"});
		refreshChart({data: null, selector: "#chartTpf-cap3"});
		refreshChart({data: null, selector: "#chartTpf-perf"});
		refreshChart({data: null, selector: "#chartTpf-curr"});
		refreshChart({data: null, selector: "#chartTpf-la"});
	}
	loadBushingTpfGrids(id, dt1, dt2);
}

function loadBushingTpfPolar(id, dt1, dt2) {
    tpfSlider = document.getElementById('drag-fixed-tpf');
    sumCurrentData = loadCurrentSum(id, dt1, dt2);
    phasorJSON = loadCurrentPhasors(id, dt1, dt2);
    phasorData = phasorJSON['data'];
    phasorStats = phasorJSON['statistics'];
    if (phasorStats != null) {
        phasorJSON = loadCurrentPhasors(id, dt1, dt2);
        phasorData = phasorJSON['data'];
        phasorStats = phasorJSON['statistics'];
        sumVoltageData = loadVoltageSum(id, dt1, dt2);
        renderCurrentSum(sumCurrentData, 0);
        renderPhasor(phasorData, 0);
        renderVoltageSum(sumVoltageData, 0);
        clearSliders();
        clearNoDataMessageTpf();
        renderSlider(sumCurrentData['date'].length - 1);
    } else {
      showNoDataMessageTpf();
    }
}

function showNoDataMessageTpf() {
  console.log("Cleanup this no data message format");
  var noDataMessageDiv = document.getElementById("chart-sub-polar3");
  noDataMessageDiv.innerHTML = "No Data In Range";
  var noDataMessageDiv = document.getElementById("chart-sub-polar4");
  noDataMessageDiv.innerHTML = "No Data In Range";
  var noDataMessageDiv = document.getElementById("chart-sub-polar5");
  noDataMessageDiv.innerHTML = "No Data In Range";
  var noDataMessageDiv = document.getElementById("chart-sub-polar6");
  noDataMessageDiv.innerHTML = "No Data In Range";
}

function clearNoDataMessageTpf() {
  console.log("Cleanup this no data removal message format");
  var noDataMessageDiv = document.getElementById("chart-sub-polar3");
  noDataMessageDiv.innerHTML = "";
  var noDataMessageDiv = document.getElementById("chart-sub-polar4");
  noDataMessageDiv.innerHTML = "";
  var noDataMessageDiv = document.getElementById("chart-sub-polar5");
  noDataMessageDiv.innerHTML = "";
  var noDataMessageDiv = document.getElementById("chart-sub-polar6");
  noDataMessageDiv.innerHTML = "";
}

function loadBushingTpfGrids(id, dt1, dt2) {
    var ip = {
        entityId: id,
        startTime: dt1,
        endTime: dt2,
        format: "grid"
    };

	ajaxCall({
		method: DATA_METHOD.BushingSetTpfSummary,
		input: {
            entityId: id,
            format: "grid"
        },
		ctrlInput: {selector: "#dtTpf-pf", dom: "t", sort: false}
	});

    ip["table"] = DATA_VIEW.BushingSetTpfMeasurements;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {selector: "#dtTpf-meas"}
	});
}

function loadBushingTpfCharts(id, dt1, dt2) {
    var ip = {
        entityId: id,
        startTime: dt1,
        endTime: dt2,
        format: "chart",
        number: null
    };

    ip["number"] = 1;
    ip["table"] = DATA_VIEW.BushingTruePowerFactor;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chartTpf-pf1",
      		y2: "Weekly"
  		}
	});

    ip["number"] = 2;
    ip["table"] = DATA_VIEW.BushingTruePowerFactor;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chartTpf-pf2",
			y2: "Weekly"
	  	}
	});

    ip["number"] = 3;
    ip["table"] = DATA_VIEW.BushingTruePowerFactor;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chartTpf-pf3",
			y2: "Weekly"
	  	}
	});

    ip["number"] = 1;
    ip["table"] = DATA_VIEW.BushingTpfCapacitance;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chartTpf-cap1",
			y2: "Weekly"
	  	}
	});

    ip["number"] = 2;
    ip["table"] = DATA_VIEW.BushingTpfCapacitance;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chartTpf-cap2",
			y2: "Weekly"
	  	}
	});

    ip["number"] = 3;
    ip["table"] = DATA_VIEW.BushingTpfCapacitance;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chartTpf-cap3",
			y2: "Weekly"
	  	}
	});

    ip["number"] = null;
    ip["table"] = DATA_VIEW.BushingSetPerformance;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chartTpf-perf"
	  	}
	});

    ip["table"] = DATA_VIEW.BushingSetCurrentAndVoltage;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chartTpf-curr"
	  	}
	});

    ip["table"] = DATA_VIEW.BushingSetLossAngle;
	ajaxCall({
		method: DATA_METHOD.TableData,
		input: ip,
		ctrlInput: {
			selector: "#chartTpf-la"
	  	}
	});
}
