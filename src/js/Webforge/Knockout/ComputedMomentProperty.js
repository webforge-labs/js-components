define(['knockout', 'lodash', 'CMS/knockout-extenders'], function(ko, _, undef) {

  var ComputedMomentProperty = {};/*function(jsonDateObservable) {

    return jsonDateObservable.extend({moment: "YYYY-MM-DD HH:mm:ss"}); // parsingFormat

    this.registeredMoment = ko.observable(this.registered);
    this.activatedMoment = ko.observable(this.activated).extend({moment: undefined});
    this.approvedMoment = ko.observable(this.approved).extend({moment: undefined});

    this.read = function() {

    };
  };
  */

  ComputedMomentProperty.extend = function(koObject, propertyName, dateFormat) {
    // koObject[propertyName] is: null or { timezone: ko.observable(), date: ko.observable() };

    var propertyValue = koObject[propertyName];
    var property;

    if (propertyValue === null || _.isPlainObject(propertyValue)) {
      property = ko.observable(propertyValue);
    } else if(ko.isObservable(propertyValue)) {
      property = propertyValue;
    } else {
      throw new Error('I dont know how to extend the propertyValue: '+propertyValue+'. Pass an observable or the jsonDate itself. ComputedMomentProperty for: '+koObject+'.'+propertyName);
    }
    
    // replace the property on the object with the observable with the json date
    koObject[propertyName] = property;

    property.moment = property.extend({moment: undefined});

    property.formattedDate = ko.computed(function() {
      var m = property.moment();

      if (m) {
        return m.format(dateFormat || 'DD.MM.YYYY HH:mm');
      }

      return '';
    });

    property.isEmpty = ko.computed(function() {
      return !ko.unwrap(property);
    });

  };

  return ComputedMomentProperty;
});
