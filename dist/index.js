(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vuexActionDebounce"] = factory();
	else
		root["vuexActionDebounce"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function vuexActionDebounce() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function (store) {
    var dispatchOrigin = store.dispatch;

    store.dispatch = debouncedDispatch;
    store._debouncedActions = {};

    /**
     * @method debouncedDispatch
     * @return {Promise}
     */
    function debouncedDispatch() {
      var _arguments = arguments;

      var args = Array.prototype.slice.call(arguments);
      var actionType = Array.prototype.shift.call(args);
      var argsKey = '';

      try {
        argsKey = JSON.stringify(args);
      } catch (e) {
        console.warn(e);
      }

      return promiseOne(function () {
        return dispatchOrigin.apply(store, _arguments);
      }, actionType + '_' + argsKey, store._debouncedActions, timeout);
    }

    /**
     * 相同KEY的promise同一时间只执行一次
     *
     * @method promiseOne
     * @param {function} createPromiseFn
     * @param {string} key
     * @param {object} cacheObj - 缓存对象
     * @param {number} timeout - 缓存时间
     */
    function promiseOne(createPromiseFn, key, cacheObj, timeout) {
      // console.group(key)
      if (!cacheObj[key]) {
        // console.log('no cache')
        cacheObj[key] = createPromiseFn();
        // console.log('write cache')
        cacheObj[key].then(null, function () {}).then(function () {
          setTimeout(function () {
            delete cacheObj[key];
          }, timeout);
        });
      }

      // console.log('read cache')
      // console.groupEnd(key)

      return cacheObj[key];
    }
  };
};

/***/ })
/******/ ]);
});