describe('FailureTransformator', function () {

  var requirejs = require('requirejs');
  var expect = require('chai').expect;

  var config = require('../../build/config-test.js');
  config.nodeRequire = require;
  requirejs.config(config);

  var validationFailure = {
    "validation": {
      "errors": [
      {
        "message": "Bitte gib eine korrekte E-Mail-Adresse an",
        "field": {
          "path": "email",
          "name": "data"
        },
        "params": {
          "{{ value }}": "null"
        }
      },
      {
        "message": "Bitte gib deinen Namen an, damit wir dich persönlich ansprechen können. Der Vorname ist ausreichend.",
        "field": {
          "path": "name",
          "name": "data"
        },
        "params": {
          "{{ value }}": "null"
        }
      }
      ]
    }
  };

  it('transform a backend validation response to an validation error', function (done) {
    requirejs(['Webforge/Form/FailureTransformator'], function(FailureTransformator) {
      var transformator = new FailureTransformator();

      var failure = transformator.fromWebforgeBackend(validationFailure);

      expect(failure).to.be.ok;

    });
  });

});