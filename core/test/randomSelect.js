+function () {
  'use strict';

  QUnit.module('random select');

  QUnit.test('works on numbers', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5],
        target = alg.randomSelect(nums, 3);

    assert.equal(target, 3);
  });
}();
