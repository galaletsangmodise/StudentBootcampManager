"use strict";

// Protected configuration 
const config = (function () {
  const settings = { bootcamp: "Melsoft AI Bootcamp", version: "1.0.0", passMark: 50 };
  return {
    get: (key) => settings[key],
    setPassMark(mark) {
      if (typeof mark === "number" && mark >= 0 && mark <= 100) settings.passMark = mark;
    },
  };
})();