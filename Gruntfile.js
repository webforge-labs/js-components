module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    configPath: require('path').join(process.cwd(), 'etc', 'grunt'),
    init: true,
    loadGruntTasks: {
      pattern: ['grunt-*'],
    },
    data: {
      srcDir: 'src/js',
      libDir: "src/js/lib",
      buildDir: "www/assets/js",
      assetsBuildDir: "www/assets"
    },
  });

  grunt.task.registerTask('build-dev', ['sweepout:dev']);
  grunt.task.registerTask('build-test', ['sweepout:test', 'merge-configs:test']);

};