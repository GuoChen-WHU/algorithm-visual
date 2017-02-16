(function () {
  'use strict';

  QUnit.module('insert sort');

  var insertSort = alg.sort.insertSort;

  QUnit.test('can sort numbers', function (assert) {
    var nums = [7, 6, 2, 1, 5, 3];
    insertSort(nums);
    assert.deepEqual(nums, [1, 2, 3, 5, 6, 7]);
  });
}());
