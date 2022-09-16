import {Component, OnInit, Output} from '@angular/core';
import {Team} from '../team/team';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Process} from '../process/process';
import {Sprint} from '../sprint/sprint';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: 'dashboard.component.html',
  styleUrls: []
})

export class DashboardComponent implements OnInit {
  sprints: Sprint[] = [];
  teams: Team[] = [];
  processes: Process[] = [];
  selectedProcess: Process;
  constructor(private http: HttpClient) {

  }

  initSprints(selectedTeamName: any) {
    const selectedTeam = this.teams.find(team => {
      return team.name === selectedTeamName.target.value;
    });
    this.http.get(`http://localhost:8080/api/sprint/dashboard/${selectedTeam.id}`).subscribe((data: Sprint[]) => {
      this.sprints = data;
    });
  }
  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/team').subscribe((data: Team[]) => {
      this.teams = data;
    });
    d3.timeline = function () {
      const DISPLAY_TYPES = ['circle', 'rect'];

      let hover = function () {
        },
        mouseover = function () {
        },
        mouseout = function () {
        },
        click = function () {
        },
        scroll = function () {
        },
        labelFunction = function (label) {
          return label;
        },
        navigateLeft = function () {
        },
        navigateRight = function () {
        },
        orient = 'bottom',
        width = null,
        height = null,
        rowSeparatorsColor = null,
        backgroundColor = null,
        tickFormat = {
          format: d3.time.format('%I %p'),
          tickTime: d3.time.days,
          tickInterval: 1,
          tickSize: 6,
          tickValues: null
        },
        colorCycle = d3.scale.category20(),
        colorPropertyName = null,
        display = 'rect',
        beginning = 0,
        labelMargin = 0,
        ending = 0,
        margin = {left: 30, right: 30, top: 30, bottom: 30},
        stacked = false,
        rotateTicks = false,
        timeIsRelative = false,
        fullLengthBackgrounds = false,
        itemHeight = 30,
        itemMargin = 5,
        navMargin = 60,
        showTimeAxis = true,
        showAxisTop = false,
        showTodayLine = true,
        timeAxisTick = false,
        timeAxisTickFormat = {stroke: 'stroke-dasharray', spacing: '4 10'},
        showTodayFormat = {marginTop: 25, marginBottom: 0, width: 3, color: '#cc0000'},
        showBorderLine = false,
        showBorderFormat = {marginTop: 25, marginBottom: 0, width: 1, color: colorCycle},
        showAxisHeaderBackground = false,
        showAxisNav = false,
        showAxisCalendarYear = true,
        axisBgColor = 'white',
        chartData = {}
      ;

      const appendTimeAxis = function (g, xAxis, yPosition) {

        if (showAxisHeaderBackground) {
          appendAxisHeaderBackground(g, 0, 0);
        }

        if (showAxisNav) {
          appendTimeAxisNav(g);
        }

        const axis = g.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + 0 + ',' + yPosition + ')')
          .call(xAxis);
      };

      const appendTimeAxisCalendarYear = function (nav) {
        // @ts-ignore
        let calendarLabel = beginning.getFullYear();
        // @ts-ignore
        if (beginning.getFullYear() !== ending.getFullYear()) {
          // @ts-ignore
          calendarLabel = beginning.getFullYear() + '-' + ending.getFullYear();
        }

        nav.append('text')
          .attr('transform', 'translate(' + 20 + ', 0)')
          .attr('x', 0)
          .attr('y', 14)
          .attr('class', 'calendarYear')
          .text(calendarLabel)
        ;
      };
      const appendTimeAxisNav = function (g) {
        const timelineBlocks = 6;
        const leftNavMargin = (margin.left - navMargin);
        const incrementValue = (width - margin.left) / timelineBlocks;
        const rightNavMargin = (width - margin.right - incrementValue + navMargin);

        const nav = g.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(0, 20)');

        if (showAxisCalendarYear) {
          appendTimeAxisCalendarYear(nav);
        }

        nav.append('text')
          .attr('transform', 'translate(' + leftNavMargin + ', 0)')
          .attr('x', 0)
          .attr('y', 14)
          .attr('class', 'chevron')
          .text('<')
          .on('click', function () {
            // @ts-ignore
            return navigateLeft(beginning, chartData);
          });

        nav.append('text')
          .attr('transform', 'translate(' + rightNavMargin + ', 0)')
          .attr('x', 0)
          .attr('y', 14)
          .attr('class', 'chevron')
          .text('>')
          .on('click', function () {
            // @ts-ignore
            return navigateRight(ending, chartData);
          });
      };

      const appendAxisHeaderBackground = function (g, xAxis, yAxis) {
        g.insert('rect')
          .attr('class', 'row-green-bar')
          .attr('x', xAxis)
          .attr('width', width)
          .attr('y', yAxis)
          .attr('height', itemHeight)
          .attr('fill', axisBgColor);
      };

      const appendTimeAxisTick = function (g, xAxis, maxStack) {
        g.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + 0 + ',' + (margin.top + (itemHeight + itemMargin) * maxStack) + ')')
          .attr(timeAxisTickFormat.stroke, timeAxisTickFormat.spacing)
          .call(xAxis.tickFormat('').tickSize(-(margin.top + (itemHeight + itemMargin) * (maxStack - 1) + 3), 0, 0));
      };

      const appendBackgroundBar = function (yAxisMapping, index, g, data, datum) {
        const greenbarYAxis = ((itemHeight + itemMargin) * yAxisMapping[index]) + margin.top;
        g.selectAll('svg').data(data).enter()
          .insert('rect')
          .attr('class', 'row-green-bar')
          .attr('x', fullLengthBackgrounds ? 0 : margin.left)
          .attr('width', fullLengthBackgrounds ? width : (width - margin.right - margin.left))
          .attr('y', greenbarYAxis)
          .attr('height', itemHeight)
          .attr('fill', backgroundColor instanceof Function ? backgroundColor(datum, index) : backgroundColor)
        ;
      };

      const appendLabel = function (gParent, yAxisMapping, index, hasLabel, datum) {
        const fullItemHeight = itemHeight + itemMargin;
        const rowsDown = margin.top + (fullItemHeight / 2) + fullItemHeight * (yAxisMapping[index] || 1);

        gParent.append('text')
          .attr('class', 'timeline-label')
          .attr('transform', 'translate(' + labelMargin + ',' + rowsDown + ')')
          .text(hasLabel ? labelFunction(datum.label) : datum.id)
          .on('click', function (d, i) {
            // @ts-ignore
            click(d, index, datum);
          });
      };

      function timeline(gParent) {
        const g = gParent.append('g');
        const gParentSize = gParent[0][0].getBoundingClientRect();

        const gParentItem = d3.select(gParent[0][0]);

        let yAxisMapping = {},
          maxStack = 1,
          minTime = 0,
          maxTime = 0;

        setWidth();

        // check if the user wants relative time
        // if so, substract the first timestamp from each subsequent timestamps
        if (timeIsRelative) {
          g.each(function (d, i) {
            d.forEach(function (datum, index) {
              datum.times.forEach(function (time, j) {
                const originTime = time.starting_time;
                if (index === 0 && j === 0) {
                  time.starting_time = 0;
                  time.ending_time = time.ending_time - originTime;
                } else {
                  time.starting_time = time.starting_time - originTime;
                  time.ending_time = time.ending_time - originTime;
                }
              });
            });
          });
        }

        // check how many stacks we're gonna need
        // do this here so that we can draw the axis before the graph
        if (stacked || ending === 0 || beginning === 0) {
          g.each(function (d, i) {
            d.forEach(function (datum, index) {

              // create y mapping for stacked graph
              if (stacked && Object.keys(yAxisMapping).indexOf(index) == -1) {
                yAxisMapping[index] = maxStack;
                maxStack++;
              }

              // figure out beginning and ending times if they are unspecified
              datum.times.forEach(function (time) {
                if (beginning === 0) {
                  if (time.starting_time < minTime || (minTime === 0 && timeIsRelative === false)) {
                    minTime = time.starting_time;
                  }
                }
                if (ending === 0) {
                  if (time.ending_time > maxTime) {
                    maxTime = time.ending_time;
                  }
                }
              });
            });
          });

          if (ending === 0) {
            ending = maxTime;
          }
          if (beginning === 0) {
            beginning = minTime;
          }
        }

        const scaleFactor = (1 / (ending - beginning)) * (width - margin.left - margin.right);

        // draw the axis
        const xScale = d3.time.scale()
          .domain([beginning, ending])
          .range([margin.left, width - margin.right]);

        const xAxis = d3.svg.axis()
          .scale(xScale)
          .orient(orient)
          .tickFormat(tickFormat.format)
          .tickSize(tickFormat.tickSize);

        if (tickFormat.tickValues != null) {
          xAxis.tickValues(tickFormat.tickValues);
        } else {
          xAxis.ticks(tickFormat.tickTime, tickFormat.tickInterval);
        }

        // draw the chart
        g.each(function (d, i) {
          chartData = d;
          d.forEach(function (datum, index) {
            const data = datum.times;
            const hasLabel = (typeof (datum.label) !== 'undefined');

            // issue warning about using id per data set. Ids should be individual to data elements

            if (backgroundColor) {
              appendBackgroundBar(yAxisMapping, index, g, data, datum);
            }

            g.selectAll('svg').data(data).enter()
              .append(function (d) {
                return document.createElementNS(d3.ns.prefix.svg, 'display' in d ? d.display : display);
              })
              .attr('x', getXPos)
              .attr('y', getStackPosition)
              .attr('width', function (d) {
                return (d.ending_time - d.starting_time) * scaleFactor;
              })
              .attr('cy', function (d, i) {
                // @ts-ignore
                return getStackPosition(d, i) + itemHeight / 2;
              })
              .attr('cx', getXPos)
              .attr('r', itemHeight / 2)
              .attr('height', itemHeight)
              .style('fill', function (d) {
                let dColorPropName;
                if (d.color) {
                  return d.color;
                }
                if (colorPropertyName) {
                  dColorPropName = d[colorPropertyName];
                  if (dColorPropName) {
                    return colorCycle(dColorPropName);
                  } else {
                    return colorCycle(datum[colorPropertyName]);
                  }
                }
                return colorCycle(index);
              })
              .on('mousemove', function (d, i) {
                // @ts-ignore
                hover(d, i, datum);
              })
              .on('mouseover', function (d, i) {
                // @ts-ignore
                mouseover(d, i, datum);
              })
              .on('mouseout', function (d, i) {
                // @ts-ignore
                mouseout(d, i, datum);
              })
              .on('click', function (d, i) {
                // @ts-ignore
                click(d, i, datum);
              })
              .attr('class', function (d, i) {
                return datum.class ? 'timelineSeries_' + datum.class : 'timelineSeries_' + index;
              })
              .attr('id', function (d, i) {
                // use deprecated id field
                if (datum.id && !d.id) {
                  return 'timelineItem_' + datum.id;
                }

                return d.id ? d.id : 'timelineItem_' + index + '_' + i;
              })
            ;

            g.selectAll('svg').data(data).enter()
              .append('text')
              .attr('x', getXTextPos)
              .attr('y', getStackTextPosition)
              .text(function (d) {
                return d.label;
              })
            ;

            if (rowSeparatorsColor) {
              const lineYAxis = (itemHeight + itemMargin / 2 + margin.top + (itemHeight + itemMargin) * yAxisMapping[index]);
              gParent.append('svg:line')
                .attr('class', 'row-separator')
                .attr('x1', 0 + margin.left)
                .attr('x2', width - margin.right)
                .attr('y1', lineYAxis)
                .attr('y2', lineYAxis)
                .attr('stroke-width', 1)
                .attr('stroke', rowSeparatorsColor);
            }

            // add the label
            if (hasLabel) {
              appendLabel(gParent, yAxisMapping, index, hasLabel, datum);
            }

            if (typeof (datum.icon) !== 'undefined') {
              gParent.append('image')
                .attr('class', 'timeline-label')
                .attr('transform', 'translate(' + 0 + ',' + (margin.top + (itemHeight + itemMargin) * yAxisMapping[index]) + ')')
                .attr('xlink:href', datum.icon)
                .attr('width', margin.left)
                .attr('height', itemHeight);
            }

            function getStackPosition() {
              if (stacked) {
                return margin.top + (itemHeight + itemMargin) * yAxisMapping[index];
              }
              return margin.top;
            }

            function getStackTextPosition() {
              if (stacked) {
                return margin.top + (itemHeight + itemMargin) * yAxisMapping[index] + itemHeight * 0.75;
              }
              return margin.top + itemHeight * 0.75;
            }
          });
        });

        const belowLastItem = (margin.top + (itemHeight + itemMargin) * maxStack);
        const aboveFirstItem = margin.top;
        const timeAxisYPosition = showAxisTop ? aboveFirstItem : belowLastItem;
        if (showTimeAxis) {
          appendTimeAxis(g, xAxis, timeAxisYPosition);
        }
        if (timeAxisTick) {
          appendTimeAxisTick(g, xAxis, maxStack);
        }

        if (width > gParentSize.width) {
          const move = function () {
            const x = Math.min(0, Math.max(gParentSize.width - width, d3.event.translate[0]));
            zoom.translate([x, 0]);
            g.attr('transform', 'translate(' + x + ',0)');
            // @ts-ignore
            scroll(x * scaleFactor, xScale);
          };

          const zoom = d3.behavior.zoom().x(xScale).on('zoom', move);

          gParent
            .attr('class', 'scrollable')
            .call(zoom);
        }

        if (rotateTicks) {
          g.selectAll('.tick text')
            .attr('transform', function (d) {
              return 'rotate(' + rotateTicks + ')translate('
                + (this.getBBox().width / 2 + 10) + ',' // TODO: change this 10
                + this.getBBox().height / 2 + ')';
            });
        }

        const gSize = g[0][0].getBoundingClientRect();
        setHeight();

        if (showBorderLine) {
          g.each(function (d, i) {
            d.forEach(function (datum) {
              const times = datum.times;
              times.forEach(function (time) {
                appendLine(xScale(time.starting_time), showBorderFormat);
                appendLine(xScale(time.ending_time), showBorderFormat);
              });
            });
          });
        }

        if (showTodayLine) {
          const todayLine = xScale(new Date());
          appendLine(todayLine, showTodayFormat);
        }

        function getXPos(d, i) {
          return margin.left + (d.starting_time - beginning) * scaleFactor;
        }

        function getXTextPos(d, i) {
          return margin.left + (d.starting_time - beginning) * scaleFactor + 5;
        }

        function setHeight() {
          if (!height && !gParentItem.attr('height')) {
            if (itemHeight) {
              // set height based off of item height
              height = gSize.height + gSize.top - gParentSize.top;
              // set bounding rectangle height
              d3.select(gParent[0][0]).attr('height', height);
            } else {
              throw 'height of the timeline is not set';
            }
          } else {
            if (!height) {
              height = gParentItem.attr('height');
            } else {
              gParentItem.attr('height', height);
            }
          }
        }

        function setWidth() {
          if (!width && !gParentSize.width) {
            try {
              width = gParentItem.attr('width');
              if (!width) {
                throw 'width of the timeline is not set. As of Firefox 27, timeline().with(x) needs to be explicitly set in order to render';
              }
            } catch (err) {
              console.log(err);
            }
          } else if (!(width && gParentSize.width)) {
            try {
              width = gParentItem.attr('width');
            } catch (err) {
              console.log(err);
            }
          }
          // if both are set, do nothing
        }

        function appendLine(lineScale, lineFormat) {
          gParent.append('svg:line')
            .attr('x1', lineScale)
            .attr('y1', lineFormat.marginTop)
            .attr('x2', lineScale)
            .attr('y2', height - lineFormat.marginBottom)
            .style('stroke', lineFormat.color)
            .style('stroke-width', lineFormat.width);
        }

      }

      // SETTINGS
      // @ts-ignore
      timeline.margin = function (p) {
        if (!arguments.length) {
          return margin;
        }
        margin = p;
        return timeline;
      };

      // @ts-ignore
      timeline.orient = function (orientation) {
        if (!arguments.length) {
          return orient;
        }
        orient = orientation;
        return timeline;
      };

      // @ts-ignore
      timeline.itemHeight = function (h) {
        if (!arguments.length) {
          return itemHeight;
        }
        itemHeight = h;
        return timeline;
      };

      // @ts-ignore
      timeline.itemMargin = function (h) {
        if (!arguments.length) {
          return itemMargin;
        }
        itemMargin = h;
        return timeline;
      };

      // @ts-ignore
      timeline.navMargin = function (h) {
        if (!arguments.length) {
          return navMargin;
        }
        navMargin = h;
        return timeline;
      };

      // @ts-ignore
      timeline.height = function (h) {
        if (!arguments.length) {
          return height;
        }
        height = h;
        return timeline;
      };

      // @ts-ignore
      timeline.width = function (w) {
        if (!arguments.length) {
          return width;
        }
        width = w;
        return timeline;
      };

      // @ts-ignore
      timeline.display = function (displayType) {
        if (!arguments.length || (DISPLAY_TYPES.indexOf(displayType) == -1)) {
          return display;
        }
        display = displayType;
        return timeline;
      };

      // @ts-ignore
      timeline.labelFormat = function (f) {
        if (!arguments.length) {
          return labelFunction;
        }
        labelFunction = f;
        return timeline;
      };

      // @ts-ignore
      timeline.tickFormat = function (format) {
        if (!arguments.length) {
          return tickFormat;
        }
        tickFormat = format;
        return timeline;
      };

      // @ts-ignore
      timeline.hover = function (hoverFunc) {
        if (!arguments.length) {
          return hover;
        }
        hover = hoverFunc;
        return timeline;
      };

      // @ts-ignore
      timeline.mouseover = function (mouseoverFunc) {
        if (!arguments.length) {
          return mouseover;
        }
        mouseover = mouseoverFunc;
        return timeline;
      };

      // @ts-ignore
      timeline.mouseout = function (mouseoutFunc) {
        if (!arguments.length) {
          return mouseout;
        }
        mouseout = mouseoutFunc;
        return timeline;
      };

      // @ts-ignore
      timeline.click = function (clickFunc) {
        if (!arguments.length) {
          return click;
        }
        click = clickFunc;
        return timeline;
      };

      // @ts-ignore
      timeline.scroll = function (scrollFunc) {
        if (!arguments.length) {
          return scroll;
        }
        scroll = scrollFunc;
        return timeline;
      };

      // @ts-ignore
      timeline.colors = function (colorFormat) {
        if (!arguments.length) {
          return colorCycle;
        }
        colorCycle = colorFormat;
        return timeline;
      };

      // @ts-ignore
      timeline.beginning = function (b) {
        if (!arguments.length) {
          return beginning;
        }
        beginning = b;
        return timeline;
      };

      // @ts-ignore
      timeline.ending = function (e) {
        if (!arguments.length) {
          return ending;
        }
        ending = e;
        return timeline;
      };

      // @ts-ignore
      timeline.labelMargin = function (m) {
        if (!arguments.length) {
          return labelMargin;
        }
        labelMargin = m;
        return timeline;
      };

      // @ts-ignore
      timeline.rotateTicks = function (degrees) {
        if (!arguments.length) {
          return rotateTicks;
        }
        rotateTicks = degrees;
        return timeline;
      };

      // @ts-ignore
      timeline.stack = function () {
        stacked = !stacked;
        return timeline;
      };

      // @ts-ignore
      timeline.relativeTime = function () {
        timeIsRelative = !timeIsRelative;
        return timeline;
      };

      // @ts-ignore
      timeline.showBorderLine = function () {
        showBorderLine = !showBorderLine;
        return timeline;
      };

      // @ts-ignore
      timeline.showBorderFormat = function (borderFormat) {
        if (!arguments.length) {
          return showBorderFormat;
        }
        showBorderFormat = borderFormat;
        return timeline;
      };

      // @ts-ignore
      timeline.showToday = function () {
        showTodayLine = !showTodayLine;
        return timeline;
      };

      // @ts-ignore
      timeline.showTodayFormat = function (todayFormat) {
        if (!arguments.length) {
          return showTodayFormat;
        }
        showTodayFormat = todayFormat;
        return timeline;
      };

      // @ts-ignore
      timeline.colorProperty = function (colorProp) {
        if (!arguments.length) {
          return colorPropertyName;
        }
        colorPropertyName = colorProp;
        return timeline;
      };

      // @ts-ignore
      timeline.rowSeparators = function (color) {
        if (!arguments.length) {
          return rowSeparatorsColor;
        }
        rowSeparatorsColor = color;
        return timeline;

      };

      // @ts-ignore
      timeline.background = function (color) {
        if (!arguments.length) {
          return backgroundColor;
        }
        backgroundColor = color;
        return timeline;
      };

      // @ts-ignore
      timeline.showTimeAxis = function () {
        showTimeAxis = !showTimeAxis;
        return timeline;
      };

      // @ts-ignore
      timeline.showAxisTop = function () {
        showAxisTop = !showAxisTop;
        return timeline;
      };

      // @ts-ignore
      timeline.showAxisCalendarYear = function () {
        showAxisCalendarYear = !showAxisCalendarYear;
        return timeline;
      };

      // @ts-ignore
      timeline.showTimeAxisTick = function () {
        timeAxisTick = !timeAxisTick;
        return timeline;
      };

      // @ts-ignore
      timeline.fullLengthBackgrounds = function () {
        fullLengthBackgrounds = !fullLengthBackgrounds;
        return timeline;
      };

      // @ts-ignore
      timeline.showTimeAxisTickFormat = function (format) {
        if (!arguments.length) {
          return timeAxisTickFormat;
        }
        timeAxisTickFormat = format;
        return timeline;
      };

      // @ts-ignore
      timeline.showAxisHeaderBackground = function (bgColor) {
        showAxisHeaderBackground = !showAxisHeaderBackground;
        if (bgColor) {
          (axisBgColor = bgColor);
        }
        return timeline;
      };

      // @ts-ignore
      timeline.navigate = function (navigateBackwards, navigateForwards) {
        if (!arguments.length) {
          return [navigateLeft, navigateRight];
        }
        navigateLeft = navigateBackwards;
        navigateRight = navigateForwards;
        showAxisNav = !showAxisNav;
        return timeline;
      };

      return timeline;
    };

    const width = 1400;

    const backlogProcessData = [
      {times: [{'label': 'Development', 'starting_time': 1652140800000, 'ending_time': 1654041599000}]}, //10 May; 31 May
      {times: [{'label': 'Finalize', 'starting_time': 1653868800000, 'ending_time': 1654041599000}]}, // 30-31 May
      {times: [{'label': 'Testing & B/F (only bugfix)', 'starting_time': 1654041600000, 'ending_time': 1654646399000}]}, // 01 - 07 June
      {times: [{'label': 'Final B/F (only bugfix)', 'starting_time': 1654646400000, 'ending_time': 1655164799000}, ]} // 8 -13 June
    ];

    const backlogProcessAdditionalTimes = {
      beginningTime: 1652097600000,
      endTime: 1655208000000
    };


    const backlogProcessColorScale = d3.scale.ordinal().range(['#99ff99', '#ff6666', '#99ccff', '#ffcc99']);

    const ltsProcessData = [
      {times: [{'label': 'Development', 'starting_time': 1653264000000, 'ending_time': 1653580800000}]},
      {times: [{'label': 'Prepare Release', 'starting_time': 1653580800000, 'ending_time': 1653609599000, 'display': 'circle'}]},
      {times: [{'label': 'Testing & B/F (only bugfix)', 'starting_time': 1653609600000, 'ending_time': 1653695999000}]}
    ];
    const backlogProcessId = '#a629135fd3250d5959611fe78';
    const ltsProcessId = '#a6291397ace0b8a56fc96606e';

    const ltsProcessColorScale = d3.scale.ordinal().range(['#99ff99', '#ff6666', '#99ccff']);

    const ltsProcessAdditionalTimes = {
      beginningTime: 1653177600000,
      endTime: 1653739199000
    };

    this.drawProcess(backlogProcessData, backlogProcessColorScale, backlogProcessAdditionalTimes, backlogProcessId);
    this.drawProcess(ltsProcessData, ltsProcessColorScale, ltsProcessAdditionalTimes, ltsProcessId);




    // const chart = d3.timeline().tickFormat(
    //   {
    //     format: d3.time.format('%a %d, %B'),
    //     tickTime: d3.time.days,
    //     tickInterval: 1,
    //     tickSize: 30
    //   })
    //   .stack()
    //   .rotateTicks(45);
    //
    // const svg = d3.select('#timeline3').append('svg').attr('width', width)
    //   .datum(labelTestData).call(chart);

  }

  drawProcess(data, colorScale, additionalBeginningEnding, processId) {

    let chart = d3.timeline()
      .tickFormat(
        {format: d3.time.format('%a %d'),
          tickTime: d3.time.days,
          tickInterval: 1,
          tickSize: 30})
      .stack()
      .colors(colorScale)
      .showTimeAxisTick();

    if (additionalBeginningEnding) {
      chart = chart.beginning(additionalBeginningEnding.beginningTime)
        .ending(additionalBeginningEnding.endTime);
    }

    const svg = d3.select(processId).append('svg').attr('width', 1800)
      .datum(data).call(chart);
  }
}
