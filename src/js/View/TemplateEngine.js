define(function() {

  return function (templates) {
    this.templates = templates || {};

    this.getTemplate = function(templateName) {
      if (!templates[templateName]) {
        throw new Error('The template with name '+templateName+' cannot be found.');
      }

      return templates[templateName];
    };

    this.render = function (templateName, variables) {
      if (!templates[templateName]) {
        throw new Error('The template with name '+templateName+' cannot be found.');
      }

      return templates[templateName](variables);
    };
  };

});