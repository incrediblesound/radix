// this is the main constructor function, each node takes a string 
// as a value and has an array of children

var Radix = function(value){
  this.children = [];
  this.locations = [];
  if(value === undefined){
    this.value = '';
  } else {
    this.value = value.string;
    this.locations.push(value.index);
  }
};

// the insert function inserts a new string into the tree

Radix.prototype.insert = function(obj){
  // if the string is already in the tree, return the node containing that string
  if (this.value === obj.string) { 
    this.locations.push(obj.index); 
  }
  var node, tst;
  // otherwise iterate through the child nodes
  for(var i = 0; i < this.children.length; i++) {
    // store the current child and a regex containing its value
    node = this.children[i];
    var testString = node.value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    tst = new RegExp('^'+testString+'.*');
    // if the current child node's string is found in the input value, start over from that node
    if( tst.test(obj.string) ){
      var l = node.value.length;
      // we only pass on the difference between our input and the current node's value
      obj.string = obj.string.substring(l, obj.string.length);
      return node.insert(obj);
    }
  }
  // if we don't find that value itself or a node containing part of it, 
  // insert the string at the current node
  this.children.push(new Radix(obj));
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

// check to see if a given string is in the
Radix.prototype.contains = function(target, current){
  if (current === undefined) {
    current = this.value;
  } 
  var node, chk, newVal;
  for(var i = 0; i < this.children.length; i++) {
    node = this.children[i];
    newVal = current + node.value;
    if( newVal === target) { return true; }

    chk = new RegExp('^'+newVal+'\.*');
    if(chk.test(target)) {
      return node.contains(target, newVal);
    }
  }
  return false;
};

// this function constructs a list of all the words stored in the tree
Radix.prototype.reconstruct = function(value){
  var result = [];

  var search = function(context, value){
    if (value !== undefined){
    value = value + context.value;
    } else {
      value = context.value;
    }
    if (value.length){
      for(var k = 0; k < context.locations.length; k++){
        result[context.locations[k]] = value;
      }
    }
    if (context.children.length){
      var node;
      for(var i = 0; i < context.children.length; i++){
        node = context.children[i];
        search(node, value);
      }
    }
  }
  search(this, value);
  return result.join(' ');
};

// This is the classic autocomplete function. Given a partial word, the tree returns
// a list of all the words that can be completed with that partial.
Radix.prototype.complete = function(target, previous){
  var result = [], current;
  if(current === undefined){
    current = this.value;
  }
  if(previous){
    current = previous + this.value;   
  }
  for(var i = 0; i < this.children.length; i++){
      var node = this.children[i];
      var chk = new RegExp('^'+current+node.value+'\.*');
      var tst = new RegExp('^'+target+'\.*');
      if(chk.test(target)){
        return node.complete(target, current);
      }
      else if(tst.test(current+node.value)){
        result = result.concat(node.reconstruct(current));
      }
  }
  return result;
};

Radix.prototype.documentInsert = function(string){

  var splitString = string.split(' ');
  var array = [];
  for(var k = 0; k < splitString.length; k ++) {
    if(splitString[k].length > 0){
      array.push({ string: splitString[k], index: k });
    }
  }
  var sort = function(left, right) {
    var result = [];
    while(left.length && right.length){
      if(left[0].string.length <= right[0].string.length){
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    while(left.length){
      result.push(left.shift());
    }
    while(right.length){
      result.push(right.shift());
    }
    return result;
  };

  var merge = function(array){
    if(array.length < 2) {
      return array;
    }
    var mid = Math.floor(array.length/2);
    var left = array.slice(0, mid);
    var right = array.slice(mid, array.length);
    return sort(merge(left), merge(right));
  };

  var sorted = merge(array);
  for(var i = 0; i < sorted.length; i++){
    this.insert(sorted[i]);
  }
};

exports.Radix = Radix;