import Vue from "vue";

let helpers = {
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
    };
  },
};

Vue.use(helpers);
