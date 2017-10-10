/*!
 * vue-dynamic -- Load stringified or normal Vue components dynamically!
 * Version 0.0.5
 * 
 * Copyright (C) 2016-present JounQin <admin@1stg.me>
 * Released under the MIT license
 * 
 * Github: https://github.com/JounQin/vue-dynamic
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueDynamic"] = factory();
	else
		root["VueDynamic"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = __webpack_require__(1);

var objCompsToArr = function objCompsToArr(objComponents) {
  var components = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(objComponents)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      (0, _utils.isObject)(value) && components.push(Object.assign(value, { name: key }));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return components;
};

var invalidMsg = function invalidMsg(msg) {
  return (0, _utils.warn)('invalid ' + msg + ' will be ignored!');
};
var nonMsg = function nonMsg(msg) {
  return (0, _utils.warn)('no ' + msg + ' found thus it will be ignored!');
};

var generateField = function generateField(comp, component, type) {
  var field = comp[type];
  if ((0, _utils.isObject)(field)) {
    var wrappedField = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Object.entries(field)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            fieldName = _step2$value[0],
            method = _step2$value[1];

        wrappedField[fieldName] = (0, _utils.isFunction)(method) ? method : Function[(0, _utils.isArray)(method) ? 'apply' : 'call'](null, method);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    component[type] = wrappedField;
  } else if (field) return invalidMsg(type);
  return true;
};

var buildComponent = function buildComponent(comps, notFirst) {
  if (!comps) return;

  if ((0, _utils.isObject)(comps)) {
    comps = objCompsToArr(comps);
  } else if (!(0, _utils.isArray)(comps)) return invalidMsg('components');
  if (!comps.length) return nonMsg('components');

  var wrapTemp = '';
  var wrapComp = {};
  var count = 0;

  comps.forEach(function (comp, index) {
    var _comp$name = comp.name,
        name = _comp$name === undefined ? '_' + index : _comp$name,
        template = comp.template,
        data = comp.data,
        components = comp.components;


    if (!template) return nonMsg('template');

    wrapTemp += '<' + name + '/>';
    var component = wrapComp[name] = { template: template };

    if (!generateField(comp, component, 'filters') || !generateField(comp, component, 'methods')) return;

    if (data) component.data = (0, _utils.isFunction)(data) ? data : function () {
      return _extends({}, data);
    };
    if (components) component.components = buildComponent(components, true);

    count++;
  });

  if (!count) return;

  return notFirst ? wrapComp : {
    name: 'Dynamic--Root',
    template: count === 1 ? wrapTemp : '<div>' + wrapTemp + '</div>',
    components: wrapComp
  };
};

exports.default = {
  name: 'vue-dynamic',
  template: '<comment :is="view"/>',
  props: {
    comps: {
      validator: function validator(value) {
        return !value || (0, _utils.isArray)(value) || (0, _utils.isObject)(value);
      }
    },
    emptyView: {
      required: true,
      validator: function validator(value) {
        return (0, _utils.isObject)(value);
      }
    }
  },
  data: function data() {
    return {
      view: this.emptyView
    };
  },
  created: function created() {
    this.reBuild();
  },

  watch: {
    comps: function comps() {
      this.reBuild();
    }
  },
  methods: {
    reBuild: function reBuild() {
      var component = buildComponent(this.comps);
      this.view = component || this.emptyView;
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trueType = function trueType(value) {
  return [].slice.call({}.toString.call(value), 8, -1).join('');
};

var trueTypeFunc = function trueTypeFunc(type) {
  return function (value) {
    return type === trueType(value);
  };
};['Array', 'Function', 'Object'].forEach(function (type) {
  return module.exports['is' + type] = trueTypeFunc(type);
});

module.exports.warn = function (msg) {
  if (true) {
    typeof console === 'function' && console.error(msg);
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dynamic = __webpack_require__(0);

var _dynamic2 = _interopRequireDefault(_dynamic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var installed = false;

var VueDynamic = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (installed) return;
    installed = true;
    Vue.component(options.name || 'Dynamic', _dynamic2.default);
  }
};

window.Vue && window.Vue.use(VueDynamic);

exports.default = VueDynamic;
module.exports = exports['default'];

/***/ })
/******/ ]);
});