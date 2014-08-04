var Radix = require('./main.js').Radix;

var tree = new Radix();

tree.documentInsert('Welcome to the future of cool npm modules');

console.log(tree.countChars());

console.log(tree.reconstruct());