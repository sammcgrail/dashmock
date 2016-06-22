nv.models.multiChartWithFocus = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

      var lines = nv.models.line()
        , lines2 = nv.models.line()
        , rlines = nv.models.line()
        , rlines2 = nv.models.line()
        , xAxis = nv.models.axis()
        , x2Axis = nv.models.axis()
        , y1Axis = nv.models.axis()
        , y2Axis = nv.models.axis()
        , y3Axis = nv.models.axis()
        , y4Axis = nv.models.axis()
        , legend = nv.models.legend()
        , brush = d3.svg.brush()
        ;

      var margin = {top: 30, right: 30, bottom: 30, left: 60}
        , margin2 = {top: 0, right: 30, bottom: 20, left: 60}
        , width = null
        , height = null
        , height2 = 100
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , color = nv.utils.defaultColor()
        , showLegend = true
        , extent
        , brushExtent = null
        , tooltips = true
        , tooltip = function(key, x, y, e, graph) {
            return '<h3>' + key + '</h3>' +
                   '<p>' +  y + ' at ' + x + '</p>';
          }
        , x
        , x2
        , y1
        , y2
        , y3
        , y4
        , yDomain1
        , yDomain2
        , noData = "No Data Available."
        , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'brush', 'stateChange', 'changeState')
        , transitionDuration = 0
        , state = nv.utils.state()
        , defaultState = null
        ;


        lines
          .clipEdge(true)
          ;
        lines2
          .interactive(false)
          ;
        xAxis
          .orient('bottom')
          .tickPadding(5)
          ;
        y1Axis
          .orient('left')
          ;
        y2Axis
          .orient('right')
          ;
        x2Axis
          .orient('bottom')
          .tickPadding(5)
          ;
        y3Axis
          .orient('left')
          ;
        y4Axis
          .orient('right')
          ;

        //============================================================
  // Private Variables
  //------------------------------------------------------------



  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines1.x()(e.point, e.pointIndex)),
        y = ((e.series.yAxis == 2) ? yAxis2 : yAxis1).tickFormat()(lines1.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.models.tooltip([left, top], content, undefined, undefined, offsetElement.offsetParent);
  };

  var stateGetter = function(data) {
    return function(){
      return {
        active: data.map(function(d) { return !d.disabled })
      };
    }
  };

  var stateSetter = function(data) {
    return function(state) {
      if (state.active !== undefined)
        data.forEach(function(series,i) {
          series.disabled = !state.active[i];
        });
    }
  };

  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      chart.update = function() { container.transition().call(chart); };
      chart.container = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2,
          availableHeight2 = height2 - margin2.top - margin2.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
      chart.container = this;

      state
        .setter(stateSetter(data), chart.update)
        .getter(stateGetter(data))
        .update();
      state.disabled = data.map(function(d) { return !!d.disabled });
      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight1 / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }




      var dataLines = data.filter(function(d) {return !d.disabled && d.type == 'line' && d.yAxis == 1})
      var dataRLines = data.filter(function(d) {return !d.disabled && d.type == 'line' && d.yAxis == 2})

      x = rlines.xScale();
      x2 = x2Axis.scale();
      y1 = rlines.yScale();
      y2 = lines.yScale();
      y3 = rlines2.yScale();
      y4 = lines2.yScale();

      var series1 = data
        .filter(function(d) {return !d.disabled && d.type == 'line' && d.yAxis == 2})
        .map(function(d) {
          return d.values.map(function(d,i) {
            return { x: getX(d,i), y: getY(d,i) }
          })
        });

      var series2 = data
        .filter(function(d) { return !d.disabled && d.type == 'line' && d.yAxis == 1 })
        .map(function(d) {
          return d.values.map(function(d,i) {
            return { x: getX(d,i), y: getY(d,i) }
          })
        });

        x   .range([0, availableWidth]);

        x2  .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x } ))
            .range([0, availableWidth]);

      var wrap = container.selectAll('g.nv-wrap.multiChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nv-wrap nvd3 nv-multiChart').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-legendWrap');

      var focusEnter = gEnter.append('g').attr('class', 'nv-focus');
      focusEnter.append('g').attr('class', 'nv-x nv-axis');
      focusEnter.append('g').attr('class', 'nv-y1 nv-axis');
      focusEnter.append('g').attr('class', 'nv-y2 nv-axis');
      focusEnter.append('g').attr('class', 'nv-barsWrap');
      focusEnter.append('g').attr('class', 'nv-linesWrap');

      var contextEnter = gEnter.append('g').attr('class', 'nv-context');
      contextEnter.append('g').attr('class', 'nv-x nv-axis');
      contextEnter.append('g').attr('class', 'nv-y1 nv-axis');
      contextEnter.append('g').attr('class', 'nv-y2 nv-axis');
      contextEnter.append('g').attr('class', 'nv-barsWrap');
      contextEnter.append('g').attr('class', 'nv-linesWrap');
      contextEnter.append('g').attr('class', 'nv-brushBackground');
      contextEnter.append('g').attr('class', 'nv-x nv-brush');


      if (showLegend) {
        legend.width( availableWidth / 2 );

        g.select('.nv-legendWrap')
            .datum(data.map(function(series) {
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey + (series.bar ? ' (left axis)' : ' (right axis)');
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
      }


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      rlines2
        .width(availableWidth)
        .height(availableHeight2)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) {  return !data[i].disabled && data[i].type == 'line' && data[i].yAxis == 2  }));

      lines2
        .width(availableWidth)
        .height(availableHeight2)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) {  return !data[i].disabled && data[i].type == 'line' && data[i].yAxis == 2  }));

      var bars2Wrap = g.select('.nv-context .nv-barsWrap')
          .datum(dataRLines.length ? dataRLines : [{values:[]}]);

      var lines2Wrap = g.select('.nv-context .nv-linesWrap')
          .datum(!dataLines[0].disabled ? dataLines : [{values:[]}]);

      g.select('.nv-context')
          .attr('transform', 'translate(0,' + ( availableHeight1 + margin.bottom + margin2.top) + ')')

      bars2Wrap.transition().call(rlines2);
      lines2Wrap.transition().call(lines2);

      brush
        .x(x2)
        .on('brush', onBrush);

      if (brushExtent) brush.extent(brushExtent);

      var brushBG = g.select('.nv-brushBackground').selectAll('g')
          .data([brushExtent || brush.extent()]);

      var brushBGenter = brushBG.enter()
          .append('g');

      brushBGenter.append('rect')
          .attr('class', 'left')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      brushBGenter.append('rect')
          .attr('class', 'right')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      var gBrush = g.select('.nv-x.nv-brush')
          .call(brush);
      gBrush.selectAll('rect')
          //.attr('y', -5)
          .attr('height', availableHeight2);
      gBrush.selectAll('.resize').append('path').attr('d', resizePath);

      x2Axis
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight2, 0);

      g.select('.nv-context .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y3.range()[0] + ')');
      g.select('.nv-context .nv-x.nv-axis').transition()
          .call(x2Axis);


      y3Axis
        .scale(y3)
        .ticks( availableHeight2 / 36 )
        .tickSize( -availableWidth, 0);

      g.select('.nv-context .nv-y1.nv-axis')
          .style('opacity', dataRLines.length ? 1 : 0)
          .attr('transform', 'translate(0,' + x2.range()[0] + ')');

      g.select('.nv-context .nv-y1.nv-axis').transition()
          .call(y3Axis);


      y4Axis
        .scale(y4)
        .ticks( availableHeight2 / 36 )
        .tickSize(dataRLines.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

      g.select('.nv-context .nv-y2.nv-axis')
          .style('opacity', dataLines.length ? 1 : 0)
          .attr('transform', 'translate(' + x2.range()[1] + ',0)');

      g.select('.nv-context .nv-y2.nv-axis').transition()
          .call(y4Axis);

      legend.dispatch.on('stateChange', function(newState) {
        for (var key in newState)
          state[key] = newState[key];
        dispatch.stateChange(state);
        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

        // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {
        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });
          state.disabled = e.disabled;
        }
        chart.update();
      });

      // Taken from crossfilter (http://square.github.com/crossfilter/)
      function resizePath(d) {
        var e = +(d == 'e'),
            x = e ? 1 : -1,
            y = availableHeight2 / 3;
        return 'M' + (.5 * x) + ',' + y
            + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
            + 'V' + (2 * y - 6)
            + 'A6,6 0 0 ' + e + ' ' + (.5 * x) + ',' + (2 * y)
            + 'Z'
            + 'M' + (2.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8)
            + 'M' + (4.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8);
      }


      function updateBrushBG() {
        if (!brush.empty()) brush.extent(brushExtent);
        brushBG
            .data([brush.empty() ? x2.domain() : brushExtent])
            .each(function(d,i) {
              var leftWidth = x2(d[0]) - x2.range()[0],
                  rightWidth = x2.range()[1] - x2(d[1]);
              d3.select(this).select('.left')
                .attr('width',  leftWidth < 0 ? 0 : leftWidth);

              d3.select(this).select('.right')
                .attr('x', x2(d[1]))
                .attr('width', rightWidth < 0 ? 0 : rightWidth);
            });
      }


      function onBrush() {
        brushExtent = brush.empty() ? null : brush.extent();
        extent = brush.empty() ? x2.domain() : brush.extent();


        dispatch.brush({extent: extent, brush: brush});

        updateBrushBG();

        //------------------------------------------------------------
        // Prepare Main (Focus) Bars and Lines

        rlines
        .width(availableWidth)
        .height(availableHeight1)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && data[i].type == 'line' && data[i].yAxis == 2 }));


        lines
        .width(availableWidth)
        .height(availableHeight1)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && data[i].type == 'line' && data[i].yAxis == 1 }));

        if (dataRLines.length > 0) {
          var tempTest = dataRLines;
        } else {
          var tempTest = [{values:[]}];
        }

        var focusBarsWrap = g.select('.nv-focus .nv-barsWrap').datum(tempTest.map(function(d,i) {
                  return {
                    key: d.key,
                    values: d.values.filter(function(d,i) {
                      return rlines.x()(d,i) >= extent[0] && rlines.x()(d,i) <= extent[1];
                    })
                  }
                })
            );

        var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
            .datum(dataLines[0].disabled ? [{values:[]}] :
              dataLines
                .map(function(d,i) {
                  return {
                    key: d.key,
                    values: d.values.filter(function(d,i) {
                      return lines.x()(d,i) >= extent[0] && lines.x()(d,i) <= extent[1];
                    })
                  }
                })
             );
             if (dataRLines.length) {
               x = rlines.xScale();
           } else {
               x = lines.xScale();
           }

           xAxis
           .scale(x)
           .ticks( availableWidth / 100 )
           .tickSize(-availableHeight1, 0);

           xAxis.domain([Math.ceil(extent[0]), Math.floor(extent[1])]);

           g.select('.nv-x.nv-axis').transition().duration(transitionDuration)
             .call(xAxis);

          focusBarsWrap.transition().duration(transitionDuration).call(rlines);
          focusLinesWrap.transition().duration(transitionDuration).call(lines);

          g.select('.nv-focus .nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y1.range()[0] + ')');


          y1Axis
          .scale(y1)
          .ticks( availableHeight1 / 36 )
          .tickSize(-availableWidth, 0);

          g.select('.nv-focus .nv-y1.nv-axis')
            .style('opacity', dataRLines.length ? 1 : 0);


          y2Axis
          .scale(y2)
          .ticks( availableHeight1 / 36 )
          .tickSize(dataRLines.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

          g.select('.nv-focus .nv-y2.nv-axis')
            .style('opacity', dataLines.length ? 1 : 0)
            .attr('transform', 'translate(' + x.range()[1] + ',0)');

          g.select('.nv-focus .nv-y1.nv-axis').transition().duration(transitionDuration)
              .call(y1Axis);
          g.select('.nv-focus .nv-y2.nv-axis').transition().duration(transitionDuration)
              .call(y2Axis);
        }

        //============================================================

        onBrush();

      });

      return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  rlines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  rlines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (typeof nv.tooltip.cleanup == 'function')  nv.tooltip.cleanup();
  });



  //============================================================
  // Global getters and setters
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.legend = legend;
  chart.lines = lines;
  chart.lines2 = lines2;
  chart.rlines = rlines;
  chart.rlines2 = rlines2;
  chart.xAxis = xAxis;
  chart.x2Axis = x2Axis;
  chart.y1Axis = y1Axis;
  chart.y2Axis = y2Axis;
  chart.y3Axis = y3Axis;
  chart.y4Axis = y4Axis;
  // DO NOT DELETE. This is currently overridden below
  // until deprecated portions are removed.
  chart.state = state;

  d3.rebind(chart, lines, 'defined', 'size', 'clipVoronoi', 'interpolate');
  //TODO: consider rebinding x, y and some other stuff, and simply do soemthign lile rlines.x(lines.x()), etc.
  //d3.rebind(chart, lines, 'x', 'y', 'size', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    lines.x(_);
    rlines.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    lines.y(_);
    rlines.y(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  // DEPRECATED
  chart.state = function(_) {
    nv.deprecated('linePlusBarWithFocusChart.state');
    if (!arguments.length) return state;
    state = _;
    return chart;
  };
  for (var key in state) {
    chart.state[key] = state[key];
  }
  // END DEPRECATED

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.brushExtent = function(_) {
    if (!arguments.length) return brushExtent;
    brushExtent = _;
    return chart;
  };

  return chart;
}


var dataLines;
var dataRlines;
