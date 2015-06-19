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
      expect(failure.hasValidation()).to.be.true;

      var fieldErrors;
      expect(fieldErrors = failure.getFieldErrors()).to.be.a('array');

      expect(fieldErrors).to.have.length(2);
      expect(fieldErrors).to.have.property(0);
      expect(fieldErrors).to.have.property(1);

      expect(fieldErrors[0].messagesHTML()).to.contain("gib eine korrekte E-Mail-Adresse");
      expect(fieldErrors[1].messagesHTML()).to.contain("gib deinen Namen an");

      done();
    });
  });

});