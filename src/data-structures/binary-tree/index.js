/**
 * @name BinaryTree
 * @description A javascript binary tree implementation
 * @author https://github.com/jefferson-amorim
 *
 * const btree = new BinaryTree();
 * btree.add(1); // BinaryTree instance
 * btree.contains(1); // true
 * btree.contains(2); // false
 * btree.add(2); // BinaryTree instance
 * btree.contains(2); // true
 * btree
 *   .add(5)
 *   .add(8)
 *   .add(6)
 *   .add(7)
 *   .add(4)
 *   .add(3); // BinaryTree instance
 * btree.inOrder(); // [1, 2, 3, 4, 5, 6, 7, 8]
 * btree.preOrder(); // [1, 2, 5, 4, 3, 8, 6, 7]
 * btree.postOrder(); // [3, 4, 7, 6, 8, 5, 2, 1]
 * btree.remove(6); // BinaryTree instance
 * btree.min(); // 1
 */
function BinaryTree() {}
BinaryTree.prototype = {
  add(value) {
    if (Number.isNaN(value)) {
      throw new TypeError(`value is not a number: <${typeof value}>${value}`);
    }
    if (!this.root) {
      this.root = new BinaryNode(value);
    } else if (!this.contains(value)) {
      this.root.add(value);
    }
    return this;
  },
  contains(value) {
    if (Number.isNaN(value)) {
      throw new TypeError(`value is not a number: <${typeof value}>${value}`);
    }
    return this.root ? this.root.contains(value) : false;
  },
  remove(value) {
    if (Number.isNaN(value)) {
      throw new TypeError(`value is not a number: <${typeof value}>${value}`);
    }
    if (this.root) {
      this.root = remove(this.root, value);
    }
    return this;

    function remove(node, value) {
      if (!node) {
        return;
      } else if (value < node.value) {
        node.left = remove(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = remove(node.right, value);
        return node;
      } else {
        if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        }
      }

      const minNode = node.right.min();
      node.value = minNode.value;
      node.right = remove(node.right, minNode.value);
      return node;
    }
  },
  /*
  search(value) {
    if (Number.isNaN(value)) {
      throw new TypeError(`value is not a number: <${typeof value}>${value}`);
    }
    return this.root ? this.root.search(value) : undefined;
  },
  */
  min() {
    return this.root ? this.root.min().value : undefined;
  },
  inOrder() {
    return this.root ? this.root.inOrder() : [];
  },
  postOrder() {
    return this.root ? this.root.postOrder() : [];
  },
  preOrder() {
    return this.root ? this.root.preOrder() : [];
  },
};

function BinaryNode(value) {
  this.value = value;
}
BinaryNode.prototype = {
  add(value) {
    if (value <= this.value) {
      if (!this.left) {
        this.left = new BinaryNode(value);
      } else {
        this.left.add(value);
      }
    } else {
      if (!this.right) {
        this.right = new BinaryNode(value);
      } else {
        this.right.add(value);
      }
    }
    return this;
  },
  min() {
    return this.left ? this.left.min() : this;
  },
  contains(value) {
    if (this.value === value) {
      return true;
    } else if (value < this.value) {
      return !!this.left && this.left.contains(value);
    } else {
      return !!this.right && this.right.contains(value);
    }
  },
  search(value) {
    if (this.value === value) {
      return this;
    } else if (value < this.value) {
      return !this.left ? undefined : this.left.search(value);
    } else {
      return !this.right ? undefined : this.right.search(value);
    }
  },
  inOrder() {
    // left, this value, right;
    const values = [];
    if (this.left) {
      values.push.apply(values, this.left.inOrder());
    }
    values.push(this.value);
    if (this.right) {
      values.push.apply(values, this.right.inOrder());
    }
    return values;
  },
  postOrder() {
    // left, right, this value;
    const values = [];
    if (this.left) {
      values.push.apply(values, this.left.postOrder());
    }
    if (this.right) {
      values.push.apply(values, this.right.postOrder());
    }
    values.push(this.value);
    return values;
  },
  preOrder() {
    // this.value, left, right;
    const values = [this.value];
    if (this.left) {
      values.push.apply(values, this.left.preOrder());
    }
    if (this.right) {
      values.push.apply(values, this.right.preOrder());
    }
    return values;
  },
};
