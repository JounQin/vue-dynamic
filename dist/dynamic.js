/*!
 * vue-dynamic -- Load stringified or normal Vue components dynamically!
 * Version 0.0.3
 * 
 * Copyright (C) 2016 JounQin <admin@1stg.me>
 * Released under the MIT license
 * 
 * Github: https://github.com/JounQin/vue-dynamic
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define(["Vue"], factory);
	else if(typeof exports === 'object')
		exports["VueDynamic"] = factory(require("Vue"));
	else
		root["VueDynamic"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

var trueType = function trueType(value) {
  return [].slice.call({}.toString.call(value), 8, -1).join('');
};

var trueTypeFunc = function trueTypeFunc(type) {
  return function (value) {
    return type === trueType(value);
  };
};

['Array', 'Function', 'Object'].forEach(function (type) {
  return module.exports['is' + type] = trueTypeFunc(type);
});

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _vue = __webpack_require__(1);

var _utils = __webpack_require__(0);

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
  return _vue.util.warn('invalid ' + msg + ' will be ignored!');
};
var nonMsg = function nonMsg(msg) {
  return _vue.util.warn('no ' + msg + ' found thus it will be ignored!');
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

  comps.forEach(function (_ref, index) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? '_' + index : _ref$name,
        template = _ref.template,
        data = _ref.data,
        methods = _ref.methods,
        components = _ref.components;

    if (!template) return nonMsg('template');

    wrapTemp += '<' + name + '/>';
    var component = wrapComp[name] = { template: template };

    if ((0, _utils.isObject)(methods)) {
      var wrapMethods = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(methods)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              methodName = _step2$value[0],
              method = _step2$value[1];

          wrapMethods[methodName] = (0, _utils.isFunction)(method) ? method : Function[(0, _utils.isArray)(method) ? 'apply' : 'call'](null, method);
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

      component.methods = wrapMethods;
    } else if (methods) return invalidMsg('methods');
    if (data) component.data = (0, _utils.isFunction)(data) ? data : function () {
      return data;
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

/***/ }
/******/ ])
});
;