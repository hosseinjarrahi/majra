export default {
  install: function (Vue) {
    Vue.prototype.$helpers = {
      persianDateGlobal(date, time = false) {
        if (date) {
          date = new Date(date);
          return (
            date.toLocaleTimeString("fa-IR") +
            (time ? " - " + date.toLocaleDateString("fa-IR") : "")
          );
        }
        return null;
      },

      persianDate(date) {
        if (date) {
          return this.persianDateGlobal(date, true);
        }
        return null;
      },

      isImage(link) {
        let links = Array.isArray(link) ? link : [link];
        links = links.filter((link) => !!link);

        if (
          !link ||
          (links.length == 1 && typeof link !== "string") ||
          !isNaN(link)
        )
          return false;

        let res = false;
        links.forEach((l) => {
          let types = [".jpg", ".png", ".gif", "jpeg"];
          let match = l.match(/\.[0-9a-z]+$/);
          let fileType = match ? match[0] : "noType";
          if (types.indexOf(fileType) > -1) res = true;
        });

        return res;
      },

      isArrayOfObjects(values) {
        return (
          Array.isArray(values) &&
          values.length > 0 &&
          typeof values[0] === "object"
        );
      },

      hasProperty(obj = {}, property = "") {
        let props = property.split(".");
        let temp = { ...obj };
        for (const prop of props) {
          if (typeof temp != "object" || !(prop in temp)) return false;
          temp = temp[prop];
        }
        return true;
      },

      getSafe(obj = {}, property = "", defaultValue = null) {
        if (typeof obj != "object") return defaultValue;
        let props = property.split(".");
        let temp = { ...obj };
        for (const prop of props) {
          if (typeof temp != "object" || !(prop in temp)) return defaultValue;
          temp = temp[prop];
        }
        return temp;
      },
    };
    Vue.$helpers = Vue.prototype.$helpers;
  },
};
