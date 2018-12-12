import * as d3 from 'd3'
// // import { debounce } from 'debounce'

const margin = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 80
}

const width = 700 - margin.left - margin.right
const height = 700 - margin.top - margin.bottom

const svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  // .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var xPositionScale = d3
  .scaleBand()
  .range([0, width])

var yPositionScale = d3
  .scaleLinear()
  .domain([0, 400])
  .range([height, 0])

// var div = d3
//   .select('body')
//   .append('div')
//   .attr('class', 'tooltip')
//   .style('opacity', 0)

d3.csv(require('./data/daily-info.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready (datapoints) {
  var weekdayName = datapoints.map(d => d['weekday'])
  xPositionScale.domain(weekdayName)

  /* Set up axes */
  var xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(-height)
    .tickPadding(10)

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .attr('stroke-width', 0.1)
    .attr('stroke', 'lightgrey')
    .style('visibility', 'visible')
    .lower()

  var yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(-width)
    .tickPadding(10)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
    .attr('stroke-width', 0.1)
    .attr('stroke', 'lightgrey')
    .style('visibility', 'visible')
    .lower()

  svg
    .selectAll('.usePerDay')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'usePerDay')
    .attr('height', 10)
    .attr('width', xPositionScale.bandwidth())
    .attr('x', d => {
      return xPositionScale(d.weekday)
    })
    .attr('y', d => {
      return yPositionScale(d.daily_time)
    })
    .attr('fill', 'black')
    .attr('opacity', 0.3)

  //   // remove bounding box
  //   svg.selectAll('.domain').remove()

  //   // add text. Transform translate is based on x and y pos scales
  //   svg
  //     .append('text')
  //     .text('Actors are the same age')
  //     .attr('class', 'textLine')
  //     .attr('font-weight', 'bold')
  //     .attr('fill', '#4B1803')
  //     .attr('x', 10)
  //     .attr('y', 0)
  //     .attr('text-anchor', 'middle')
  //     .attr('transform', 'translate(' + xPositionScale(75) + ',' + yPositionScale(76) + ') rotate(-45)')
  //     .attr('opacity', 0)

  //   // add age line
  //   svg
  //     .append('line')
  //     .attr('class', 'ageLine')
  //     .attr('x1', 0)
  //     .attr('y1', height)
  //     .attr('x2', 0)
  //     .attr('y2', height)
  //     .lower()

  //   // START STEPIN
  //   d3.select('#intro').on('stepin', () => {
  //     // unhide axis
  //     svg
  //       .selectAll('.axis')
  //       .transition()
  //       .style('visibility', 'visible')

  //     // reset circles
  //     svg
  //       .selectAll('.couples')
  //       .transition()
  //       .duration(500)
  //       .attr('cx', d => xPositionScale(+d['Actor 1 Age']))
  //       .attr('cy', d => yPositionScale(+d['Actor 2 Age']))
  //       .attr('stroke', 'none')
  //       .attr('r', 3)
  //       .attr('opacity', 0.8)

  //     // reset line
  //     svg
  //       .select('.ageLine')
  //       .transition()
  //       .attr('x1', 0)
  //       .attr('y1', height)
  //       .attr('x2', 0)
  //       .attr('y2', height)

  //     // reset line text
  //     svg
  //       .select('.textLine')
  //       .transition()
  //       .attr('opacity', 0)
  //   })

  //   d3.select('#older-men').on('stepin', () => {

  //   })

  //   // highlight same age
  //   d3.select('#same-age').on('stepin', () => {
  //     // add a line for matching age
  //     svg
  //       .select('.ageLine')
  //       .transition()
  //       .duration(600)
  //       .attr('y2', 0)
  //       .attr('x2', width)
  //       .attr('stroke', '#4B1803')
  //       .attr('stroke-width', 1.8)
  //       .attr('opacity', 0.7)

  //     svg
  //       .select('.textLine')
  //       .transition()
  //       .duration(600)
  //       .attr('opacity', 1)

  //     // HGIHLIGHT COUPLES WITH THE SAME AGE HERE
  //     svg
  //       .selectAll('.couples')
  //       .transition()
  //       .attr('r', d => {
  //         if (+d['Age Difference'] === 0) {
  //           return 10
  //         } else {
  //           return 3
  //         }
  //       })
  //       .attr('stroke', d => {
  //         if (+d['Age Difference'] === 0) {
  //           return 'black'
  //         } else {
  //           return 'none'
  //         }
  //       })
  //   })

  //   // highlight LGBT
  //   d3.select('#lgbt').on('stepin', () => {
  //     svg
  //       .selectAll('.couples')
  //       .transition()
  //       .attr('r', d => {
  //         if (d['Actor 1 Gender'] === d['Actor 2 Gender']) {
  //           return 10
  //         } else {
  //           return 3
  //         }
  //       })
  //       .attr('stroke', d => {
  //         if (d['Actor 1 Gender'] === d['Actor 2 Gender']) {
  //           return 'black'
  //         } else {
  //           return 'none'
  //         }
  //       })
  //   })

  //   // # stepin bond (director==='john-glen' OR 'lewis-gilbert')
  //   d3.select('#bond').on('stepin', () => {
  //     svg
  //       .selectAll('.couples')
  //       .transition()
  //       .attr('stroke', 'none')
  //       .attr('r', 3)

  //     svg
  //       .selectAll('#john-glen, #lewis-gilbert')
  //       .transition()
  //       .attr('stroke', 'black')
  //       .attr('r', 10)
  //   })

  //   // # stepin muade director === 'hal-ashby'
  //   d3.select('#maude').on('stepin', () => {
  //     svg
  //       .selectAll('.couples')
  //       .transition()
  //       .attr('stroke', 'none')
  //       .attr('r', 3)

  //     svg
  //       .selectAll('#hal-ashby')
  //       .transition()
  //       .attr('stroke', 'black')
  //       .attr('r', 10)
  //   })
  //   // # stepin woody (director ==='woody-allen')

  //   d3.select('#woody').on('stepin', () => {
  //     svg
  //       .selectAll('.couples')
  //       .transition()
  //       .attr('stroke', 'none')
  //       .attr('r', 3)

  //     svg
  //       .selectAll('#woody-allen')
  //       .transition()
  //       .attr('stroke', 'black')
  //       .attr('r', 10)
  //   })

  //   // setpin coen (director === 'joel-coen')
  //   d3.select('#coen').on('stepin', () => {
  //     svg
  //       .selectAll('.couples')
  //       .transition()
  //       .attr('cx', d => xPositionScale(+d['Actor 1 Age']))
  //       .attr('cy', d => yPositionScale(+d['Actor 2 Age']))
  //       .attr('stroke', 'none')
  //       .attr('r', 3)
  //       .attr('opacity', 0.8)

  //     svg
  //       .selectAll('#joel-coen')
  //       .transition()
  //       .attr('stroke', 'black')
  //       .attr('r', 10)
  //   })

  //   d3.select('#end01').on('stepin', () => {

//   })
}
