define(['KnockoutSync/EntityManager', 'KnockoutSync/Backend', 'KnockoutSync/EntityModel', 'KnockoutSync/jQueryAjaxDriver', 'Amplify'], function (EntityManager, Backend, EntityModel, Driver, amplify) {  

  return function Sync(jsonModel, entities, options) {
    var sync = this;

    this.entities =  entities;
    this.entityModel = new EntityModel(jsonModel);
    this.em = this.entityManager = new EntityManager(this.entityModel);
    this.backend = new Backend(new Driver(), this.entityModel, { prefixUrl: options.prefixUrl, putSingular: false, removeSingular: false });

    this.cache = {};

    sync.isCached = function(entityFQN) {
      return sync.cache[entityFQN] > 0;
    };

    sync.cget = function(entityFQN, params) {
      if (!sync.isCached(entityFQN)) {
        sync.backend.cget(entityFQN, params, function(error, result) {
          if (error) {
            amplify.publish('sync.error', error, ['sync.cget('+entityFQN+')']);
          } else {
            sync.entityManager.mapResponse(result);
            sync.cache[entityFQN] = new Date();
          }
        });
      }
    };

    sync.get = function(entityFQN, identifiers) {
      sync.backend.get(entityFQN, identifiers, function(error, result) {
        if (!error) {
          sync.entityManager.mapResponse(result);
        } else {
          amplify.publish('sync.error', error, ['sync.get('+entityFQN+')']);
        }
      });
    };

    sync.refresh = function(entityFQN, identifiers) {
      sync.backend.get(entityFQN, identifiers, function(error, result) {
        if (!error) {
          sync.entityManager.mergeResponse(result); // use merge instead of map to not remove all other already mapped entities
        } else {
          amplify.publish('sync.error', error, ['sync.refresh('+entityFQN+')']);
        }
      });
    };

    sync.save = function(entity, callback) {
      sync.backend.save(entity, function(failure) {
        if (failure) {
          amplify.publish('sync.error', failure, ['sync.save()'], {entity: entity});
        }

        callback(failure);
      });
    };

    sync.patch = function(entity, patchName, data, callback) {
      sync.backend.patch(entity, patchName, data, function(failure) {
        if (failure) {
          amplify.publish('sync.error', failure, ['sync.patch('+entity.fqn+':'+entity.id()+', '+patchName+')']);
        } else {
          sync.refresh(entity.fqn, entity.id()); // refresh?
        }

        if (callback) {
          callback(failure);
        }
      });
    };

    sync.remove = function(entity) {
      sync.backend.remove(entity, function(error) {
        if (error) {
          amplify.publish('sync.error', error, ['sync.remove('+entity.fqn+')']);
        }
      });
    };

    /**
     * Wraps the dispatch function from backend
     *
     * the callback is only called if no failure is retrieved from the backend. The failure is published via amplify
     */
    sync.dispatch = function(method, urlPart, body, successCodes, successFullResultCallback) {
      sync.backend.dispatchRequest(method, urlPart, body, successCodes, function(failure, result) {
        if (failure) {
          amplify.publish('sync.error', failure, ['sync.dispatch('+method+', '+urlPart+', <body>, ['+successCodes.join(',')+']'], { body: body });
        } else {
          successFullResultCallback(result);
        }
      });
    };

    // add entities that are created from the backend into the entityManager directly
    amplify.subscribe('knockout-sync.entity-created', function(entity) {
      sync.entityManager.attach(entity);
    });

    // remove entities that are remove from the backend into the entityManager directly
    amplify.subscribe('knockout-sync.entity-removed', function(entity) {
      sync.entityManager.detach(entity);
    });

  };

});