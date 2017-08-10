---
layout: sandbox
title: Line Plots
---
# Line Plots

Let's load some historic data for Apple's stock (downloaded from [Yahoo Finance](https://finance.yahoo.com/quote/AAPL/history?p=AAPL)):

    d3.csv('data/AAPL.csv', (data) => {
        window.aapl = data;
    });

To get an idea of the data format, let's look at the first row:

    JSON.stringify(aapl[0], null, 2);

The dates are in YYYY-MM-DD format. D3 includes some utilities for time parsing, so let's make use of those.

    dateParser = d3.timeParse('%Y-%m-%d');
    dateParser('2012-05-04');

Let's find the date range of the data. `d3.extent` works just like the stats functions we've already seen, except that it returns a list of two values instead of one (you can think of it as shorthand for `[d3.min(data, accessor), d3.max(data, accessor)]`).

    dateExtent = d3.extent(aapl, (d) => dateParser(d.Date));

D3 has a scale type called `scaleTime` that works like `scaleLinear` except it takes datetime objects (which are what `d3.timeParse` returns).

    chartWidth = 600;
    chartHeight = 400;
    margin = 40;

    xScale = d3.scaleTime()
        .domain(dateExtent)
        .range([margin, chartWidth - margin]);

Since there is no time on the Y-scale, we can use an old-fashioned `scaleLinear`.

    priceExtent = [d3.min(aapl, (d) => d.Low), d3.max(aapl, (d) => d.High)];
    
    yScale = d3.scaleLinear()
        .domain(priceExtent)
        .range([chartHeight - margin, margin])
    
a

    line = d3.line()
        .x((d) => xScale(dateParser(d)))
        .y((d) => yScale(d.Close));
    line(aapl);
