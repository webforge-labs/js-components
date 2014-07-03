define(['knockout', 'knockout-mapping'], function(ko, koMapping) {
  /**
   * @param templateEngine an instance of a Webforge/View/TemplateEngine
   */
  ko.webforgeTemplateEngine = function (templateEngine) { 
    this.templateEngine = templateEngine;
  };

  ko.webforgeTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine(), {
    makeTemplateSource: function(templateName) {
      return templateName;
    },

    // not quite sure what knockout is doing here with rewriteTemplate?
    allowTemplateRewriting: false,

    renderTemplateSource: function (templateName, bindingContext, options) {
      var renderedMarkup = this.templateEngine.render(templateName, options.vars);

      return ko.utils.parseHtmlFragment(renderedMarkup);
    }
  });

  return ko.webforgeTemplateEngine;

});
