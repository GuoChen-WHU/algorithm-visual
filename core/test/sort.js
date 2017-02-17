(function () {
  'use strict';

  QUnit.module('insert sort');

  var insertSort = alg.sort.insertSort;

  QUnit.test('can sort numbers', function (assert) {
    var nums = [7, 6, 2, 1, 5, 3];
    insertSort(nums);
    assert.deepEqual(nums, [1, 2, 3, 5, 6, 7]);
  });

  QUnit.module('merge sort');

  var mergeSort = alg.sort.mergeSort;

  QUnit.test('can sort numbers', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    mergeSort(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6]);
  });

  QUnit.module('bubble sort');

  var bubbleSort = alg.sort.bubbleSort;

  QUnit.test('can sort numbers', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5];
    bubbleSort(nums);
    assert.deepEqual(nums, [1, 2, 3, 4, 5, 6]);
  });

}());
