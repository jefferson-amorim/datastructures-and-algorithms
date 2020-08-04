/**
 * @name Trie
 * @description A javascript trie implementation
 * @author https://github.com/jefferson-amorim
 *
 * const trie = new Trie();
 * trie.add('word'); // trie instance
 * trie.add('word1'); // trie instance
 * trie.depth('word'); // node depth
 * trie.depth('test'); // -1
 * trie.search('word'); // ['word', 'word1']
 * trie.search('word1'); // ['word1']
 * trie.search('wor'); // ['word', 'words1']
 * trie.search('test'); // []
 * trie.get('word'); // TrieNode instance;
 * trie.get('word').toString(); // 'word';
 * trie.get('test'); // undefined
 * trie.remove('word'); // trie instance
 */

function TrieNode({ key, parent, isWord = false, depth }) {
  this.children = {};
  this.key = key;
  this.parent = parent;
  this.isWord = isWord;
  this.depth = depth;
}

TrieNode.prototype = {
  toString() {
    if (!this.isWord) {
      return "";
    }
    let node = this;
    const chars = [];
    while (node) {
      chars.push(node.key || "");
      node = node.parent;
    }
    return chars.reverse().join("");
  },
};

function Trie() {
  this.children = {};
}

Trie.prototype = {
  add(key = "") {
    const chars = key.split("");
    let node = this;
    // Node 8;
    for (let i = 0, length = chars.length, char; (char = chars[i++]); ) {
      node = node.children[char] =
        node.children[char] ||
        new TrieNode({
          key: char,
          parent: node,
          isWord: false,
          depth: i,
        });
      if (i === length) {
        node.isWord = true;
      }
    }

    /*
    // Node 10+;
    let length = chars.length;
    chars.forEach((char, i) => {
      node = node.children[char] = node.children[char] || { key: char, children: {}, isWord: false };
      if (i === length) {
        node.isWord = true;
      }
    });
    */
    return this;
  },
  search(key = "") {
    const chars = key.split("");
    let node = this;
    for (let i = 0, char; (char = chars[i++]); ) {
      node = node.children[char];
      if (!node) {
        return [];
      }
    }

    function depthSearch({ children }, words) {
      const keys = Object.keys(children);
      for (let k = 0, key, child; (child = children[(key = keys[k++])]); ) {
        child.isWord && words.push(child.toString());
        depthSearch(child, words);
      }
      return words;
    }
    const words = node.isWord ? [node.toString()] : [];
    return depthSearch(node, words);
  },
  depth(key = "") {
    const chars = key.split("");
    let node = this;
    let count = 0;
    for (let i = 0, char; (char = chars[i++]); ) {
      node = node.children[char];
      if (!node) {
        return -1;
      }
      count++;
    }
    return node.isWord ? count : -1;
  },

  get(key = "") {
    const chars = key.split("");
    let node = this;
    for (let i = 0, char; (char = chars[i++]); ) {
      node = node.children[char];
      if (!node) {
        return;
      }
    }
    return node.isWord ? node : undefined;
  },

  remove(key = "") {
    let node = this.get(key);
    if (!node) {
      return this;
    }
    if (Object.keys(node.children).length) {
      node.isWord = false;
      return this;
    }

    const chars = key.split("");
    for (let lastIndex = chars.length - 1, i = lastIndex; i >= 0; i--) {
      // other words
      if (i < lastIndex && node.isWord) {
        break;
      }

      // no more children
      if (!Object.keys(node.children).length) {
        delete node.parent.children[node.key];
      }
      node = node.parent;
    }
    return this;
  },
};
