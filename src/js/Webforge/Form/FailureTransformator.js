define(['lodash', './Failure', 'JSON'], function(_, DisplayFailure, globalJSON) {

  return function() {
    var that = this;

    this.fromWebforgeBackend = function(failure) {
      if (failure.validation) {
        return new DisplayFailure({
          message: "Die Daten konnten nicht gespeichert werden, da ein Validierungsfehler aufgetreten ist.",
          suggestion: "Überprüfe bitte deine Daten nach Fehlern und versuche es erneut.",
          validation: failure.validation
        });
      }

      return that.fromGeneric(failure);
    };

    this.fromKOSyncBackend = function(failure) {
      if (failure.response) {
        if (failure.response.code === 400) {
          return that.fromKOSyncValidation(failure);
        } else {
          return that.fromKOSyncError(failure);
        }
      }

      return that.fromGeneric(failure);
    };

    that.fromKOSyncValidation = function(failure) {
      var result = failure.response.body;

      // simple response body without validation construct
      if (!result.validation && result.message) {
        return new DisplayFailure({
          message: result.message,
          suggestion: "Überprüfe bitte deine Daten nach Fehlern und versuche es erneut.",
          validation: undefined
        });
      } else {
        return new DisplayFailure({
          message: "Die Daten konnten nicht gespeichert werden, da ein Validierungsfehler aufgetreten ist.",
          suggestion: "Überprüfe bitte deine Daten nach Fehlern und versuche es erneut.",
          validation: failure.response.body.validation
        });
      }
    };

    that.fromKOSyncError = function(failure) {
      var props = that.convertGenericFailure(failure);

      props.message =  "Die Daten konnten nicht gespeichert werden, da ein Fehler aufgetreten ist.";
      props.suggestion = "Dies ist womöglich ein Programmierfehler. Bitte die Fehlermeldung kopieren.";

      return new DisplayFailure(props);
    };

    this.convertGenericFailure = function(failure) {
      if (failure.response && failure.response.body) {
        if (_.isObject(failure.response.body) && failure.response.body.message) {
          return {
            pre: false,
            content: 'Fehlermeldung (Code: '+failure.response.code+"):\n"+failure.response.body.message+"\n"
          };
        }
      }

      return {
        pre: true,
        content: JSON.stringify(failure, undefined, 2)
      };
    };

    this.fromGeneric = function(something) {
      throw new Error('this is not yet implemented: FailureTransformator::fromGeneric()');
    };
  };

});