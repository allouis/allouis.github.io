---
layout: post
title: Testing private functions
description: <p> A better way of organising your private functions and testing them in node </p>
---

Last week I saw a [blog post about testing private functions](http://engineering.clever.com/2014/07/29/testing-private-functions-in-javascript-modules) within CommonJS modules. The approach taken was checking enviroment variables and exporting private functions when in "test mode".

It reminded me of a conversation I had at the pub with [Mark Everitt](https://twitter.com/qubyte) a few weeks back about testing private methods, and this post shows that way of doing this.

In the original article we have a `stats` module file

{% highlight javascript %}
// file: stats.js
var sum = function (nums) { ... };
module.exports = {
  mean: function (nums) { ... },
  standardDeviation: function (nums) { ... },
};
if (process.env.NODE_ENV === 'test') {
  module.exports._private = { sum: sum };
}
{% endhighlight %}
This works, but I think it's ugly.

The reason I think this is ugly is that the bottom conditional doesn't belong in this file, logic to do with testing should be contained the the test files themselves, you'll also end up bloating your code base with these conditionals when you have a lot of modules with private functions.

What I would suggest having a `stats` module *folder*, with private functions within that.

{% highlight javascript %}
// file: stats/index.js
var sum = require('./sum');
module.exports = {
  mean: function (nums) { ... },
  standardDeviation: function (nums) { ... },
};
{% endhighlight %}

{% highlight javascript %}
// file: stats/sum.js
var sum = function (nums) { ... };
module.exports = sum;
{% endhighlight %}

There are a few benefits from this, mainly:

 - The module is now a self contained folder, perfect for publishing to npm, a simple `git filter-branch --subdirectory-filter` makes it a seperate repo.
 - There is still no access to the `sum` function from the stats module, but can require it when we're writing tests for it.
 
I should note that yes, the consumer of the module *could* require in the sum.js file (even if it meant traversing `node_modules`). But this is clearly not the correct thing to do, and arguably, with the method shown in the mentioned blog post, the consumer could just set theit `$NODE_ENV` to `'test'` but again, this is not the correct thing to do, but they *can* do it. 

 > If you can test it, you can reach it.
 
Mark also wrote some slides on this but never got to present them, they're [availiable on speakerdeck](https://speakerdeck.com/qubyte/writing-testable-private-methods-with-node-dot-js-modules)
