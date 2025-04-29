'use strict';

const assert = require('assert');
const { test } = require('@playwright/test');

test('can create new schema without errors', async ({ page }) => {
  await page.addScriptTag({ path: './dist/mongoose.umd.js' });

  const result = await page.evaluate(() => {
    const schema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', schema);
    const doc = new TestModel({ name: 'John' });
    return !doc.validateSync();
  });

  assert.strictEqual(result, true);
});

test('reports validation errors', async ({ page }) => {
  await page.addScriptTag({ path: './dist/mongoose.umd.js' });

  const result = await page.evaluate(async () => {
    try {
      const schema = new mongoose.Schema({ name: { type: String, required: true } });
      const TestModel = mongoose.model('Test', schema);
      const doc = new TestModel();
      await doc.validate();
    } catch (error) {
      return error.message;
    }
  });

  assert.strictEqual(result, 'Validation failed: name: Path `name` is required.');
});

test('TestModel.findOne() throws an expected error', async ({ page }) => {
  await page.addScriptTag({ path: './dist/mongoose.umd.js' });

  const result = await page.evaluate(async () => {
    try {
      const schema = new mongoose.Schema({ name: String });
      const TestModel = mongoose.model('Test', schema);
      await TestModel.findOne();
      return false;
    } catch (error) {
      return error.message;
    }
  });

  assert.strictEqual(result, 'Database operations not supported in @mongoosejs/browser');
});

test('TestModel.find() throws an expected error', async ({ page }) => {
  await page.addScriptTag({ path: './dist/mongoose.umd.js' });

  const result = await page.evaluate(async () => {
    try {
      const schema = new mongoose.Schema({ name: String });
      const TestModel = mongoose.model('Test', schema);
      await TestModel.find();
      return false;
    } catch (error) {
      return error.message;
    }
  });

  assert.strictEqual(result, 'Database operations not supported in @mongoosejs/browser');
});

test('mongoose.connect() throws an expected error', async ({ page }) => {
  await page.addScriptTag({ path: './dist/mongoose.umd.js' });

  const result = await page.evaluate(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/test');
      return false;
    } catch (error) {
      return error.message;
    }
  });

  assert.strictEqual(result, 'Cannot call connect() in @mongoosejs/browser');
});
