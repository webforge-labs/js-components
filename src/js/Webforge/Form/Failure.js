define(['knockout', 'knockout-mapping', 'lodash', './FieldError'], function(ko, koMapping, _, FieldError) {
  
  return function(data) {
    var that = this;

    koMapping.fromJS(data, {ignore:[]}, that);

    this.hasValidation = ko.computed(function() {
      return !!ko.unwrap(that.validation);
    });

    this.hasContent = ko.computed(function() {
      return !!ko.unwrap(that.content);
    });

    this.contentAsHTML = ko.computed(function() {
      var html = ko.unwrap(that.content);

      if (!html) return '';

      if (ko.unwrap(that.pre)) {
        html = '<pre>'+html+'</pre>';
      } else {
        html = html.replace(/\n/g, "<br />\n");
      }

      return html;
    });

    /**
     * Returns all fields with their errors attached (if any)
     *
     * return [ FieldError, ... ]
     */
    this.getFieldErrors = ko.computed(function() {
      if (!that.hasValidation()) return [];

      var fieldErrors = {}, fieldError;
      _.each(ko.unwrap(ko.unwrap(that.validation).errors), function(error) {
        var path = error.field ? ko.unwrap(error.field.path) : 'unknown';

        if (!fieldErrors[path]) {
          fieldError = fieldErrors[path] = new FieldError({
            messages: [],
            field: error.field
          });
        } else {
          fieldError = fieldErrors[path];
        }

        fieldError.addMessage(error.message());
      });

      return _.toArray(fieldErrors);
    });
  };

});