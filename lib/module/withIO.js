function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { PureComponent, createRef } from 'react';
import IOContext from './IOContext';
import IOManager from './IOManager';
function withIO(Comp, methods) {
  const IOScrollableComponent = class extends PureComponent {
    constructor(props) {
      super(props);
      const self = this;
      this.scroller = /*#__PURE__*/createRef();
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
      const manager = new IOManager({
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
      return /*#__PURE__*/React.createElement(IOContext.Provider, {
        value: this.contextValue
      }, /*#__PURE__*/React.createElement(Comp, _extends({
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
export default withIO;
//# sourceMappingURL=withIO.js.map