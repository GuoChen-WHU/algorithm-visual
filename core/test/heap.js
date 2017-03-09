+function () {

  QUnit.module('heap sort');

  QUnit.test('works on numbers', function(assert) {
    var nums = [6, 3, 4, 1, 2, 5],
        heap = new alg.Heap(nums);

    heap.heapSort();
    assert.deepEqual(heap.elements, [1, 2, 3, 4, 5, 6]);
  });
}();
