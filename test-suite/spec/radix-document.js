/* global radix-inorder, describe, it, expect, should */

describe('radix-inorder()', function () {
  'use strict';
  var tree;

  beforeEach(function () {
    tree = new Radix();
  });

  it('can reconstruct a string in order', function () {
    var x = "There once was a simple little boy. He lived in a cute little house. Whenever he walked to the store, he brought his pet dog. One day, he saw a huge bird with a black beak. The bird swooped down and stole the little boys candy. After that, he always brought a slingshot when he left the house. Another time, the bird came swooping down from the clouds. The boy held up his slingshot but he was too scared to fire it and the bird stole his candy again. Isnt life tragic!";
    tree.documentInsert(x);
    console.log(tree.countChars());
    console.log('string length: '+x.length);
    console.log(tree.reconstruct());
    expect(tree.reconstruct()).to.equal(x);
  });

  it('does something', function () {
    expect(true).to.equal(false);
  });

  it('does something else', function () {
    expect(true).to.equal(false);
  });

  // Add more assertions here
});
