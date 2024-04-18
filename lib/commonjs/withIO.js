"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _IOContext = _interopRequireDefault(require("./IOContext"));
var _IOManager = _interopRequireDefault(require("./IOManager"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function withIO(Comp, methods) {
  const IOScrollableComponent = class extends _react.PureComponent {
    constructor(props) {
      super(props);
      const self = this;
      this.scroller = /*#__PURE__*/(0, _react.createRef)();
      this.root = {
        get node() {
          return self.node;
        },
        get horizontal() {
          return !!self.props.horizontal;
        },
        current: {
          contentInset: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          contentOffset: {
            x: 0,
            y: 0
          },
          contentSize: {
            width: 0,
            height: 0
          },
          layoutMeasurement: {
            width: 0,
            height: 0
          },
          zoomScale: 1
        }
      };
      const manager = new _IOManager.default({
        root: this.root,
        get rootMargin() {
          return self.props.rootMargin;
        }
      });
      this.manager = manager;
      this.contextValue = {
        manager
      };
    }
    componentDidMount() {
      this.node = this.scroller.current;
      methods.forEach(method => {
        this[method] = (...args) => {
          var _this$scroller$curren, _this$scroller$curren2;
          (_this$scroller$curren = this.scroller.current) === null || _this$scroller$curren === void 0 || (_this$scroller$curren2 = _this$scroller$curren[method]) === null || _this$scroller$curren2 === void 0 || _this$scroller$curren2.call(_this$scroller$curren, ...args);
        };
      });
    }
    handleContentSizeChange = (width, height) => {
      const {
        contentSize
      } = this.root.current;
      if (width !== contentSize.width || height !== contentSize.height) {
        this.root.current.contentSize = {
          width,
          height
        };
        if (width > 0 && height > 0 && this.root.onLayout) {
          this.root.onLayout();
        }
      }
      const {
        onContentSizeChange
      } = this.props;
      if (onContentSizeChange) {
        onContentSizeChange(width, height);
      }
    };
    handleLayout = event => {
      const {
        nativeEvent: {
          layout
        }
      } = event;
      const {
        layoutMeasurement
      } = this.root.current;
      if (layoutMeasurement.width !== layout.width || layoutMeasurement.height !== layout.height) {
        this.root.current.layoutMeasurement = layout;
      }
      const {
        onLayout
      } = this.props;
      if (onLayout) {
        onLayout(event);
      }
    };
    handleScroll = event => {
      this.root.current = event.nativeEvent;
      if (this.root.onScroll) {
        this.root.onScroll(this.root.current);
      }
      const {
        onScroll
      } = this.props;
      if (onScroll) {
        onScroll(event);
      }
    };
    render() {
      return /*#__PURE__*/_react.default.createElement(_IOContext.default.Provider, {
        value: this.contextValue
      }, /*#__PURE__*/_react.default.createElement(Comp, _extends({
        scrollEventThrottle: 16
      }, this.props, {
        ref: this.scroller,
        onContentSizeChange: this.handleContentSizeChange,
        onLayout: this.handleLayout,
        onScroll: this.handleScroll
      })));
    }
  };
  return IOScrollableComponent;
}
var _default = exports.default = withIO;
//# sourceMappingURL=withIO.js.map