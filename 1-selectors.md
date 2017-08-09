---
layout: sandbox
title: Intro to Data Binding
---
## Selectors

One of the concepts at the core of D3 is the Selection. Selections are a way of picking a subset of the elements on a page and operating on them as a unit.

Before we start using selectors, we need something to select, so let's use standard (non-D3) JavaScript to create some `<div>` elements. I've already created a hidden element with the id `sandbox`, which we will use as a container throughout this tutorial.

    document.getElementById('sandbox').innerHTML = `
        <div id="d1">div 1</div>
        <div id="d2">div 2</div>
        <div id="d3">div 3</div>
    `;

Using D3, we can select the `<div>`s we just created with `selectAll`. As a sanity check, let's count them.

    d3.selectAll('#sandbox div').size();

This will select all `<div>` elements that are inside of the element with the ID `'sandbox'`.

A neat thing about selectors is that we can operate on all of the items in a selection as if they were one object. Operations that would otherwise require a for-loop then become one-liners. For example, we can change the text of all the elements to "boogie".

    d3.selectAll('#sandbox div').text('boogie');

Similarly, we can change style attributes of a selection:

    d3.selectAll('#sandbox div').style('color', 'orangered');

If you have used jQuery before, this should all look very familiar. Since you probably know of D3 as a data visualization tool, you might wonder what selecting HTML elements has to do with creating rich graphics. The connection lies in a feature of D3 selections called **data binding**.

## Data Binding

Let's say we have the following results of a vote:

    results = [
        {name: 'Jane', votes: 190},
        {name: 'Mike', votes: 155},
        {name: 'Loki', votes: 170}
    ];

Note that we created three `<div>`s above, which is the same number of candidates we have. With data binding, we can associate each one of `<div>` elements with a candidate, and change the text of the div to be the candidate's name.

    s = d3.selectAll('#sandbox div');
    s.data(results);
    s.text((d) => d.name);

Under the hood, what D3 is doing is taking the list of elements in the selection, and the list `results`, and walking them in lock-step. I like to visualize it in my head as a zipper where the teeth on one side are the HTML elements and the teeth on the other side are the data.

The `text()` method is the same one we've seen already, but instead of a string literal ("boogie"), we give it an accessor function. `(d) => d.name` is a function that takes an object and returns the value in its `name` field. Here it is in isolation:

    nameAccessor = ((d) => d.name);
    nameAccessor({name: 'Jane', votes: 190});

{::options parse_block_html="true" /}
<div class="exercise">
### Exercise 1

Below, create a similar `voteAccessor` function that returns the votes that a candidate received.

    voteAccessor = (/* fill me in */);
    voteAccessor({name: 'Jane', votes: 190});
</div>

Using your `voteAccessor` implementation, we can turn the `<div>`s into a simple bar chart by setting the widths according to the vote counts.

    s.style('width', voteAccessor);
    s.style('background', 'lightgreen');
    s.style('margin-bottom', '2px');

Normally, we should avoid declaring the variable `s` by chaining the calls like this:

    d3.selectAll('#sandbox div')
      .data(results)
      .text((d) => d.name)
      .style('width', voteAccessor)
      .style('background', 'lightblue')
      .style('margin-bottom', '2px');

This works because whenever possible, methods of a D3 selection **return the selection itself**. In other words, all the calls to `text()`, `data()`, and `style()` above return a selection equivalent to `s`. This style is considered idiomatic in D3 and you should use it when you can.

{::options parse_block_html="true" /}
<div class="exercise">
### Exercise 2

Modify the bar chart example so that the number of votes is included in the text in the `<div>`, e.g. "Jame (190)".

*Hint: the data is already bound, so you don't have to call `data`.*

    s = d3.selectAll('#sandbox div');
    // Your code here.
</div>

{::options parse_block_html="true" /}
<div class="exercise">
### Exercise 3

- Add a `<div>` to the sandbox by modifying the `innerHTML` string in the first cell and re-running it. What happens if you then re-run the data binding with more `<div>`s than candidates?
- Likewise, change the first cell so that it only creates two `<div>`s. What happens if you re-run the data binding then?
</div>
