/* global radix, describe, it, expect, should */

describe('radix()', function () {
  'use strict';
  var tree;
  beforeEach(function () {
    tree = new Radix();
  });

  it('exists', function () {
    expect(Radix).to.be.a('function');

  });

  it('finds inserted words', function () {
    tree.insert('bon');
    tree.insert('bonny');
    tree.insert('bond');
    tree.insert('bondage');
    expect(tree.contains('bonny')).to.equal(true);
    expect(tree.contains('bondage')).to.equal(true);
  });

  it('reconstructs the input', function () {
    tree.insert('foo');
    tree.insert('food');
    tree.insert('foody');
    tree.insert('foodyness');
    expect(tree.reconstruct().toString()).to.equal(['foo','food','foody','foodyness'].toString());
  });

  it('performs auto-complete', function () {
    tree.insert('re');
    tree.insert('revisit');
    tree.insert('revoke');
    expect(tree.complete('rev').toString()).to.equal(['revisit','revoke'].toString());
  });
  // Add more assertions here
});
