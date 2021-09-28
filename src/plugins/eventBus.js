import Vue from "vue";

export let EventBusPlugin = {
  install: function (Vue) {
    let EventBus = new Vue();
    let lockedListeners = [];

    Vue.prototype._bus = EventBus;
    Vue._bus = Vue.prototype._bus;

    Vue.prototype._listen = (event, fn, lock = false) => {
      event = Array.isArray(event) ? event : [event];
      for (const e of event) {
        EventBus.$on(e, fn);
        lock && lockedListeners.push(fn);
      }
    };
    Vue._listen = Vue.prototype._listen;

    Vue.prototype._event = (event, args) => {
      EventBus.$emit(event, args);
    };
    Vue._event = Vue.prototype._event;

    let fns = [];
    Vue.prototype._runAfterPageChanged = (fn) => {
      fns.push(fn);
    };
    Vue._runAfterPageChanged = Vue.prototype._runAfterPageChanged;

    let fns2 = [];
    Vue.prototype._runAfterPageLoaded = (fn) => {
      fns2.push(fn);
    };
    Vue._runAfterPageLoaded = Vue.prototype._runAfterPageLoaded;

    let fns3 = [];
    Vue.prototype._runBeforeTemplateInit = (fn) => {
      fns3.push(fn);
    };
    Vue._runBeforeTemplateInit = Vue.prototype._runBeforeTemplateInit;

    Vue.prototype._resetEvLi = (callback) => {
      EventBus = new Vue();
      callback && callback();
      Vue.prototype._listen("beforeTemplateInit", (args) => {
        fns3.forEach((fn) => fn(args));
        fns3 = [];
      });
      Vue.prototype._listen("templateMounted", (args) => {
        fns.forEach((fn) => fn(args));
        fns = [];
      });
      Vue.prototype._listen("templateLoaded", (args) => {
        fns2.forEach((fn) => fn(args));
        fns2 = [];
      });
      for (let fn of lockedListeners) Vue.prototype._listen(fn);
    };
    Vue._resetEvLi = Vue.prototype._resetEvLi;

    Vue.prototype._log = (log, message = ":/") => {
      if (typeof log == "string") {
        console.log("******* " + message + " *******");
        console.log(log);
        console.log("------- end of " + message + " -------");
        console.log("");
      } else {
        console.log(`* * * * * * * * ${message} * * * * * * * *`);
        console.log(log);
        console.log(`* * * * * * * * end of ${message} * * * * * * * *`);
        console.log("");
      }
    };
    Vue._log = Vue.prototype._log;
  },
};

Vue.use(EventBusPlugin);
