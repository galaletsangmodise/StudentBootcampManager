# Student Bootcamp Manager

## Project Description
A console application that registers students, calculates averages, determines PASS/FAIL
using a configurable passing mark, processes students asynchronously and prints a final report.

## Features
- Student registration with unique generated IDs
- Average calculation and PASS/FAIL status (default pass mark: 50)
- Asynchronous student processing with callbacks
- Final report (per-student table + class totals)
- Handling of invalid marks, wrong data types and unknown students

## Technologies
JavaScript (ES6+), Node.js, Console

## How to Run
1. Install Node.js
2. Save `app.js` in a folder
3. Run `node app.js`

## Module 4 Concepts
Default parameters, rest parameters, spread syntax, closures, IIFE, functions as values,
higher-order functions, callbacks, `this`, `call()`, `apply()`, `bind()`,
generators (`function*`, `yield`, `.next()`), asynchronous programming (`setTimeout()`)

## Challenges
1. Processing students one after another with `setTimeout` without blocking.
2. Losing `this` when passing an object method to `setTimeout`.
3. Handling students with no marks or invalid marks.

## Solutions
1. A recursive `processAll` that calls the next student inside each callback.
2. `bind()` fixes `this` to the object.
3. Invalid marks are filtered at registration; no marks gives average `null` and status `N/A`.