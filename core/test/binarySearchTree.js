+function () {
  QUnit.module('Binary Search Tree');

  var tree = new alg.BST();
  tree.insert(3);
  tree.insert(1);
  tree.insert(2);
  tree.insert(5);
  tree.insert(4);
  tree.insert(6);

  QUnit.test('Insert node correctly', function (assert) {
    assert.expect(6);
    assert.equal(tree.root.key, 3);
    assert.equal(tree.root.left.key, 1);
    assert.equal(tree.root.right.key, 5);
    assert.equal(tree.root.left.right.key, 2);
    assert.equal(tree.root.right.left.key, 4);
    assert.equal(tree.root.right.right.key, 6);
  });

  QUnit.test('Can search certain node', function (assert) {
    var target = tree.search(4);
    assert.expect(3);
    assert.equal(target.key, 4);
    target = tree.search(2);
    assert.equal(target.key, 2);
    target = tree.search(3);
    assert.equal(target.key, 3);
  });

  QUnit.test('Inorder walk works correctly', function (assert) {
    var result = tree.inorderWalk();
    assert.deepEqual(result, [1, 2, 3, 4, 5, 6]);
  });

  QUnit.test('Can find the minimum', function (assert) {
    var min = tree.min(tree.root);
    assert.equal(min.key, 1);
  });

  QUnit.test('Can find the maximum', function (assert) {
    var max = tree.max(tree.root);
    assert.equal(max.key, 6);
  });

  QUnit.test('Can find the successor', function (assert) {
    var successor = tree.successor(2);
    assert.equal(successor.key, 3);
    successor = tree.successor(4);
    assert.equal(successor.key, 5);
  });

  QUnit.test('Can find the predecessor', function (assert) {
    var predecessor = tree.predecessor(3);
    assert.equal(predecessor.key, 2);
    predecessor = tree.predecessor(4);
    assert.equal(predecessor.key, 3);
  });

  QUnit.test('Can transplant subtrees', function (assert) {
    var tree = new alg.BST();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    tree.transplant(tree.search(1), tree.search(2));
    assert.equal(tree.root.left.key, 2);
  });

  QUnit.test('Can delete nodes', function (assert) {
    var tree = new alg.BST();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    tree.insert(5);
    tree.insert(4);
    tree.insert(6);
    tree.delete(3);
    assert.deepEqual(tree.inorderWalk(), [1, 2, 4, 5, 6]);
  });
}();
