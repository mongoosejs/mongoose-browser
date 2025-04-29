'use strict';

/**
 * Module dependencies.
 */

const assert = require('assert');
const mongoose = require('../browser');
const exec = require('child_process').exec;

/**
 * Test.
 */
describe('browser', function() {
  it('require() works with no other require calls (gh-5842)', function(done) {
    exec('node --eval "require(\'./browser\')"', done);
  });

  it('using schema (gh-7170)', function(done) {
    exec('node --eval "const mongoose = require(\'./browser\'); new mongoose.Schema();"', done);
  });

  it('document works (gh-4987)', function() {
    const schema = new mongoose.Schema({
      name: { type: String, required: true },
      quest: { type: String, match: /Holy Grail/i, required: true },
      favoriteColor: { type: String, enum: ['Red', 'Blue'], required: true }
    });

    assert.doesNotThrow(function() {
      new mongoose.Document({}, schema);
    });
  });

  it('document validation with arrays (gh-6175)', async function() {
    const Point = new mongoose.Schema({
      latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
      },
      longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
      }
    });

    const schema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      vertices: {
        type: [Point],
        required: true
      }
    });

    let test = new mongoose.Document({
      name: 'Test Polygon',
      vertices: [
        {
          latitude: -37.81902680201739,
          longitude: 144.9821037054062
        }
      ]
    }, schema);

    // Should not throw
    await test.validate();

    test = new mongoose.Document({
      name: 'Test Polygon',
      vertices: [
        {
          latitude: -37.81902680201739
        }
      ]
    }, schema);

    const error = await test.validate().then(() => null, err => err);
    assert.ok(error.errors['vertices.0.longitude']);
  });

  it('throws errors when using db operations', async function () {
    const TestModel = mongoose.model('Test', mongoose.Schema({ name: String }));
    const doc = new TestModel({ name: 'test' });
    await assert.rejects(doc.save(), /Database operations not supported in @mongoosejs\/browser/);

    await assert.rejects(TestModel.aggregate([{ $match: {} }]), /Database operations not supported in @mongoosejs\/browser/);
    await assert.rejects(TestModel.create({ name: 'test' }), /Database operations not supported in @mongoosejs\/browser/);
    await assert.rejects(TestModel.deleteMany({ name: 'test' }), /Database operations not supported in @mongoosejs\/browser/);
    await assert.rejects(TestModel.deleteOne({ name: 'test' }), /Database operations not supported in @mongoosejs\/browser/);
    await assert.rejects(TestModel.find({ name: 'test' }), /Database operations not supported in @mongoosejs\/browser/);
    await assert.rejects(TestModel.findOne({ name: 'test' }), /Database operations not supported in @mongoosejs\/browser/);
    await assert.rejects(TestModel.updateMany({ name: 'test' }, { name: 'test2' }), /Database operations not supported in @mongoosejs\/browser/);
    await assert.rejects(TestModel.updateOne({ name: 'test' }, { name: 'test2' }), /Database operations not supported in @mongoosejs\/browser/);
  });
});
