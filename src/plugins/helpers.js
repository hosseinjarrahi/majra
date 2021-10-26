export default {
  install: function (Vue) {
    Vue.prototype.$helpers = {
      persianDateGlobal(date, mode) {
        if (!date) return null;

        let dateObj = new Date(date);
        let map = {
          date: dateObj.toLocaleDateString("fa-IR"),
          datetime:
            dateObj.toLocaleTimeString("fa-IR") +
            " , " +
            dateObj.toLocaleDateString("fa-IR"),
          time: date,
        };

        return map[mode];
      },

      persianDate(date, mode = "date") {
        if (date) {
          return this.persianDateGlobal(date, mode);
        }
        return "";
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

      sort(collection, by) {
        return collection.sort((a, b) => {
          return this.getSafe(a, by) - this.getSafe(b, by);
        });
      },
    };
    Vue.$helpers = Vue.prototype.$helpers;
  },
};
