---
layout: sandbox
title: Intro to Data Binding
---
## Selectors

One of the concepts at the core of D3 is called **selection**. Selections are a way of picking a subset of the elements on a page and operating on them as a unit.

Before we start using selectors, we need something to select, so let's use standard (non-D3) JavaScript to create some `<div>` elements. I've already created a hidden element with the id `sandbox`, which we will use as a container throughout this tutorial.

    document.getElementById('sandbox').innerHTML = `
        <div id="d1">div 1</div>
        <div id="d2">div 2</div>
        <div id="d3">div 3</div>
    `;

---

Using D3, we can select the `<div>`s we just created with `selectAll`. As a sanity check, let's count them.

    d3.selectAll('#sandbox div').size();

This will select all `<div>` elements that are inside of the element with the ID `'sandbox'`.

---

A neat thing about selectors is that we can operate on all of the items in a selection as if they were one object. Operations that would otherwise require a for-loop then become one-liners. For example, we can change the text of all the elements to "boogie".

    d3.selectAll('#sandbox div').text('boogie');

Similarly, we can change style attributes of a selection:

    d3.selectAll('#sandbox div')
        .style('color', 'orangered');

If you have used jQuery before, this will all look familiar.

---

## Data Binding

Since you probably think of D3 as a data visualization tool, you might wonder what selecting HTML elements has to do with creating rich graphics. The connection lies in a feature of D3 selections called **data binding**.

Data in D3 is 

    results = [
        {name: 'Jane', votes: 190},
        {name: 'Loki', votes: 170},
        {name: 'Mike', votes: 155}
    ];

---

Note that we created three `<div>`s above, which is the same number of candidates we have. **With data binding, we can associate each one of `<div>` elements with a candidate**, and change the text of the div to be the candidate's name.

    s = d3.selectAll('#sandbox div');
    s.data(results);
    s.text((d) => d.name);

---

Think of data binding as zipping a zipper: on one side you have HTML elements, and on the other you have a JavaScript list. D3 pairs up the individual elements with the associated data point and sets a hidden property of each element to its datum.

<figure style="width: 30%; margin: auto;">
<img src="images/zipper.jpg" style="width: 100%;" />
<figcaption style="font-size: 50%;">Image credit: <a href="https://www.flickr.com/photos/guysie/14347814577/">Guy Sie</a> (CC BY-SA 2.0)</figcaption>
</figure>

---

Under the hood, what D3 is doing is taking the list of elements in the selection, and the list `results`, and lining them up in order.

The `text()` method is the same one we've seen already, but instead of a string literal ("boogie"), we give it an accessor function. `(d) => d.name` is a function that takes an object and returns the value in its `name` field. Here it is in isolation:

    nameAccessor = ((d) => d.name);
    nameAccessor({name: 'Jane', votes: 190});

---

{::options parse_block_html="true" /}
<div class="exercise" time="60">
### Exercise 1

Below, create a similar `voteAccessor` function that returns the votes that a candidate received.

    voteAccessor = (/* fill me in */);
    voteAccessor({name: 'Jane', votes: 190});
</div>

---

Using your `voteAccessor` implementation, we can turn the `<div>` elements into a simple bar chart by setting the widths according to the vote counts.

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

---

{::options parse_block_html="true" /}
<div class="exercise" time="60">
### Exercise 2

Modify the bar chart example so that the number of votes is included in the text in the `<div>`, e.g. "Jane (190)".

*Hints: the data is already bound, so you don't have to call `data`. The `+` operator concatenates strings, or you could use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).*

    s = d3.selectAll('#sandbox div');
    // Your code here.
</div>

---

{::options parse_block_html="true" /}
<div class="exercise" time="90">
### Exercise 3

So far we've seen how data binding works when the number of elements in the selector is the same as the number of pieces of data. What happens when:
- We try to bind with more elements than data?
- We try to bind with more data than elements?

Modify the following code to answer these questions.

    d3.select('#sandbox').node().innerHTML = `
        <div>div 1</div>
        <div>div 2</div>
        <div>div 3</div>
    `;
    d3.selectAll('#sandbox div').data([
        'one', 'two', 'three'
    ]).text((d) => d);
</div>
