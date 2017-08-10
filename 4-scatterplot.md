---
layout: sandbox
title: Simple Scatter Plot
---
# Scatterplot

In this exercise we will create a scatterplot of the famous [Iris data set](https://en.wikipedia.org/wiki/Iris_flower_data_set).

## Loading Data

So far, we've worked with data coded directly into the JavaScript. In the real world, we'll usually want to load data from an external source. For common use cases, like loading a CSV file from a file on the same server, D3 has helper functions. `d3.csv` takes a relative URL and a callback function. It asynchronously loads the file in the background, converts the CSV rows to JavaScript objects, and passes them as a list to the callback function.

    console.log('Fetching data.');
    d3.csv("data/iris.csv", (data) => {
        window.iris = data;
        console.log('Data received.');
    });
    console.log('Fetch initiated.');

This style of asynchronous programming might be unfamiliar, so I added some log statements. Compare the order they appear in the code to the order that they appear in the output. Notice that code execution in the outer scope continues *before the data is returned from the server*.

This is important to note because it means we can't use the fetched data immediately, we can only use it inside the callback. In this case, we assign the data to the `iris` global as soon as we get it (`window` represents the global namespace.)

Let's take the first 3 (`.slice(0, 3)`) values from the data, and pretty-print them (`JSON.stringify()`).

    JSON.stringify(iris.slice(0, 3), null, 2);

Compare these to the [original .csv file](data/iris.csv). See how D3 converted the rows into objects, using the first row of column names as object fields.

## Statistics

D3 implements a few [basic statistics](https://github.com/d3/d3-array/blob/master/README.md#statistics) that we can use to profile the data. We can take the mean:

    d3.mean(iris, (d) => d.sepal_length);

or standard deviation:

    d3.deviation(iris, (d) => d.petal_width);

## Scales

Unlike the contrived election example from earlier, real world data is often not in units that work in screen units. In the iris dataset, for example, the petal widths range from 1.0 to 6.9. If we were to apply these directly as screen coordinates we'd only have six pixels of resolution.

Fortunately, D3 includes **scales** to make mappings between units. For example, here's a scale that transforms fractional quantities into percents.

    myscale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, 100]);

    myscale(0.45);

The resulting `myscale` can be used as a function that takes in one unit and returns another. The `domain()` call takes a list of two values in the input unit, and the `range()` call takes a list of their respective values in the desired output coordinates. The scale then interpolates all other values.

Here's another example. This one converts Celsius temperatures to Fahrenheit.

    celsiusToFahrenheit = d3.scaleLinear()
      .domain([0, 100])
      .range([32, 212]);

    celsiusToFahrenheit(35);

Scales can also be inverted, so we can use the same scale to convert from Fahrenheit to Celsius:

    celsiusToFahrenheit.invert(140);

## Building the Chart

We now have the foundation we need to build a scatterplot. Suppose we are interested in the relationship between petal length and petal width. Let's plot the petal length as the X axis and petal width as the Y axis.

{::options parse_block_html="true" /}
<div class="exercise">
### Exercise 1

We will start by defining accessor functions that return the `x` and `y` variables we care about from each row of data. Fill in the `yAccessor` function.

    xAccessor = (d) => d.petal_length;
    yAccessor = /* your code here */
</div>

To make scales for our plot, we will need to know how big our chart will be. I'll use 600 by 400 because that's the size of the sandbox.

    chartWidth = 600;
    chartHeight = 400;

Using the what we know about scales, we create scales for each axis.

    xScale = d3.scaleLinear()
        .domain([0, d3.max(iris, xAccessor)])
        .range([0, chartWidth]);
    yScale = d3.scaleLinear()
        .domain([0, d3.max(iris, yAccessor)])
        .range([chartHeight, 0]);

<div class="exercise">
### Exercise 2

Why does the yScale use `[chartHeight, 0]` as the range, instead of `[0, chartHeight]` to mirror `xScale`?

*Hint: If you are stumped, try changing it to `[0, chartHeight]` before you run the following cells.*
</div>

We need an `<svg>` element to draw in, so let's create it. While we're at it, we'll create variables for the width and height of the plot.

    d3.selectAll('#sandbox *').remove();
    svg = d3.select('#sandbox').append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight);


## Plotting Circles

Now that we have the scales, we can use what we've already seen to bind the data, select the enter group, and append new circles. The only thing new is the way we wrapped the accessor functions in the scale functions, to get the units we want.

    svg.selectAll('circle')
       .data(iris)
       .enter()
       .append('circle')
       .attr('cx', (d) => xScale(xAccessor(d)))
       .attr('cy', (d) => yScale(yAccessor(d)))
       .attr('r', 2)
       .attr('fill', 'black');

See how the circles go right to the edge? That's because we used the whole space of the chart in the scale. To shrink the plotting area, we can reduce the range by some margin.

    margin = 40;
    newXScale = d3.scaleLinear()
        .domain([0, d3.max(iris, xAccessor)])
        .range([margin, chartWidth - margin]);
    newYScale = d3.scaleLinear()
        .domain([0, d3.max(iris, yAccessor)])
        .range([chartHeight - margin, margin]);
    svg.selectAll('circle')
        .attr('cx', (d) => newXScale(xAccessor(d)))
        .attr('cy', (d) => newYScale(yAccessor(d)));

## Axis Ticks

A bunch of circles can only tell us so much without an indication of the scale. Let's add axis ticks.

In D3, axis ticks are created from a scale. D3 provides `axisLeft`, `axisRight`, `axisTop`, and `axisBottom`. Each results in a function that takes a selector and builds the axis inside that selector.

For example:

    bottomAxisBuilder = d3.axisBottom(newXScale);
    bottomAxisGroup = svg.append('g')
        .attr('transform', `translate(0, ${chartHeight - 30})`);
    bottomAxisBuilder(bottomAxisGroup);

In D3, `bottomAxisBuilder(bottomAxisGroup)` is equivalent to `bottomAxisGroup.call(bottomAxisBuilder)`, as long as you don't care about the return value. So a more idiomatic way of building an axis is this:

    svg.append('g')
        .attr('transform', 'translate(40, 0)')
        .call(d3.axisLeft(newYScale));

## Categorical Colors

The data represent three different species of iris. Let's see what they are.

    species = d3.map(iris, (d) => d.species).keys();
    species;

Let's represent the species of each iris as the color of its dot in the scatterplot. Just as we used linear scales to translate between numerical units, we can use scales from categories to colors.

    colorScale = d3.scaleOrdinal()
        .domain(species)
        .range(d3.schemeCategory10);
    
    svg.selectAll('circle')
        .attr('fill', (d) => colorScale(d.species));

## Legend

Lastly, we should add a legend to make it clear what the colors mean. Just as we used data binding on the list of irises to create the scatterplot points, we can use data binding on the list of species to create the items in the legend.

    legend = svg.append('g')
        .attr('transform', 'translate(60, 10)');

    legendItems = legend.selectAll('g')
        .data(species)        
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legendItems.append('rect')
        .attr('height', 14)
        .attr('width', 14)
        .attr('y', 2)
        .attr('fill', (d) => colorScale(d));

    legendItems.append('text')
        .attr('alignment-baseline', 'hanging')
        .attr('x', 18)
        .text((d) => d);

