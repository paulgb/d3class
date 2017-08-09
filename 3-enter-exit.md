---
layout: page
title: Enter and Exit Groups
---

So far, we've seen that if we have some elements on a page, and the *same number* of items in a list, we can use D3's data binding to associate each element with an item.

Then, as we saw in Exercise 2, when there are fewer elements in the selection than the data, the extra data items are ignored. Likewise, when there are more elements than data, the elements that aren't associated with data are not affected.

D3 doesn't just forget about these elements and data, though. It exposes them as `enter` and `exit` groups.

## Enter

Since we're starting with an empty sandbox, the selection of all elements will be empty:

    d3.select('#sandbox')
      .selectAll('div')
      .size();

I want you to notice a few things here:
- `select` is like `selectAll`, except that it will select only the first matching element. Here I could have used `selectAll`, since there is only one element with the ID `'sandbox'`, but using `select` makes the intention of the code clearer.
- `selectAll` (and `select`) can be called *on another selection* to select elements which are inside any of the elements in that selection. So the code above will select the element with the ID `'sandbox'`, and then any `<div>` elements inside of that.

Even though the selection is empty, let's create some data and bind it.

    var numbers = [1, 2, 3, 4, 5];
    var selection = d3.select('#sandbox')
      .selectAll('div')
      .data(numbers);

After data binding, our selection is still "empty":

    selection.size();

But D3 hasn't thrown out the extra data, it's set it aside into an "enter" group:

    selection.enter().data();

We can call `append` on the enter group to add elements for each data point:

    selection
      .enter()
        .append('div')
        .style('background', 'lightgray')
        .style('margin', '10px')
        .text((d) => d);

In this case the enter group contained all of the data because we started without any elements (in other words, the selection was empty). Now that we have created some elements, let's see what happens when we bind more data:

    var newSelection = d3.select('#sandbox')
      .selectAll('div')
      .data([10, 20, 30, 40, 50, 60, 70]);

This time, five elements exist and we are binding to 7 pieces of data. What will the size of `newSelection` be?

    newSelection.size();

We can also look at the "entering" data:

    newSelection.enter().data();

Just as before, we can use `append` to create elements for the new data.

    newSelection.enter()
      .append('div')
      .style('background', 'lightgray')
      .style('margin', '10px')
      .text((d) => d);

Notice that the old values didn't change! That's because the `text` call only applied to the `enter` group, so old data points were not included. We'd like it to apply to both the old and new elements, so we have to `merge` in the selection:

    var anotherSelection = d3.select('#sandbox')
      .selectAll('div')
      .data([2, 4, 6, 8, 10, 12, 14, 16]);

    anotherSelection
      .enter()
      .append('div')
      .style('background', 'lightgray')
      .style('margin', '10px')
      .merge(anotherSelection)
      .text((d) => d);

## Exit

Sometimes the situation is reversed: we have more elements than we have data. In this case, just as the `enter` group represents data without elements, the `exit` group represents the elements without data.

    var anotherOtherSelection = d3.select('#sandbox')
      .selectAll('div')
      .data(['one', 'two', 'three', 'four'])
      .text((d) => d);
    anotherOtherSelection.exit().size();

In this case, usually we just want to remove those elements:

    anotherOtherSelection.exit().remove();
