define(['Webforge/View/TemplateEngine', 'Webforge/View/KnockoutTemplateEngine', 'templates-compiled', 'knockout'], function(TemplateEngine, KnockoutTemplateEngine, templates, ko) {

  var templateEngine = new TemplateEngine(templates);

  // register with knockout to use it in template: binding
  ko.setTemplateEngine(new ko.webforgeTemplateEngine(templateEngine));

  return templateEngine;

});