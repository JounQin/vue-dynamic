/*!
  * vue-dynamic -- Load stringified or normal Vue components dynamically!
  * Version 0.0.6
  *
  * Copyright (C) 2016-present JounQin <admin@1stg.me>
  * Released under the MIT license
  *
  * Github: https://github.com/JounQin/vue-dynamic
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueDynamic = factory());
}(this, (function () { 'use strict';

  var isArray = Array.isArray || (function (arg) { return arg instanceof Array; });

  var isFunction = function (arg) { return typeof arg === 'function'; };

  var isObject = function (arg) { return Object.prototype.toString.call(arg) === '[object Object]'; };

  var warn = function (msg) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      typeof console === 'function' && console.error(msg);
    }
  };

  var objCompsToArr = function (objComponents) {
    var components = [];
    for (var i = 0, list = Object.entries(objComponents); i < list.length; i += 1) {
      var ref = list[i];
      var key = ref[0];
      var value = ref[1];

      isObject(value) && components.push(Object.assign(value, { name: key }));
    }
    return components
  };

  var invalidMsg = function (msg) { return warn(("invalid " + msg + " will be ignored!")); };
  var nonMsg = function (msg) { return warn(("no " + msg + " found thus it will be ignored!")); };

  var generateField = function (comp, component, type) {
    var field = comp[type];
    if (isObject(field)) {
      var wrappedField = {};
      for (var i = 0, list = Object.entries(field); i < list.length; i += 1) {
        var ref = list[i];
        var fieldName = ref[0];
        var method = ref[1];

        wrappedField[fieldName] = isFunction(method)
          ? method
          : Function[isArray(method) ? 'apply' : 'call'](null, method);
      }
      component[type] = wrappedField;
    } else if (field) { return invalidMsg(type) }
    return true
  };

  var buildComponent = function (comps, notFirst) {
    if (!comps) { return }

    if (isObject(comps)) {
      comps = objCompsToArr(comps);
    } else if (!isArray(comps)) { return invalidMsg('components') }
    if (!comps.length) { return nonMsg('components') }

    var wrapTemp = '';
    var wrapComp = {};
    var count = 0;

    comps.forEach(function (comp, index) {
      var name = comp.name; if ( name === void 0 ) name = "Dynamic__" + index;
      var template = comp.template;
      var data = comp.data;
      var components = comp.components;

      if (!template) { return nonMsg('template') }

      wrapTemp += "<" + name + "/>";
      var component = (wrapComp[name] = { template: template });

      if (
        !generateField(comp, component, 'filters') ||
        !generateField(comp, component, 'methods')
      )
        { return }

      if (data) { component.data = isFunction(data) ? data : function () { return (Object.assign({}, data)); }; }
      if (components) { component.components = buildComponent(components, true); }

      count++;
    });

    if (!count) { return }

    return notFirst
      ? wrapComp
      : {
          name: 'Dynamic__Root',
          template: count === 1 ? wrapTemp : ("<div>" + wrapTemp + "</div>"),
          components: wrapComp,
        }
  };

  var Dynamic = {
    name: 'vue-dynamic',
    template: "<comment :is=\"view\"/>",
    props: {
      comps: {
        validator: function (value) { return !value || isArray(value) || isObject(value); },
      },
      emptyView: {
        required: true,
        validator: function (value) { return isObject(value); },
      },
    },
    data: function data() {
      return {
        view: this.emptyView,
      }
    },
    created: function created() {
      this.reBuild();
    },
    watch: {
      comps: function comps() {
        this.reBuild();
      },
    },
    methods: {
      reBuild: function reBuild() {
        var component = buildComponent(this.comps);
        this.view = component || this.emptyView;
      },
    },
  };

  var installed = false;

  var VueDynamic = {
    install: function install(Vue, options) {
      if ( options === void 0 ) options = {};

      if (installed) { return }
      installed = true;
      Vue.component(options.name || 'Dynamic', Dynamic);
    },
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueDynamic);
  }

  return VueDynamic;

})));
