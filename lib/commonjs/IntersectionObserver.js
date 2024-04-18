"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRootMargin = exports.default = void 0;
var _throttle = _interopRequireDefault(require("lodash/throttle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defaultRootMargin = exports.defaultRootMargin = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.targets = [];
    this.options.root.onLayout = this.handleLayout;
    this.options.root.onScroll = this.handleScroll;
  }
  measureTarget = target => {
    var _this$options$root$no;
    let rootNode = this.options.root.node;
    if ((_this$options$root$no = this.options.root.node) !== null && _this$options$root$no !== void 0 && _this$options$root$no._listRef) {
      var _this$options$root$no2;
      rootNode = (_this$options$root$no2 = this.options.root.node._listRef) === null || _this$options$root$no2 === void 0 ? void 0 : _this$options$root$no2._scrollRef;
    }
    if (rootNode) {
      target.measureLayout(rootNode, (x, y, width, height) => {
        target.layout = {
          x,
          y,
          width,
          height
        };
        this.handleScroll();
      });
    }
  };
  handleLayout = (0, _throttle.default)(() => {
    for (let index = 0; index < this.targets.length; index += 1) {
      this.measureTarget(this.targets[index]);
    }
  }, 300, {
    leading: false,
    trailing: true
  }); // TODO: 优化节流

  handleScroll = (0, _throttle.default)(() => {
    var _this$options;
    const rootMargin = ((_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.rootMargin) || defaultRootMargin;
    const {
      horizontal,
      current: {
        contentOffset,
        // 偏移量
        contentSize,
        layoutMeasurement // 布局大小
      }
    } = this.options.root;
    if (contentSize.width <= 0 || contentSize.height <= 0 || layoutMeasurement.width <= 0 || layoutMeasurement.height <= 0) {
      return;
    }
    const contentOffsetWithLayout = horizontal ? contentOffset.x + layoutMeasurement.width : contentOffset.y + layoutMeasurement.height;
    const changedTargets = [];
    for (let index = 0; index < this.targets.length; index += 1) {
      const target = this.targets[index];
      const targetLayout = target.layout;
      if (!targetLayout || targetLayout.width === 0 || targetLayout.height === 0) {
        continue;
      }
      let isIntersecting = false;
      if (horizontal) {
        isIntersecting = contentOffsetWithLayout + (rootMargin.right || 0) >= targetLayout.x && contentOffset.x - (rootMargin.left || 0) <= targetLayout.x + targetLayout.width;
      } else {
        isIntersecting = contentOffsetWithLayout + (rootMargin.bottom || 0) >= targetLayout.y && contentOffset.y - (rootMargin.top || 0) <= targetLayout.y + targetLayout.height;
      }
      if (target.inView !== isIntersecting) {
        target.inView = isIntersecting;
        changedTargets.push({
          target,
          isIntersecting
        });
      }
    }
    this.callback(changedTargets);
  }, 100, {
    leading: false,
    trailing: true
  }); // TODO: 优化节流

  observe(target) {
    const index = this.targets.indexOf(target);
    if (index < 0) {
      target.onLayout = this.handleLayout;
      this.targets.push(target);
    }
  }
  unobserve(target) {
    const index = this.targets.indexOf(target);
    if (index >= 0) {
      target.onLayout = undefined;
      this.targets.splice(index, 1);
    }
  }
}
var _default = exports.default = IntersectionObserver;
//# sourceMappingURL=IntersectionObserver.js.map