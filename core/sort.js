/**
 * sort algorithms
 */

var sort = {};

sort.insertSort = function (array, cb) {
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
    cb(i + 1, key, j + 1, array[j + 1]);
    array[j + 1] = key;
  }
};

export default sort;
