// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      'node_modules/zone.js/dist/proxy.js',
       'node_modules/zone.js/dist/sync-test.js',
        'node_modules/zone.js/dist/jasmine-patch.js',
        'node_modules/zone.js/dist/async-test.js',
        'node_modules/zone.js/dist/fake-async-test.js',
        { pattern:  './src/app/auth.service.spec.ts', watched: false},
      { pattern:  './src/app/posts.service.spec.ts', watched: false },
      { pattern:  './src/app/login/login.component.spec.ts', watched: false },
      { pattern:  './src/app/user/user.component.spec.ts', watched: false },
      { pattern:  './src/app/userdetail/userdetail.component.spec.ts', watched: false },
      { pattern:  './src/app/topics/topics.component.spec.ts', watched: false },
      { pattern:  './src/app/topicdetail/topicdetail.component.spec.ts', watched: false },
      { pattern:  './src/app/posts/posts.component.spec.ts', watched: false },
      { pattern:  './src/app/postdetail/postdetail.component.spec.ts', watched: false },
      { pattern:  './src/app/postadd/postadd.component.spec.ts', watched: false },
      { pattern:  './src/app/edituser/edituser.component.spec.ts', watched: false },
      { pattern:  './src/app/editcomment/editcomment.component.spec.ts', watched: false },
      { pattern:  './src/app/app.component.spec.ts', watched: false }
      
    ],
    preprocessors: {
      './src/app/auth.service.spec.ts': ['@angular/cli'],
      './src/app/posts.service.spec.ts': ['@angular/cli'],
      './src/app/login/login.component.spec.ts': ['@angular/cli'],
      './src/app/user/user.component.spec.ts': ['@angular/cli'],
      './src/app/userdetail/userdetail.component.spec.ts': ['@angular/cli'],
      './src/app/topics/topics.component.spec.ts': ['@angular/cli'],
      './src/app/topicdetail/topicdetail.component.spec.ts': ['@angular/cli'],
      './src/app/posts/posts.component.spec.ts': ['@angular/cli'],
      './src/app/postdetail/postdetail.component.spec.ts': ['@angular/cli'],
      './src/app/postadd/postadd.component.spec.ts': ['@angular/cli'],
      './src/app/edituser/edituser.component.spec.ts': ['@angular/cli'],
      './src/app/editcomment/editcomment.component.spec.ts': ['@angular/cli'],
      './src/app/app.component.spec.ts' : ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul']
              : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};