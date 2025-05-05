# @mongoosejs/browser

Browser-based driver and pre-compiled bundle for running Mongoose in the browser, which supports creating schemas and validating documents in the browser.
`@mongoosejs/browser` does **not** support saving documents, [queries](http://mongoosejs.com/docs/queries.html), [populate](http://mongoosejs.com/docs/populate.html), [discriminators](http://mongoosejs.com/docs/discriminators.html), or any other Mongoose feature other than creating schemas, defining models, and validating documents.

This package has a pre-built bundle of the browser library, including Mongoose.
If you're bundling your code with [Webpack](https://webpack.js.org/), you should be able to import Mongoose's browser library as shown below if your Webpack `target` is `'web'`:

```javascript
import mongoose from 'mongoose';
```

You can use the below syntax to access the Mongoose browser library from Node.js:

```javascript
// Using `require()`
const mongoose = require('@mongoosejs/browser');

// Using ES6 imports
import mongoose from '@mongoosejs/browser';
```

## Using the Browser Library {#usage}

Mongoose's browser library is very limited. The only use case it supports is validating documents as shown below.

```javascript
import mongoose from 'mongoose';

const TestModel = mongoose.model('Test', new mongoose.Schema({
  name: { type: String, required: true }
}));
const doc = new TestModel({});
// Prints an error because `name` is required.
console.log(doc.validateSync());

// Alternative syntax, bypassing creating a model.
const doc2 = new mongoose.Document({}, new mongoose.Schema({
  name: { type: String, required: true }
}));
// Prints an error because `name` is required.
console.log(doc2.validateSync());
```

You cannot use Mongoose's browser build to `save()` documents or execute queries.
