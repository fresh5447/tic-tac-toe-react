/* */ 
"use strict";
var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')["default"];
var _tokenizerTypes = require('../tokenizer/types');
var _index = require('./index');
var _index2 = _interopRequireDefault(_index);
var _utilWhitespace = require('../util/whitespace');
var pp = _index2["default"].prototype;
pp.addExtra = function(node, key, val) {
  if (!node)
    return;
  var extra = node.extra = node.extra || {};
  extra[key] = val;
};
pp.isRelational = function(op) {
  return this.match(_tokenizerTypes.types.relational) && this.state.value === op;
};
pp.expectRelational = function(op) {
  if (this.isRelational(op)) {
    this.next();
  } else {
    this.unexpected();
  }
};
pp.isContextual = function(name) {
  return this.match(_tokenizerTypes.types.name) && this.state.value === name;
};
pp.eatContextual = function(name) {
  return this.state.value === name && this.eat(_tokenizerTypes.types.name);
};
pp.expectContextual = function(name) {
  if (!this.eatContextual(name))
    this.unexpected();
};
pp.canInsertSemicolon = function() {
  return this.match(_tokenizerTypes.types.eof) || this.match(_tokenizerTypes.types.braceR) || _utilWhitespace.lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
};
pp.isLineTerminator = function() {
  return this.eat(_tokenizerTypes.types.semi) || this.canInsertSemicolon();
};
pp.semicolon = function() {
  if (!this.isLineTerminator())
    this.unexpected();
};
pp.expect = function(type) {
  return this.eat(type) || this.unexpected();
};
pp.unexpected = function(pos) {
  this.raise(pos != null ? pos : this.state.start, "Unexpected token");
};
