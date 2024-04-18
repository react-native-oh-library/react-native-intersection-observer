"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _withIO = _interopRequireDefault(require("./withIO"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const IOFlatList = (0, _withIO.default)(_reactNative.FlatList, ['flashScrollIndicators', 'getNativeScrollRef', 'getScrollResponder', 'getScrollableNode', 'scrollToEnd', 'scrollToIndex', 'scrollToItem', 'scrollToOffset']);
var _default = exports.default = IOFlatList;
//# sourceMappingURL=IOFlatList.js.map