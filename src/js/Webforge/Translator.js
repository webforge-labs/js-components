define(['jquery', 'i18next', 'lodash'], function ($, i18n, _) {

  /* 
    i18nMessages: locale -> key -> nested key

/*    
  var resources = {
    en: { namespace: enMessages },
    de: { namespace: deMessages },
    fr: { namespace: frMessages }
  };

  where the default namespace should be "messages"
*/
  var Translator = function Translator(locale, resources) {
    var that = this;

    var options = {
      useCookie: false,
      resStore: resources,
      fallbackLng: 'en',
      fallbackNS: 'messages',
      keyseparator: '.',
      nsseparator: ':',
      interpolationPrefix: '%',
      interpolationSuffix: '%'
    };
 
    i18n.init(options);
    //$.i18n.init(options);

    this.setLocale = function (locale, onReady) {
      i18n.setLng(locale, onReady || function (t) {});
      //$.i18n.setLng(locale, onReady || function (t) {});
    };

    this.getLocale = function () {
      return i18n.lng();
    };

    this.trans = function (key, params, domain) {
      if (domain) {
        key = domain+':'+key;
      }
      
      if (params) {
        return i18n.t(key, params);
      } else {
        return i18n.t(key);
      }
    };

    this.setLocale(locale);
  };

  return Translator;

});