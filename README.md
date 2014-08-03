Radix - A Compact Prefix Tree
=============================

Compact prefix trees store strings efficiently by storing only the difference between
each insertion and the current content of the tree. If we initialize the tree and then add the strings "to", "ton", "tone", and "tonight" in order, our tree will only save 'to', 'n', 'e', and 'ight' in a way that the original input can be reconstructed by traversing the tree.   

The Radix constructor currently has the following functions:    

Insert: Insert a new string into the tree

CountChars: Count the total number of characters in the tree. For the above example countChars would return '8', which is half of the total number of characters entered into the tree.

Reconstruct: Generate an array of all strings entered into the tree.

Complete: This is the classic autocomplete function. Given a partial word, the tree will return all words in the tree that can be made with that partial. If we call tree.complete('toni') on the example above, it will return ['tonight']. 