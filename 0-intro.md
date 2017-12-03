---
layout: sandbox
---
## Introduction

[D3.js](https://d3js.org/) is a JavaScript library for generating documents from data. This tutorial series will introduce some of the core concepts of D3 as they apply to data visualization.

---

### Interactivity

The tutorials are interactive. That means that when you see a JavaScript code block like the one below, you can run it by clicking on it and pressing `Ctrl + Enter`.

    5 + 9;

You can also modify it. Try modifying the numbers above and re-running. As you progress through these tutorials, I encourage you to test your understanding by modifying the code. If you "break" anything, you can always reload the page to get back to the original state.

---

### The Sandbox

Throughout these tutorials we will be creating visualizations directly on the tutorial pages. The pages contain a special element, with the id `"sandbox"`, that doesn't scroll with the page. We will work inside this element, so that it's always visible regardless of where you are in the tutorial.

Run this code to draw a big red box in the sandbox.

    document.getElementById('sandbox')
        .innerHTML = `
            <div style="width: 100%;
              height: 100%;
              background: red;">
            #sandbox</div>`;

Now click the "reset sandbox" button at the bottom-left corner of the sandbox to reset the sandbox.

---

### JavaScript Console

One valuable tool for any JavaScript development is the console. The console is normally hidden but easy to open. In Chrome, `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Shift + J` (Mac) will open the console.

You can use `console.log` to insert logging statements into your JavaScript code. They will then appear in the console. In the tutorial cells, they are also copied under the cell for convenience.

    console.log('test');

The Chrome JavaScript console is more powerful than the in-page logging, because it allows you to interactively explore objects logged. Open the Chrome log console. Compare the boring log text of the cell below with the output in the in-browser console.

    console.log({a: 1, b: 2});

When you log page elements, Chrome will even highlight the element on the page when you hover over it in the console log:

    console.log(
        document.getElementById('sandbox'));
