---
layout: sandbox
title: Simple Scatter Plot
---

## Loading Data

So far, we've worked with data coded directly into the JavaScript. In the real world, we'll usually want to load data from an external source. For common use cases, like loading a CSV file from a file on the same server, D3 has helper functions. `d3.csv` takes a relative URL and a callback function. It asynchronously loads the file in the background, converts the CSV rows to JavaScript objects, and passes them as a list to the callback function.

    console.log('Fetching data.');
    d3.csv("/data/iris.csv", (data) => {
        window.iris = data;
        console.log('Data received.');
    });
    console.log('Fetch initiated.');

This style of asynchronous programming might look unfamiliar, which is why I added the log statements. Notice that they are not called in the order they are written: the call to `d3.csv` initiates a request in the background and then continues on to the next command. It's not until data is received that lines 3-4 are called.

This is important to note because it means we can't use the fetched data immediately, we can only use it inside the callback. In this case, we assign the data to the `iris` global as soon as we get it (`window` represents the global namespace.)

Let's take the first 3 (`.slice(0, 3)`) values from the data, and pretty-print them (`JSON.stringify()`).

    JSON.stringify(iris.slice(0, 3), null, 2);

Compare these to the [original .csv file](data/iris.csv). Observe how D3 converted the rows into objects, using the first row of column names as object fields.

## Statistics

D3 implements a few [basic statistics](https://github.com/d3/d3-array/blob/master/README.md#statistics) that we can use to profile the data. We can take the mean:

    d3.mean(iris, (d) => d.sepal_length);

or standard deviation:

    d3.deviation(iris, (d) => d.petal_width);

## Scales

Unlike the contrived election example from earlier, real world data is often not in units that work in screen units. In the iris dataset, for example, the petal widths range from 1.0 to 6.9. Seven pixels is not enough resolution to represent these data.

Fortunately, D3 includes **scales** to make mappings between units. The simplest and most common is the linear scale, which scales uniformly between two ranges of numbers. For example, here's a scale that transforms fractional quantities into percents.

    myscale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, 100]);
    myscale(0.45);

t

    celsiusToFahrenheit = d3.scaleLinear()
      .domain([0, 100])
      .range([32, 212]);
    celsiusToFahrenheit(35);

Scales can also be inverted, so we can use the same scale to convert from Fahrenheit to Celsius:

    celsiusToFahrenheit.invert(140);

t

    chartWidth = 200;
    chartHeight = 200;
    svg = d3.select('#sandbox').append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight);

t

    xs = d3.scaleLinear().domain([-1, 1]).range([6, 10])
    xs(0.4)

## Plotting Circles