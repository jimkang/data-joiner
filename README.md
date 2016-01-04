data-joiner
===========

[![Build Status](https://travis-ci.org/jimkang/data-joiner.svg?branch=master)](https://travis-ci.org/jimkang/data-joiner)

Maintains a selection of objects, providing enter and exit arrays with each update, a la D3, except without the DOM.

Inspired by [eue](https://github.com/hughsk/eue); I needed to write this module because I need key function support.

For background on D3-style data joins, see [Thinking with Joins](http://bost.ocks.org/mike/join/) and the [D3-selection documentation](https://github.com/mbostock/d3/wiki/Selections).

Installation
------------

    npm install data-joiner

Usage
-----

First, you create the joiner object by calling `DataJoiner` with an opts object that has a property called `keyFn`.

    var DataJoiner = require('data-joiner');
    var joiner = DataJoiner({
      keyFn: function getId(datum) {
        return datum.id;
      }
    });

`keyFn` is like the [D3 selection.data key function](https://github.com/mbostock/d3/wiki/Selections#data) in that it is used to identify a datum. The function should take a datum from the arrays you give the joiner and return a value. That value will be used to evaluate the equality of two data. If keyFn returns different values for Datum A and Datum B, then Datum A and Datum B are considered different. If it returns the same value for those two, then they are considered equal.

Next, you call `update` with an array of what you consider the current data. The joiner will then figure out for you which array items are new and which array items from the previous update have been removed.

    joiner.update([
      {
        id: 'a',
        val: 1
      },
      {
        id: 'b',
        val: 2
      }
    ]);

To get the array items are new as of that update, call `enter`.

    joiner.enter();

Result:

    [
      {
        id: 'a',
        val: 1
      },
      {
        id: 'b',
        val: 2
      }
    ]

To get the items from the previous update have been removed, call `exit`:

    joiner.exit();

Result:

    []

This isn't too exciting because this is the first update. Everything in the update is new, so it's all in the enter selection. And nothing is in the exit selection because nothing was removed.

The joiner, however, is for situations in which you will update the current selection several times. So, let's call `update` again and see what happens.

    joiner.update([
      {
        id: 'b',
        val: 2
      },
      {
        id: 'c',
        val: 3
      },
      {
        id: 'd',
        val: 4
      }
    ]);

Here, the datum with the id 'b' is the same as in the previous update. However, 'c' and 'd' are new, so those will show up in the `enter` selection.

    joiner.enter();

Result:

    [
      {
        id: 'c',
        val: 3
      },
      {
        id: 'd',
        val: 4
      }
    ]

However, 'a' was in the previous update but is not in the current update. So, it is the sole item in the array returned by `exit`.

    joiner.exit();

Result:

    [
      {
        id: 'a',
        val: 1
      }
    ]

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
