---
layout: sandbox
title: SVG Graphics
---

# SVG

We've seen how to create a bar chart with HTML, but beyond that example we become limited pretty quickly by what HTML can do.

That's where [Scalable Vector Graphics](https://developer.mozilla.org/en-US/docs/Web/SVG) (SVG) come in. SVG is a way of creating graphical primitives like circles, lines, and rectangles inside an HTML page.

---

Shapes in SVG are elements just like the `<div>` elements we have already seen. The only thing special about them is that they have to be inside of an `<svg>` element. Let's create one with D3:

    svg = d3.select('#sandbox')
      .append('svg')
      .style('width', '100%')
      .style('height', '100%')
      .style('border', '1px solid deepskyblue');

---

Now drawing shapes is as easy as `append`ing them to the SVG element:

    circ = svg.append('circle')
      .attr('fill', 'lightcoral')
      .attr('r', 10);

By default, the circle is centered at the "origin", the point `(0, 0)`. The origin is the upper-left corner of the area. This means that the `x` coordinates increase to the *right* and the `y` coordinates increase going *down*. **Compared to standard plotting coordinates, this is upside-down.** We can use the `cx` and `cy` attributes to position it:

    circ.attr('cx', 30)
      .attr('cy', 50);

---

**Rectangles** are easy too:

    svg.append('rect')
      .attr('x', 70)
      .attr('y', 80)
      .attr('fill', 'indigo')
      .attr('height', 20)
      .attr('width', 40);

Rectangles use `x` and `y` rather than `cx` and `cy`. That's because rectangles are positioned from their upper-left corner instead of their center.

---

We can also draw **lines**:

    line = svg.append('line')
      .attr('x1', 60)
      .attr('y1', 80)
      .attr('x2', 190)
      .attr('y2', 40)
      .attr('stroke', 'black');

---

{::options parse_block_html="true" /}
<div class="exercise" time="300">
### Exercise 1

Create a line from the center of the circle to the center of the rectangle.

    svg.append('line') /* Your code here. */

</div>

---

## Drawing Order

Let's draw some shapes that overlap:

    svg.append('circle')
      .attr('cx', 50)
      .attr('cy', 160)
      .attr('r', 20)
      .attr('fill', 'green');
    
    svg.append('circle')
      .attr('cx', 80)
      .attr('cy', 160)
      .attr('r', 20)
      .attr('fill', 'purple');

Note that the shapes are drawn in the order that we create them, so the second circle covers the first in the overlapping area.

---

## Groups

Sometimes its useful to group shapes into an object that you can manipulate as a unit. This can be accomplished with the **group** element `<g>`.

    group = svg.append('g');
    group.append('circle')
        .attr('r', 30)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 5);
    group.append('line')
        .attr('x1', -22)
        .attr('y1', -22)
        .attr('x2', 22)
        .attr('y2', 22)
        .attr('stroke', 'red')
        .attr('stroke-width', 5);

The group now has a red circle and a line (the international prohibition sign.) Now if we want to move it, we can give the group a `transform` attribute that moves all of the elements at once:

    group.attr('transform', 'translate(65, 160)');

---

{::options parse_block_html="true" /}
<div class="exercise">
### Exercise 2

The following code creates two overlapping circles, first an orange one, into the group `g2`, and then a blue one, into the group `g1`. Before running the code, think about which circle will overlap the other.

    g1 = svg.append('g');
    g2 = svg.append('g');
    g2.append('circle')
      .attr('cx', 100)
      .attr('cy', 230)
      .attr('r', 30)
      .attr('fill', 'orangered');
    g1.append('circle')
      .attr('cx', 120)
      .attr('cy', 230)
      .attr('r', 30)
      .attr('fill', 'midnightblue');

The result may surprise you, and it demonstrates another important use of groups: **they allow you to decouple the drawing order from the order that you create shape elements in**. You can think of groups as "layers" in an image editor: each layer is rendered on top of the last.
</div>

---

## Paths

Paths in SVG are a series of lines (or curves) that connect in a sequence.

    svg.append('path')
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('d', 'M100 50 L150 100 L100 100 L50 50 Z');

The paths are specified by a list of drawing instructions, which you can read more about in the [Mozilla SVG documentation](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).