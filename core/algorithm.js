+function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.alg = global.alg || {})));
}(this, (function (exports) { 'use strict';

  // Sort
  // --------------------
  // Each algorithm receive a callback as parameter for
  // convinence of visualization.

  var sort = {};

  sort.insert = function (array, cb, step) {
    if (!array.length) return;

    cb = cb || function () {};

    step = step || 1;

    var len = array.length,
        i,
        j,
        key;

    for (i = step; i < len; i++) {
      key = array[i];
      for (j = i - step; j >= 0 && array[j] > key; j -= step) {
        array[j + step] = array[j];
      }
      array[j + step] = key;
      cb(i, j + step, array.concat(), step);
    }
  };

  sort.shell = function (array, cb) {
    if (!array.length) return;

    cb = cb || function () {};

    var step = array.length;

    // /2 ensure the last step be 1
    while (step = Math.floor(step / 2)) {
      sort.insert(array, cb, step);
    }
  };

  sort.merge = function (array, cb) {
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

  sort.bubble = function (array, cb) {
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

  sort.select = function (array, cb) {
    if (!array.length) return;

    cb = cb || function () {};

    var len = array.length,
        min = Infinity,
        minIdx,
        i,
        j;

    for (i = 0; i < len; i++) {
      for (j = i; j < len; j++) {
        if (array[j] < min) {
          min = array[j];
          minIdx = j;
        }
      }
      array[minIdx] = array[i];
      array[i] = min;
      cb(minIdx, i, array.concat());
      min = Infinity;
    }
  };

  sort.quick = function (array, cb) {
    if (!array.length) return;

    cb = cb || function () {};

    var p = 0,
        r = array.length - 1;

    quickSort(array, p, r, cb);
  };

  function quickSort (array, p, r, cb) {
    if (p < r) {
      var q = partition(array, p, r, cb);
      quickSort(array, p, q - 1, cb);
      quickSort(array, q + 1, r, cb);
    }
  }

  function partition (array, p, r, cb) {
    var random = Math.round(p + Math.random() * (r - p)),
        pivot = array[random],
        i,
        j,
        temp;

    array[random] = array[r];
    array[r] = pivot;

    for (i = p - 1, j = p; j < r; j++) {
      if (array[j] <= pivot) {
        i++;
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
    array[r] = array[i + 1];
    array[i + 1] = pivot;
    cb(random, i + 1, array.concat());
    return i + 1;
  }

  /**
   * Count sort
   *
   * @param {Array} radix Origin array for radix sort.
   *
   */
  sort.count = function (array, cb, radix) {
    if (!array.length || Math.min.apply(null, array) < 0) return;

    cb = cb || function () {};

    var max = Math.max.apply(null, array),
        len = array.length,
        result = new Array(len),
        count = new Array(max + 1),
        i;

    for (i = 0; i <= max; i++) {
      count[i] = 0;
    }
    for (i = 0; i < len; i++) {
      count[array[i]]++;
      result[i] = radix ? radix[i] : array[i]; // need for visualization
    }
    for (i = 0; i < max; i++) {
      count[i + 1] += count[i];
    }
    for (i = len - 1; i >= 0; i--) {
      result[count[array[i]] - 1] = radix ? radix[i] : array[i];
      cb(i, count[array[i]] - 1, result.concat());
      count[array[i]]--;
    }
    for (i = len - 1; i >= 0; i--) {
      radix ? (radix[i] = result[i]) : (array[i] = result[i]);
    }
  };

  sort.radix = function (array, cb) {
    if (!array.length || Math.min.apply(null, array) < 0) return;

    cb = cb || function () {};

    var max = Math.max.apply(null, array),
        d = String(max).length,
        digs = [],
        i;

    for (i = 0; i < d; i++) {
      digs = getDigitsAt(array, i);
      sort.count(digs, cb, array);
    }

  };

  /**
   * Get kth digit of nums (from right to left)
   *
   */
  function getDigitsAt (array, k) {
    var ret = [],
        str,
        dig;
    for (var i = 0, len = array.length; i < len; i++) {
      str = String(array[i]);
      dig = str.length - 1 - k < 0 ? 0 : str[str.length - 1 - k];
      ret.push(parseInt(dig));
    }
    return ret;
  }

  sort.bucket = function (array, cb) {
    if (!array.length) return;

    cb = cb || function () {};

    var len = array.length,
        min = Math.min.apply(null, array),
        // + 1 to let the maximum fall in the last bucket
        max = Math.max.apply(null, array) + 1,
        size = (max - min) / len,
        buckets = new Array(len),
        result = [],
        i;

    for (i = 0; i < len; i++) {
      buckets[i] = [];
    }
    for (i = 0; i < len; i++) {
      buckets[Math.floor((array[i] - min) / size)].push(array[i]);
    }
    for (i = 0; i < len; i++) {
      sort.insert(buckets[i]);
      result = result.concat(buckets[i]);
    }
    for (i = 0; i < len; i++) {
      array[i] = result[i];
    }
  };

  // exports
  exports.sort = sort;
}));
