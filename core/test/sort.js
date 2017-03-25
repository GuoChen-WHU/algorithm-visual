(function () {
  'use strict';

  QUnit.module('Sort');

  QUnit.test('insert sort', function (assert) {
    var nums = [7, 6, 2, 1, 5, 3];
    alg.sort.insert(nums);
    assert.deepEqual(nums, [1, 2, 3, 5, 6, 7], 'works fine on numbers');
  });

  QUnit.test('shell sort', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.shell(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6], 'works fine on numbers');
  });

  QUnit.test('merge sort', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.merge(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6], 'works fine on numbers');
  });

  QUnit.test('bubble sort', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.bubble(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6], 'works fine on numbers');
  });

  QUnit.test('select sort', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.select(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6], 'works fine on numbers');
  });

  QUnit.test('quick sort', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.quick(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6], 'works fine on numbers');
  });

  QUnit.test('count sort', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.count(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6], 'works fine on numbers');
  });

  QUnit.test('radix sort', function (assert) {
    var nums = [612, 331, 114, 321, 12, 5];
    alg.sort.radix(nums);
    assert.deepEqual(nums, [5, 12, 114, 321, 331, 612], 'works fine on numbers');
  });

  QUnit.test('bucket sort', function (assert) {
    var nums = [0.612, 0.331, 0.114, 0.321, 0.12, 0.5];
    alg.sort.bucket(nums);
    assert.deepEqual(nums, [0.114, 0.12, 0.321, 0.331, 0.5, 0.612], 'works fine on numbers');
  });

}());
