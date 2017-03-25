+function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.alg = global.alg || {})));
}(this, (function (exports) { 'use strict';

  // Util
  // --------------------

  var swap = function (array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };

  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(array) === '[object Array]';
  };

  // Validate user input
  var validate = function (method, options) {
    options || (options = validate.defaultOptions);
    return function () {
      var i, obj;
      for (i = 0; i < options.num; i++) {
        obj = arguments[i];
        if (!validate[options.type + 'Validator'](obj))
          throw Error('Inputs [' + i + '] should be a non-empty ' + options.type);
      }
      return method.apply(options.context, [].slice.call(arguments));
    };
  };

  validate.defaultOptions = {
    type: 'array',
    num: '1',
    context: null
  };

  validate.arrayValidator = function (obj) {
    return isArray(obj) && obj.length > 0;
  };

  validate.stringValidator = function (obj) {
    return typeof obj === 'string' && obj.length > 0;
  };

  // Sort
  // --------------------
  // Each algorithm receive a callback as parameter for
  // convinence of visualization.

  var sort = {};

  sort.insert = validate(function (array, cb, step) {
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
  });

  sort.shell = validate(function (array, cb) {
    cb = cb || function () {};

    var step = array.length;

    // /2 ensure the last step be 1
    while (step = Math.floor(step / 2)) {
      sort.insert(array, cb, step);
    }
  });

  sort.merge = validate(function (array, cb) {
    cb = cb || function () {};

    var p = 0,
        r = array.length - 1;

    mergeSort(array, p, r, cb);
  });

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

  sort.bubble = validate(function (array, cb) {
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
  });

  sort.select = validate(function (array, cb) {
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
  });

  sort.quick = validate(function (array, cb) {
    cb = cb || function () {};

    var p = 0,
        r = array.length - 1;

    quickSort(array, p, r, cb);
  });

  function quickSort (array, p, r, cb) {
    if (p < r) {
      var q = partition(array, p, r, cb);
      quickSort(array, p, q - 1, cb);
      quickSort(array, q + 1, r, cb);
    }
  }

  function partition (array, p, r, cb) {
    cb = cb || function () {};

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
  sort.count = validate(function (array, cb, radix) {
    if (Math.min.apply(null, array) < 0) return;

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
  });

  sort.radix = validate(function (array, cb) {
    if (Math.min.apply(null, array) < 0) return;

    cb = cb || function () {};

    var max = Math.max.apply(null, array),
        d = String(max).length,
        digs = [],
        i;

    for (i = 0; i < d; i++) {
      digs = getDigitsAt(array, i);
      sort.count(digs, cb, array);
    }

  });

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

  sort.bucket = validate(function (array, cb) {
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
      if (buckets[i].length > 0) {
        sort.insert(buckets[i]);
        result = result.concat(buckets[i]);
      }
    }
    for (i = 0; i < len; i++) {
      array[i] = result[i];
    }
  });


  // Heap
  // --------------------
  var Heap = function (array) {
    this.elements = array;
  };

  Heap.prototype.size = function () {
    return this.elements.length;
  };

  Heap.prototype.leftChild = function (i) {
    return i * 2 + 1;
  };

  Heap.prototype.rightChild = function (i) {
    return i * 2 + 2;
  };

  Heap.prototype.parent = function (i) {
    return i <= 0 ? undefined : Math.floor((i - 1 )/ 2);
  };

  Heap.prototype.maxHeapify = function (i, cb) {
    cb = cb || function () {};

    var left = this.leftChild(i),
        right = this.rightChild(i),
        largest = i;

    cb(i);
    if (this.elements[left] > this.elements[i]) largest = left;
    if (this.elements[right] > this.elements[largest]) largest = right;
    if (largest !== i) {
      cb(i, largest);
      swap(this.elements, largest, i);
      cb(largest, i, this.elements.concat());
      this.maxHeapify(largest, cb);
    }
  };

  Heap.prototype.buildMaxHeap = function () {
    var size = this.size(),
        i = Math.floor((size - 2) / 2);

    for (; i >= 0; i--) {
      this.maxHeapify(i);
    }
  };

  Heap.prototype.heapSort = function () {
    var result = [],
        i = this.size() - 1;
    this.buildMaxHeap();

    for (; i > 0; i--) {
      swap(this.elements, 0, i);
      result.unshift(this.elements.pop());
      this.maxHeapify(0);
    }
    result.unshift(this.elements[0]);
    this.elements = result;
  };

  // Select
  // ------------------
  var randomSelect = validate(function (array, i) {
    var p = 0,
        r = array.length - 1;
    return _randomSelect(array, p, r, i);
  });

  var _randomSelect = function (array, p, r, i) {
    if (p === r) return array[p];

    var q = partition(array, p, r),
        k = q - p + 1;

    if (i === k) return array[q];
    else if (i > k) return _randomSelect(array, q + 1, r, i - k);
    else return _randomSelect(array, p, q - 1, i);
  };


  // Binary search tree
  // ------------------
  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.parent = null;
  };

  var BST = function () {
    this.root = null;
  };

  BST.prototype.insert = function (key) {
    // y always point to parent of x
    var y = null,
        x = this.root,
        node = new Node(key);

    while (x !== null) {
      y = x;
      if (x.key > key)
        x = x.left;
      else x = x.right;
    }
    node.parent = y;
    if (y === null) { // tree is empty
      this.root = node;
    } else if (key < y.key) {
      y.left = node;
    } else {
      y.right = node;
    }
  };

  BST.prototype.search = function (key) {
    return _binarySearch(this.root, key);
  };

  var _binarySearch = function (root, key) {
    if (root === null || root.key === key) return root;
    if (root.key < key)
      return _binarySearch(root.right, key);
    else return _binarySearch(root.left, key);
  };

  BST.prototype.inorderWalk = function () {
    var result = [];
    _inorderWalk(this.root, result);
    return result;
  };

  var _inorderWalk = function (root, result) {
    if (root !== null) {
      _inorderWalk(root.left, result);
      result.push(root.key);
      _inorderWalk(root.right, result);
    }
  };

  BST.prototype.min = function (root) {
    while (root && root.left) {
      root = root.left;
    }
    return root;
  };

  BST.prototype.max = function (root) {
    while (root && root.right) {
      root = root.right;
    }
    return root;
  };

  BST.prototype.successor = function (key) {
    var node = this.search(key),
        y;
    if (node.right) return this.min(node.right);
    if (node.parent) {
      y = node.parent;
      while (y) {
        if (y.left === node)
          return y;
        else {
          node = y;
          y = y.parent;
        }
      }
    }
    return null;
  };

  BST.prototype.predecessor = function (key) {
    var node = this.search(key),
        y;
    if (node.left) return this.max(node.left);
    if (node.parent) {
      y = node.parent;
      while (y) {
        if (y.right === node)
          return y;
        else {
          node = y;
          y = y.parent;
        }
      }
    }
    return null;
  };

  BST.prototype.transplant = function (u, v) {
    if (u === this.root) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    if (v) {
      v.p = u.p;
    }
  };

  // *hard
  BST.prototype.delete = function (key) {
    var node = this.search(key),
        y;

    // if only one child, use the child to replace it
    if (!node.left) this.transplant(node, node.right);
    else if (!node.right) this.transplant(node, node.left);

    else {
      y = this.successor(key);
      if (y.parent !== node) {
        this.transplant(y, y.right);
        y.right = node.right;
        y.right.parent = y;
      }
      this.transplant(node, y);
      y.left = node.left;
      y.left.parent = y;
    }
  };


  // red-black tree
  // ---------------------

  var BLACK = 0,
      RED = 1;

  var nil = {
    color: BLACK
  };

  var rbtNode = function (key, color) {
    this.key = key;
    this.color = color;
    this.left = nil;
    this.right = nil;
    this.parent = nil;
  };

  var RBT = function () {
    this.root = nil;
  };

  RBT.prototype.leftRotate = function (x) {
    var y = x.right;

    // turns y's left subtree into x's right subtree
    x.right = y.left;
    if (y.left !== nil) y.left.parent = x;

    // link x's parent to y
    y.parent = x.parent;
    if (x.parent = nil) this.root = y;
    else if (x === x.parent.left)
      x.parent.left = y;
    else x.parent.right = y;

    // put x on y's left
    y.left = x;
    x.parent = y;
  };

  RBT.prototype.rightRotate = function (y) {
    var x = y.left;

    y.left = x.right;
    if (x.right !== nil) x.right.parent = y;

    x.parent = y.parent;
    if (y.parent = nil) this.root = x;
    else if (y === y.parent.left)
      y.parent.left = x;
    else y.parent.right = x;

    x.right = y;
    y.parent = x;
  };

  RBT.prototype.insert = function (key) {
    var z = new rbtNode(key, RED),
        y = nil,
        x = this.root;

    while (x !== nil) {
      y = x;
      if (x.key < key)
        x = x.right;
      else x = x.left;
    }

    z.parent = y;
    if (y === nil)
      this.root = z;
    else if (key < y.key)
      y.left = z;
    else y.right = z;

    this.insertFixup(z);
  };

  RBT.prototype.insertFixup = function (z) {

  };

  // Dynamic Programming
  // ------------------------

  var DP = {};

  DP.cutRod = validate(function (price) {
    var len = price.length - 1,
        res = new Array(len + 1),
        fir = new Array(len + 1),
        i,
        j,
        q;

    res[0] = 0;
    for (j = 1; j <= len; j++) {
      q = -Infinity;
      for (i = 1; i <= j; i++) {
        if (q < price[i] + res[j - i]) {
          q = price[i] + res[j - i];
          fir[j] = i;
        }
      }
      res[j] = q;
    }

    return function (len) {
      var earning = res[len],
          partions = '';
      while (len > 0) {
        partions += fir[len] + ' ';
        len = len - fir[len];
      }
      return {
        earning: earning,
        partions: partions.slice(0, -1)
      }
    };
  });

  DP._LCSLength = function (x, y, consecutive) {
    var m = x.length - 1,
        n = y.length - 1,
        c = new Array(m + 1);

    for (var i = 0; i <= m; i++) {
      c[i] = new Array(n + 1);
      c[i][0] = 0;
    }
    for (var j = 1; j <= n; j++) {
      c[0][j] = 0;
    }
    for (i = 1; i <= m; i++) {
      for (j = 1; j <= n; j++) {
        if (x[i] === y[j]) {
          c[i][j] = c[i - 1][j - 1] + 1;
          // in LCCS, record LCSS end position
          if (consecutive) {
            c.lx = i;
            c.ly = j;
          }
        } else if (consecutive) {
          c[i][j] = 0;
        } else if (c[i - 1][j] >= c[i][j - 1]) {
          c[i][j] = c[i - 1][j];
        } else {
          c[i][j] = c[i][j - 1];
        }
      }
    }
    return c;
  };

  DP._printLCS = function (c, x, i, j, res) {
    if (i === 0 || j === 0) return;

    if (c[i][j] === c[i - 1][j]) {
      this._printLCS(c, x, i - 1, j, res);
    } else if (c[i][j] === c[i][j - 1]) {
      this._printLCS(c, x, i, j - 1, res);
    } else {
      this._printLCS(c, x, i - 1, j - 1, res);
      res.push(x[i]);
    }
  };

  DP._printLCCS = function (c, x, i, j, res) {
    while (c[i][j]) {
      res.unshift(x[i]);
      i--;
      j--;
    }
  };

  DP.LCS = validate(function (x, y, consecutive) {
    // ensure index start at 1
    x = '$' + x;
    y = '$' + y;

    var counts = DP._LCSLength(x, y, consecutive),
        res = [];

    consecutive
      ? DP._printLCCS(counts, x, counts.lx, counts.ly, res)
      : DP._printLCS(counts, x, x.length - 1, y.length - 1, res);
    return res.join('');
  }, {
    type: 'string',
    num: 2,
    context: null
  });

  // exports
  exports.sort = sort;
  exports.Heap = Heap;
  exports.randomSelect = randomSelect;
  exports.BST = BST;
  exports.DP = DP;

}));
