module.exports = function(grunt, options) {
  return {
    'dev': {
      options: {
        dir: options.buildDir+'/lib/',
        baseUrl: '/assets/js/lib/',
        configFile: options.buildDir+'/config-shimney.js'
      }
    },
    test: {
      options: {
        dir: 'build/shimney',
        baseUrl: '../../build/',
        configFile: 'build/config-test-shimney.js'
      }
    },
    'build': {
      options: {
        dir: options.buildDir+'/lib/',
        baseUrl: 'lib/',
        configFile: options.buildDir+'/config-shimney.js'
      }
    }
  };
};