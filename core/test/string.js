+function (QUnit) {

  QUnit.module('String Algorithms');

  QUnit.test('KMP', function (assert) {
    var res = alg.KMP('ALGORITHMGORI', 'GORI');
    QUnit.deepEqual(res, [2, 9]);
  });

}(QUnit);
