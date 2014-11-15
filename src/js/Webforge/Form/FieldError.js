define(['knockout', 'knockout-mapping'], function(ko, koMapping) {

  // .field { .name, .path }, String[] .messages
  return function(data) {
    var that = this;

    koMapping.fromJS(data, {ignore:[]}, that);

    this.messagesHTML = ko.computed(function() {
      return that.messages().join("<br />");
    });

    this.addMessage = function(message) {
      that.messages.push(message);
    };
  };

});

