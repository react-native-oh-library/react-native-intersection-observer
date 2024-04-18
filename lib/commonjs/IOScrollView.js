"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _withIO = _interopRequireDefault(require("./withIO"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const IOScrollView = (0, _withIO.default)(_reactNative.ScrollView, ['scrollTo', 'scrollToEnd', 'getScrollResponder', 'getScrollableNode', 'getInnerViewNode']);
var _default = exports.default = IOScrollView;
//# sourceMappingURL=IOScrollView.js.map