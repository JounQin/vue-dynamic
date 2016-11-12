/*!
 * vue-dynamic -- Load stringified or normal Vue components dynamically!
 * Version 0.0.2
 * 
 * Copyright (C) 2016 JounQin <admin@1stg.me>
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var modulesContext = __webpack_require__(5);

exports.default = modulesContext.keys().reduce(function (modules, key) {
  return Object.assign(modules, modulesContext(key));
}, {});
module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
  return (0, _utils.warn)('invalid ' + msg + ' will be ignored!');
};
var nonMsg = function nonMsg(msg) {
  return (0, _utils.warn)('no ' + msg + ' found thus it will be ignored!');
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

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

var process = module.exports = {};

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
    }

    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
    }

    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = '';
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var trueType = exports.trueType = function trueType(value) {
  return [].slice.call({}.toString.call(value), 8, -1).join('');
};

var trueTypeFunc = exports.trueTypeFunc = function trueTypeFunc(type) {
  return function (value) {
    return type === trueType(value);
  };
};

['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function', 'Map', 'Null', 'Object', 'RegExp', 'Set', 'String', 'Symbol', 'Undefined'].forEach(function (type) {
  return module.exports['is' + type] = trueTypeFunc(type);
});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {'use strict';

var EMPTY_FUNC = function EMPTY_FUNC() {};

['error', 'log', 'warn'].forEach(function (log) {
  return module.exports[log] = process.env.NODE_ENV === 'development' ? console[log] : EMPTY_FUNC;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

var map = {
	"./base.js": 3,
	"./index.js": 0,
	"./log.js": 4
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 5;


/***/ }
/******/ ])
});
;