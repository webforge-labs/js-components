define(['lodash', 'knockout'], function(_, ko) {

  return function(contentStream) {
    var that = this;

    this.contentStream = contentStream;

    this.entries = ko.computed(function() {
      return ko.unwrap(contentStream.entries) || [];
    });

    this.findFirst = function(fqn) {
      fqn = fqn.replace(/\./g, '\\');

      return _.find(that.entries(), function (entry) {
        return ko.unwrap(entry.__class) === fqn;
      });
    };
  };
});