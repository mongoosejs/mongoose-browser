'use strict';

const MongooseCollection = require('mongoose/lib/collection');
const MongooseConnection = require('mongoose/lib/connection');

class Collection extends MongooseCollection {
  get collection() {
    return this;
  }

  aggregate() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  bulkWrite() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  createIndex() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  countDocuments() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  deleteMany() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  deleteOne() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  distinct() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  dropIndex() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  estimatedDocumentCount() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  find() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  findOne() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  findOneAndDelete() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  findOneAndReplace() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  findOneAndUpdate() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  listIndexes() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  insertMany() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  insertOne() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  replaceOne() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  updateOne() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }

  updateMany() {
    throw new Error('Database operations not supported in @mongoosejs/browser');
  }
};
exports.Collection = Collection;

exports.Connection = class Connection extends MongooseConnection {
  collection(name, options) {
    if (!(name in this.collections)) {
      this.collections[name] = new Collection(name, this, options);
    }
    return super.collection(name, options);
  }

  createCollection(name, options) {
    this.collection(name, options);
  }

  async dropCollection(name) {
    delete this.collections[name];
  }

  openUri() {
    throw new Error('Cannot call connect() in @mongoosejs/browser');
  }

  asPromise() {
    return Promise.resolve(this);
  }

  doClose(_force, cb) {
    if (cb) {
      cb(null);
    }
    return this;
  }

  async dropDatabase() {
    this.collections = {};
  }
};

exports.BulkWriteResult = function() {};
