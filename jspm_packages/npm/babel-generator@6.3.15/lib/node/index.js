/* */ 
"use strict";
var _classCallCheck = require('babel-runtime/helpers/class-call-check')["default"];
var _Object$keys = require('babel-runtime/core-js/object/keys')["default"];
var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')["default"];
var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')["default"];
exports.__esModule = true;
var _whitespace = require('./whitespace');
var _whitespace2 = _interopRequireDefault(_whitespace);
var _parentheses = require('./parentheses');
var parens = _interopRequireWildcard(_parentheses);
var _lodashCollectionEach = require('lodash/collection/each');
var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);
var _lodashCollectionSome = require('lodash/collection/some');
var _lodashCollectionSome2 = _interopRequireDefault(_lodashCollectionSome);
var _babelTypes = require('babel-types');
var t = _interopRequireWildcard(_babelTypes);
function find(obj, node, parent) {
  if (!obj)
    return;
  var result = undefined;
  var types = _Object$keys(obj);
  for (var i = 0; i < types.length; i++) {
    var type = types[i];
    if (t.is(type, node)) {
      var fn = obj[type];
      result = fn(node, parent);
      if (result != null)
        break;
    }
  }
  return result;
}
var Node = (function() {
  function Node(node, parent) {
    _classCallCheck(this, Node);
    this.parent = parent;
    this.node = node;
  }
  Node.isUserWhitespacable = function isUserWhitespacable(node) {
    return t.isUserWhitespacable(node);
  };
  Node.needsWhitespace = function needsWhitespace(node, parent, type) {
    if (!node)
      return 0;
    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }
    var linesInfo = find(_whitespace2["default"].nodes, node, parent);
    if (!linesInfo) {
      var items = find(_whitespace2["default"].list, node, parent);
      if (items) {
        for (var i = 0; i < items.length; i++) {
          linesInfo = Node.needsWhitespace(items[i], node, type);
          if (linesInfo)
            break;
        }
      }
    }
    return linesInfo && linesInfo[type] || 0;
  };
  Node.needsWhitespaceBefore = function needsWhitespaceBefore(node, parent) {
    return Node.needsWhitespace(node, parent, "before");
  };
  Node.needsWhitespaceAfter = function needsWhitespaceAfter(node, parent) {
    return Node.needsWhitespace(node, parent, "after");
  };
  Node.needsParens = function needsParens(node, parent) {
    if (!parent)
      return false;
    if (t.isNewExpression(parent) && parent.callee === node) {
      if (t.isCallExpression(node))
        return true;
      var hasCall = _lodashCollectionSome2["default"](node, function(val) {
        return t.isCallExpression(val);
      });
      if (hasCall)
        return true;
    }
    return find(parens, node, parent);
  };
  return Node;
})();
exports["default"] = Node;
_lodashCollectionEach2["default"](Node, function(fn, key) {
  Node.prototype[key] = function() {
    var args = new Array(arguments.length + 2);
    args[0] = this.node;
    args[1] = this.parent;
    for (var i = 0; i < args.length; i++) {
      args[i + 2] = arguments[i];
    }
    return Node[key].apply(null, args);
  };
});
module.exports = exports["default"];
