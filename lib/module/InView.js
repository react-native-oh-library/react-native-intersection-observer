function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import IOContext from './IOContext';
class InView extends PureComponent {
  static contextType = IOContext;
  static defaultProps = {
    triggerOnce: false,
    as: View
  };
  context = undefined;
  mounted = false;
  constructor(props) {
    super(props);
    this.element = {
      inView: false,
      layout: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      measureLayout: this.measureLayout
    };
  }
  componentDidMount() {
    var _this$context;
    this.mounted = true;
    if ((_this$context = this.context) !== null && _this$context !== void 0 && _this$context.manager) {
      this.instance = this.context.manager.observe(this.element, this.handleChange);
    }
  }
  componentWillUnmount() {
    var _this$context2;
    this.mounted = false;
    if ((_this$context2 = this.context) !== null && _this$context2 !== void 0 && _this$context2.manager && this.instance) {
      this.context.manager.unobserve(this.element);
    }
  }
  handleChange = inView => {
    if (this.mounted) {
      const {
        triggerOnce,
        onChange
      } = this.props;
      if (inView && triggerOnce) {
        var _this$context3;
        if ((_this$context3 = this.context) !== null && _this$context3 !== void 0 && _this$context3.manager) {
          var _this$context4;
          (_this$context4 = this.context) === null || _this$context4 === void 0 || _this$context4.manager.unobserve(this.element);
        }
      }
      if (onChange) {
        onChange(inView);
      }
    }
  };
  handleRef = ref => {
    this.view = ref;
  };
  handleLayout = event => {
    const {
      nativeEvent: {
        layout
      }
    } = event;
    if (layout.width !== this.element.layout.width || layout.height !== this.element.layout.height) {
      if (this.element.onLayout) {
        this.element.onLayout();
      }
    }
    const {
      onLayout
    } = this.props;
    if (onLayout) {
      onLayout(event);
    }
  };
  measureInWindow = (...args) => {
    this.view.measureInWindow(...args);
  };
  measureLayout = (...args) => {
    this.view.measureLayout(...args);
  };
  setNativeProps = (...args) => {
    this.view.setNativeProps(...args);
  };
  focus = (...args) => {
    this.view.focus(...args);
  };
  blur = (...args) => {
    this.view.blur(...args);
  };
  render() {
    const {
      as,
      children,
      ...props
    } = this.props;
    if (typeof children === 'function') {
      return null; // TODO: need?
    }
    const ViewComponent = as || View;
    return /*#__PURE__*/React.createElement(ViewComponent, _extends({}, props, {
      ref: this.handleRef,
      onLayout: this.handleLayout
    }), children);
  }
}
export default InView;
//# sourceMappingURL=InView.js.map