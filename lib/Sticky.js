'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sticky = function (_Component) {
  _inherits(Sticky, _Component);

  function Sticky() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Sticky);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sticky.__proto__ || Object.getPrototypeOf(Sticky)).call.apply(_ref, [this].concat(args))), _this), _this.contentRef = function (content) {
      _this.content = _reactDom2.default.findDOMNode(content);
    }, _this.placeholderRef = function (placeholder) {
      _this.placeholder = placeholder;
    }, _this.state = {
      ref: _this.contentRef,
      isSticky: false,
      wasSticky: false,
      style: {},
      placeholderProps: {
        ref: _this.placeholderRef,
        style: {}
      }
    }, _this.handleContainerEvent = function (_ref2) {
      var distanceFromTop = _ref2.distanceFromTop,
          distanceFromBottom = _ref2.distanceFromBottom,
          eventSource = _ref2.eventSource;

      var parent = _this.context.getParent();

      var preventingStickyStateChanges = false;
      if (_this.props.relative) {
        preventingStickyStateChanges = eventSource !== parent;
        distanceFromTop = -(eventSource.scrollTop + eventSource.offsetTop) + _this.placeholder.offsetTop;
      }

      var placeholderClientRect = _this.placeholder.getBoundingClientRect();
      var contentClientRect = _this.content.getBoundingClientRect();
      var calculatedHeight = contentClientRect.height;

      var bottomDifference = distanceFromBottom - _this.props.bottomOffset - calculatedHeight;

      var wasSticky = !!_this.state.isSticky;
      var isSticky = preventingStickyStateChanges ? wasSticky : distanceFromTop <= -_this.props.topOffset && distanceFromBottom > -_this.props.bottomOffset;

      distanceFromBottom = (_this.props.relative ? parent.scrollHeight - parent.scrollTop : distanceFromBottom) - calculatedHeight;

      var style = !isSticky ? {} : {
        position: 'fixed',
        top: bottomDifference > 0 ? _this.props.relative ? parent.offsetTop - parent.offsetParent.scrollTop : 0 : bottomDifference,
        left: placeholderClientRect.left,
        width: placeholderClientRect.width
      };

      var placeholderStyle = {
        paddingBottom: _this.props.disableCompensation ? 0 : (isSticky ? calculatedHeight : 0) + 'px'
      };

      if (!_this.props.disableHardwareAcceleration) {
        style.transform = 'translateZ(0)';
      }

      _this.setState({
        ref: _this.contentRef,
        isSticky: isSticky,
        wasSticky: wasSticky,
        distanceFromTop: distanceFromTop,
        distanceFromBottom: distanceFromBottom,
        calculatedHeight: calculatedHeight,
        style: style,
        placeholderProps: {
          ref: _this.placeholderRef,
          style: placeholderStyle
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Sticky, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { stickyProps: this.getProps() };
    }
  }, {
    key: 'getProps',
    value: function getProps() {
      var _state = this.state,
          style = _state.style,
          placeholderProps = _state.placeholderProps;

      return _extends({}, this.state, {
        style: _extends({}, style),
        placeholderProps: _extends({}, placeholderProps, {
          style: _extends({}, placeholderProps.style)
        })
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.context.subscribe) throw new TypeError("Expected Sticky to be mounted within StickyContainer");

      this.context.subscribe(this.handleContainerEvent);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.unsubscribe(this.handleContainerEvent);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          children = _props.children,
          render = _props.render;

      var props = this.getProps();

      return component ? // component prop gets first priority
      _react2.default.createElement(component, props) : render ? // render prop is next
      render(props) : children ? // children come last
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', props.placeholderProps),
        typeof children === 'function' ? children(props) : !Array.isArray(children) || children.length ? // Preact defaults to empty children array
        _react2.default.Children.only(children) : null
      ) : null;
    }
  }]);

  return Sticky;
}(_react.Component);

Sticky.propTypes = {
  topOffset: _propTypes2.default.number,
  bottomOffset: _propTypes2.default.number,
  relative: _propTypes2.default.bool,
  component: _propTypes2.default.func,
  render: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node])
};
Sticky.defaultProps = {
  relative: false,
  topOffset: 0,
  bottomOffset: 0,
  disableCompensation: false,
  disableHardwareAcceleration: false
};
Sticky.contextTypes = {
  subscribe: _propTypes2.default.func,
  unsubscribe: _propTypes2.default.func,
  getParent: _propTypes2.default.func
};
Sticky.childContextTypes = {
  stickyProps: _propTypes2.default.object.isRequired
};
exports.default = Sticky;