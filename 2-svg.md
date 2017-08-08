---
layout: page
title: SVG Graphics
---

We've seen how to create a bar chart with HTML, but beyond that example we become limited pretty quickly by what HTML can do.

That's where [Scalable Vector Graphics](https://developer.mozilla.org/en-US/docs/Web/SVG) (SVG) come in. SVG is a way of creating graphical primitives like circles, lines, and rectangles inside an HTML page.

Shapes in SVG are elements just like the `<div>` elements we have already seen. The only thing special about them is that they have to be inside of an `<svg>` element. Let's create one with D3:

    svg = d3.select('#sandbox')
      .append('svg')
      .style('width', '100%')
      .style('height', '300px')
      .style('border', '1px solid blue');

Now drawing shapes is as easy as `append`ing them to the SVG element:

    circ = svg.append('circle')
      .attr('fill', 'blue')
      .attr('r', 10);

By default, the circle is centered at the "origin", the point `(0, 0)`. Note that the origin is the upper-left corner of the area. This means that the `x` coordinates increase to the *right* and the `y` coordinates increase going *down*. We can use the `cx` and `cy` attributes to position it:

    circ.attr('cx', 30)
      .attr('cy', 50);

Rectangles are easy too:

    svg.append('rect')
      .attr('x', 70)
      .attr('y', 80)
      .attr('fill', 'red')
      .attr('height', 20)
      .attr('width', 40);

Note that rectangles use `x` and `y` rather than `cx` and `cy`. That's because rectangles are positioned from their upper-left corner instead of their center.

We can also draw lines:

    line = svg.append('line')
      .attr('x1', 60)
      .attr('y1', 80)
      .attr('x2', 190)
      .attr('y2', 40)
      .attr('stroke', 'black');

{::options parse_block_html="true" /}
<div class="exercise">
### Exercise 1

Create a line from the center of the circle to the center of the rectangle.

    svg.append('line') /* Your code here. */

</div>

## Drawing Order

Let's draw some shapes that overlap:

    svg.append('circle')
      .attr('cx', 50)
      .attr('cy', 60)
      .attr('r', 20)
      .attr('fill', 'green');
    
    svg.append('circle')
      .attr('cx', 80)
      .attr('cy', 60)
      .attr('r', 20)
      .attr('fill', 'purple');


## Groups

