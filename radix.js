// this is the main constructor function, each node takes a string 
// as a value and has an array of children

var Radix = function(value){
  value = value || '';
  this.value = value;
  this.children = [];
};

// the insert function inserts a new string into the tree

Radix.prototype.insert = function(value){
  // if the string is already in the tree, return the node containing that string
  if (this.value === value) { return this; }

  var node, tst;
  // otherwise iterate through the child nodes
  for(var i = 0; i < this.children.length; i++) {

    // store the current child and a regex containing its value
    node = this.children[i];
    tst = new RegExp('^'+node.value+'\.*');
    // if the current child node's string is found in the input value, start over from that node
    if(tst.test(value)){
      var l = node.value.length;
      // we only pass on the difference between our input and the current node's value
      value = value.substring(l, value.length);
      return node.insert(value);
    }
  }
  // if we don't find that value itself or a node containing part of it, 
  // insert the string at the current node
  this.children.push(new Radix(value));
};

// this is a simple function that counts the number of characters stored in the entire
// tree, can be used to calculate compression rate.
Radix.prototype.countChars = function(){
  var count = this.value.length;
  if(this.children.length){
    var node;
    for(var i = 0; i < this.children.length; i++){
      node = this.children[i];
      count += node.countChars();
    }
  }
  return count;
};

// this function constructs a list of all the words stored in the tree
Radix.prototype.reconstruct = function(value){
  var result = [];
  if (value !== undefined){
    value = value + this.value;
  } else {
    value = this.value;
  }
  if (value.length){
    result.push(value);
  }
  if (this.children.length){
    var node;
    for(var i = 0; i < this.children.length; i++){
      node = this.children[i];
      result = result.concat(node.reconstruct(value));
    }
  }
  return result;
};

// This is the classic autocomplete function. Given a partial word, the tree returns
// a list of all the words that can be completed with that partial.
Radix.prototype.complete = function(target, current){
  if(current === undefined){
      current = this.value;
  } else {
      var previous = current;
      current = current + this.value;
  }
  var tst = new RegExp('^'+target+'\.*');
  if(tst.test(current)){
    return this.reconstruct(previous);
  } else {
    var node, chk;
    for(var i = 0; i < this.children.length; i++){
      node = this.children[i];
      chk = new RegExp('^'+current+'\.*');
      if(chk.test(target)){
        return node.complete(target, current);
      }
    }
  }
  return null;
};