/* globals requirejs */
var require = {

};

if (typeof(requirejs) === "function") {
  requirejs.config(require);
} else if (typeof exports === 'object') {
  module.exports = require;
}