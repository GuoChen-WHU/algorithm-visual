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
  // receive a callback as parameter

  alg.sort = {};

  alg.sort.insertSort = function (array, cb) {
    if (!array.length) return;

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

  alg.sort.mergeSort = function (array, cb) {
    if (!array.length) return;

    cb = cb || function () {};

    var p = 0,
        r = array.length - 1;

    mergeSort(array, p, r, cb);
  };

  function mergeSort (array, p, r, cb) {
    if (p < r) {
      var q = Math.floor((p + r) / 2);
      mergeSort(array, p, q, cb);
      mergeSort(array, q + 1, r, cb);
      merge(array, p, q, r);

      cb(generateArray(p, r, 1), null, array.concat());
    }
  }

  function merge (array, p, q, r) {
    var n1 = q - p + 1,
        n2 = r - q,
        left = new Array(n1 + 1),
        right = new Array(n2 + 1),
        i,
        j,
        k;

    for (i = 0; i < n1; i++ ) {
      left[i] = array[p + i];
    }
    left[n1] = Infinity;
    for (j = 0; j < n2; j++) {
      right[j] = array[q + 1 + j];
    }
    right[n2] = Infinity;

    for (k = p; k <= r; k++) {
      if (left[0] <= right[0]) {
        array[k] = left[0];
        left.shift();
      } else {
        array[k] = right[0];
        right.shift();
      }
    }
  }

  function generateArray (start, end, increment) {
    if (start > end && increment > 0 || start < end && increment < 0) return;

    var temp;
    if (start > end) {
      temp = start;
      start = end;
      end = temp;
    }

    temp = [];
    for (var i = start; i <= end; i += increment) {
      temp.push(i);
    }
    return temp;
  }

  alg.sort.bubbleSort = function (array, cb) {
    if (!array.length) return;

    cb = cb || function () {};

    var len = array.length,
        i,
        j,
        temp;

    for (i = 0; i < len - 1; i++) {
      for (j = i + 1; j < len; j++) {
        if (array[j] < array[i]) {
          temp = array[i];
          array[i] = array[j];
          array[j] = temp;
          cb(j, i, array.concat());
        }
      }
    }
  };
}());
