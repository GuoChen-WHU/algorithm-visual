(function () {
  'use strict';

  QUnit.module('insert sort');

  var insertSort = alg.sort.insertSort;

  QUnit.test('can sort numbers', function (assert) {
    var nums = [4, 6, 2, 1, 5, 3];
    insertSort(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6]);
  });
}());
