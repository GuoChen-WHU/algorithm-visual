(function () {
  var root = this;

  var alg = {};

  if (typeof exports != 'undefined') {
    if (typeof module != 'undefined' && module.exports) {
      exports = module.exports = alg;
    }
  } else {
    root.alg = alg;
  }

  // Sort
  // --------------------
  alg.sort = {};

  alg.sort.insertSort = function (array, cb) {
    if (!array.length) return;

    array = array.concat();
    cb = cb || function () {};

    var len = array.length,
        i,
        j,
        key;

    for (i = 0; i < len - 1; i++) {
      key = array[i + 1];
      for (j = i; j >= 0; j--) {
        if (key < array[j]) array[j + 1] = array[j];
        else break;
      }
      array[j + 1] = key;
      cb(i + 1, j + 1, array.concat());
    }
  };
}());
