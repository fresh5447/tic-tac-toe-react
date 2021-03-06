/* */ 
'use strict';
exports.__esModule = true;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }});
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var _react = require('react');
var _utilsStoreShape = require('../utils/storeShape');
var _utilsStoreShape2 = _interopRequireDefault(_utilsStoreShape);
var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;
  console.error('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/rackt/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}
var Provider = (function(_Component) {
  _inherits(Provider, _Component);
  Provider.prototype.getChildContext = function getChildContext() {
    return {store: this.store};
  };
  function Provider(props, context) {
    _classCallCheck(this, Provider);
    _Component.call(this, props, context);
    this.store = props.store;
  }
  Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var store = this.store;
    var nextStore = nextProps.store;
    if (store !== nextStore) {
      warnAboutReceivingStore();
    }
  };
  Provider.prototype.render = function render() {
    var children = this.props.children;
    return _react.Children.only(children);
  };
  return Provider;
})(_react.Component);
exports['default'] = Provider;
Provider.propTypes = {
  store: _utilsStoreShape2['default'].isRequired,
  children: _react.PropTypes.element.isRequired
};
Provider.childContextTypes = {store: _utilsStoreShape2['default'].isRequired};
module.exports = exports['default'];
