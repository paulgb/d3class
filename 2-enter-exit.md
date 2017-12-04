---
layout: sandbox
title: Enter and Exit Groups
---

# Enter / Exit

So far, we've seen that if we have some elements on a page, and the *same number* of items in a list, we can use D3's data binding to associate each element with an item.

Then, as we saw in Exercise 3, when there are fewer elements in the selection than the data, the extra data items are ignored. Similarly, when there are more elements than data, the elements that aren't associated with data are unaffected when we modify the DOM.

**D3 doesn't just discard these leftover elements and data, though.** It exposes them as `enter` and `exit` groups.

---

## Enter

In the last tutorial, we selected all `<div>` elements under the sandbox with `d3.selectAll('#sandbox div')`. Another way of writing this is:

    d3.select('#sandbox')
      .selectAll('div');

I want to point out a couple of things here:
- `select` is like `selectAll`, except that it will select only the first matching element. Here I could have used `selectAll`, since there is only one element with the ID `sandbox`, but using `select` makes the intention of the code clearer.
- `selectAll` (and `select`) can be called *on another selection* to select from within a selection. So the code above will first select the element with the ID `sandbox`, and then any `<div>` elements inside of that.

---

Since we haven't yet created any divs, the selection is empty:

    selection = d3.select('#sandbox')
      .selectAll('div');
    selection.size();

Let's create some data and bind it anyway.

    numbers = [1, 2, 3, 4, 5];
    boundSelection = selection.data(numbers);

After data binding, our selection is still "empty":

    boundSelection.size();

D3 hasn't thrown out the extra data though. It's set it aside into an "enter" group:

    boundSelection.enter().data();

---

We can call `append` on the enter group to add elements for each data point:

    boundSelection
      .enter()
        .append('div')
        .style('background', 'lightgray')
        .style('margin', '10px')
        .text((d) => d);

---

In this case **all** of the data that we bound to went into the enter group, because there were no elements in the selection. Now that we have created some elements, let's see what happens when we bind more data:

    newSelection = d3.select('#sandbox')
      .selectAll('div')
      .data([10, 20, 30, 40, 50, 60, 70]);

This time, five elements exist and we are binding to seven pieces of data. What will the size of `newSelection` be?

    newSelection.size();

We can also look at the "entering" data:

    newSelection.enter().data();

---

Just as before, we can use `append` to create elements for the new data.

    newSelection.enter()
      .append('div')
      .style('background', 'lightgray')
      .style('margin', '10px')
      .text((d) => d);

---

Notice that the old values didn't change! That's because the `text` call only applied to the `enter` group, so old data points were not included. We'd like it to apply to both the old and new elements, so we have to `merge` in the selection:

    anotherSelection = d3.select('#sandbox')
      .selectAll('div')
      .data([2, 4, 6, 8, 10, 12, 14, 16]);

    anotherSelection
      .enter()
      .append('div')
      .style('background', 'lightgray')
      .style('margin', '10px')
      .merge(anotherSelection)
      .text((d) => d);

---

## Exit

Sometimes the situation is reversed: we have more elements than we have data. In this case, just as the `enter` group represents data without elements, the `exit` group represents the elements without data.

    anotherOtherSelection = d3.select('#sandbox')
      .selectAll('div')
      .data(['one', 'two', 'three', 'four'])
      .text((d) => d);
    anotherOtherSelection.exit().size();

In this case, usually we just want to remove those elements:

    anotherOtherSelection.exit().remove();

---

The enter/update/exit pattern is critical to get right for dynamic visualizations, where the underlying data changes and the visualization updates to reflect it (maybe the data is live, or the user is able to filter the data).

For static visualizations, i.e. visualizations where the underlying data never changes, we can avoid most of the complexity by **binding data only to empty selectors**. We then use `enter` and `append` to build elements.