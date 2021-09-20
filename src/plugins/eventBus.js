import Vue from "vue";
let EventBus = new Vue();

export let _event = (event, args) => {
  EventBus.$emit(event, args);
};

export let _listen = (event, fn) => {
  event = Array.isArray(event) ? event : [event];
  for (const e of event) EventBus.$on(e, fn);
};

export let _log = (log, message = ":/") => {
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

let fns = [];
export let _runAfterPageChanged = (fn) => {
  fns.push(fn);
};

let fns2 = [];
export let _runAfterPageLoaded = (fn) => {
  fns2.push(fn);
};

let fns3 = [];
export let _runBeforeTemplateInit = (fn) => {
  fns3.push(fn);
};

export let _resetEvLi = (callback) => {
  EventBus = new Vue();
  callback();
  _listen("beforeTemplateInit", (args) => {
    fns3.forEach((fn) => fn(args));
    fns3 = [];
  });
  _listen("templateMounted", (args) => {
    fns.forEach((fn) => fn(args));
    fns = [];
  });
  _listen("templateLoaded", (args) => {
    fns2.forEach((fn) => fn(args));
    fns2 = [];
  });
};

window._event = _event;
window._listen = _listen;
window._log = _log;
window.EventBus = EventBus;
window._resetEvLi = _resetEvLi;
