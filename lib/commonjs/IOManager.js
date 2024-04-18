"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _IntersectionObserver = _interopRequireDefault(require("./IntersectionObserver"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class IOManager {
  instanceMap = new Map();
  constructor(options) {
    this.io = new _IntersectionObserver.default(this.handleChange, options);
    this.observerId = 0;
  }
  handleChange = entries => {
    for (let index = 0; index < entries.length; index += 1) {
      const {
        target,
        isIntersecting
      } = entries[index];
      const instance = this.instanceMap.get(target);
      if (instance) {
        instance.callback(isIntersecting);
      }
    }
  };
  observe(element, callback) {
    const existInstance = this.instanceMap.get(element);
    if (existInstance) {
      return existInstance;
    }
    this.observerId += 1;
    const instance = {
      callback,
      element,
      observerId: this.observerId,
      observer: this.io
    };
    this.instanceMap.set(element, instance);
    this.io.observe(element);
    return instance;
  }
  unobserve(element) {
    if (this.instanceMap.has(element)) {
      this.instanceMap.delete(element);
      this.io.unobserve(element);
    }
  }
}
var _default = exports.default = IOManager;
//# sourceMappingURL=IOManager.js.map