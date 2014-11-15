module.exports = function(grunt, options) {
  return {
    test: {
      options: {
        configFiles: [
          'build/config-test-shimney.js'
        ],

        targetFile: 'build/config-test.js',

        modify: function(mergedConfig) {
          mergedConfig.baseUrl = 'src/js';
        },

        template: 'etc/js/config-template.js'
      }
    }
  };
};
