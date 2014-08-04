Radix - A Compact Prefix Tree
=============================

Compact prefix trees store strings efficiently by storing only the difference between
each insertion and the current content of the tree. If we initialize a tree and then add the strings "to", "ton", "tone", and "tonight" in order, our tree will only save 'to', 'n', 'e', and 'ight' in such a way that the original input can be reconstructed by traversing the tree.   

Radix-compressor is a variation of my original radix prefix tree project. Radix-compressor exposes a documentInsert() method that takes a string, presumably representing a document to be compressed, as its only parameter. Radix-compressor takes the string, turns it into an array, sorts the array by word length, and then inserts each word into a prefix tree while saving the original position of each word in the document. The input string can be recovered using the reconstruct() method on the tree.

Repeated words are not saved, their location is simply added to the node of the tree representing that word. In addition, variations of individual words are stored as difference trees in the way described above, resulting in some pretty sweet compression. I have observed compression rates with long strings around 2:1, but I encourage folks to check the results of using this algorithm with the supplied countChars() method that counts the total number of characters stored in the tree.

Use example:
-----------

```javascript
var Radix = require('radix-compression');
var tree = new Radix();

tree.documentInsert('Welcome to the future of cool npm modules.');

tree.countChars() //=> 34

tree.reconstruct() //=> 'Welcome to the future of cool npm modules.'
```