+function (QUnit) {

  var DP = alg.DP;

  QUnit.module('Dynamic Programming');

  QUnit.test('cut rod', function (assert) {
    var cutRod = DP.cutRod([0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30]);

    assert.expect(6);
    assert.equal(cutRod(4).earning, 10);
    assert.equal(cutRod(4).partions, '2 2');
    assert.equal(cutRod(7).earning, 18);
    assert.equal(cutRod(7).partions, '1 6');
    assert.equal(cutRod(10).earning, 30);
    assert.equal(cutRod(10).partions, '10');
  });

  QUnit.test('LCS', function (assert) {
    var res = DP.LCS('ABCBDAB', 'BDCABA');
    assert.deepEqual(res, 'BCBA');
  });

  QUnit.test('LCCS', function (assert) {
    var consecutive = true,
        res = DP.LCS('ABCBDAB', 'BDCABA', consecutive);

    assert.deepEqual(res, 'AB');
  });

}(QUnit);
