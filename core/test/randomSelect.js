+function () {
  QUnit.module('random select');

  QUnit.test('can select right order num', function (assert) {
    var nums = [6, 3, 4, 1, 2, 5],
        target = alg.randomSelect(nums, 3);

    assert.equal(target, 3);
  });
}();
