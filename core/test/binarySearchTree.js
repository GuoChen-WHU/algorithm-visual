+function () {
  QUnit.module('Binary Search Tree');

  var tree = new alg.BST();
  tree.insert(3);
  tree.insert(1);
  tree.insert(2);
  tree.insert(5);
  tree.insert(4);
  tree.insert(6);

  QUnit.test('insert', function (assert) {
    assert.expect(6);
    assert.equal(tree.root.key, 3);
    assert.equal(tree.root.left.key, 1);
    assert.equal(tree.root.right.key, 5);
    assert.equal(tree.root.left.right.key, 2);
    assert.equal(tree.root.right.left.key, 4);
    assert.equal(tree.root.right.right.key, 6);
  });

  QUnit.test('search', function (assert) {
    var target = tree.search(4);
    assert.expect(3);
    assert.equal(target.key, 4, 'get the right node');
    target = tree.search(2);
    assert.equal(target.key, 2, 'get the right node');
    target = tree.search(3);
    assert.equal(target.key, 3, 'get the right node');
  });

  QUnit.test('inorder walk', function (assert) {
    var result = tree.inorderWalk();
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6], 'get the right sequence');
  });

  QUnit.test('min', function (assert) {
    var min = tree.min(tree.root);
    assert.equal(min.key, 1, 'get the minimum in the tree');
  });

  QUnit.test('max', function (assert) {
    var max = tree.max(tree.root);
    assert.equal(max.key, 6, 'get the maximum in the tree');
  });

  QUnit.test('successor', function (assert) {
    var successor = tree.successor(2);
    assert.equal(successor.key, 3, 'get the correct successor which is one of the ancestors');
    successor = tree.successor(5);
    assert.equal(successor.key, 6, 'get the correct successor which is in the right subtree');
  });

  QUnit.test('predecessor', function (assert) {
    var predecessor = tree.predecessor(3);
    assert.equal(predecessor.key, 2, 'get the correct predecessor which is in the left subtree');
    predecessor = tree.predecessor(4);
    assert.equal(predecessor.key, 3, 'get the correct predecessor which is one of the ancestors');
  });

  QUnit.test('transplant', function (assert) {
    var tree = new alg.BST();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    tree.transplant(tree.search(1), tree.search(2));
    assert.equal(tree.root.left.key, 2, 'change the tree stucture');
  });

  QUnit.test('delete', function (assert) {
    var tree = new alg.BST();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    tree.insert(5);
    tree.insert(4);
    tree.insert(6);
    tree.delete(3);
    assert.deepEqual(tree.inorderWalk(), [1, 2, 4, 5, 6], 'removed the target node');
  });
}();
