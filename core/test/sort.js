(function () {
  'use strict';

  QUnit.module('insert sort');

  QUnit.test('can sort numbers', function (assert) {
    var nums = [7, 6, 2, 1, 5, 3];
    alg.sort.insert(nums);
    assert.deepEqual(nums, [1, 2, 3, 5, 6, 7]);
  });

  QUnit.module('shell sort');

  QUnit.test('can sort numbers', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.shell(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6]);
  });

  QUnit.module('merge sort');

  QUnit.test('can sort numbers', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.merge(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6]);
  });

  QUnit.module('bubble sort');

  QUnit.test('can sort numbers', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.bubble(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6]);
  });

  QUnit.module('select sort');

  QUnit.test('can sort numbers', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.select(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6]);
  });

  QUnit.module('quick sort');

  QUnit.test('can sort numbers', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.quick(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6]);
  });

  QUnit.module('count sort');

  QUnit.test('can sort numbers', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    alg.sort.count(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6]);
  });

  QUnit.test('will not break when nums contains nagetive', function (assert) {
    var nums = [-1, 2, 4, 5, 6, -3];
    alg.sort.count(nums);
    assert.ok(true);
  });

  QUnit.module('radix sort');

  QUnit.test('can sort numbers', function (assert) {
    var nums = [612, 331, 114, 321, 12, 5];
    alg.sort.radix(nums);
    assert.deepEqual(nums, [5, 12, 114, 321, 331, 612]);
  });

  QUnit.module('bucket sort');

  QUnit.test('can sort numbers', function (assert) {
    var nums = [0.612, 0.331, 0.114, 0.321, 0.12, 0.5];
    alg.sort.bucket(nums);
    assert.deepEqual(nums, [0.114, 0.12, 0.321, 0.331, 0.5, 0.612]);
  });

}());
