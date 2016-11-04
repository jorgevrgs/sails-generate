/**
 * Module dependencies
 */

var path = require('path');
var util = require('util');
var _ = require('lodash');



/**
 * getPackageJsonData()
 *
 * Get the data that will be encoded in the
 * newly-generated `package.json` file.
 *
 * @param  {Dictionary} scope
 * @returns {Dictionary}
 */
module.exports = function getPackageJsonData(scope) {

  var sailsPkg;
  if (_.isObject(scope.sailsPackageJSON)) {
    sailsPkg = scope.sailsPackageJSON;
  }
  else if (_.isString(scope.sailsRoot)) {
    sailsPkg = require(path.resolve(scope.sailsRoot, 'package.json'));
  }
  else {
    throw new Error('Could not load package.json from Sails itself.  Make sure either `sailsPackageJSON` or `sailsRoot` are being passed in to `sails-generate`.');
  }

  // To determine the SVR for the sails dep. in the newly created package.json file,
  // base it off of the `version` specified in the package.json of Sails itself.
  var sailsSVR = '^' + sailsPkg.version;


  // List default dependencies used for apps with a frontend
  var declaredDeps = {

    // Sails core
    'sails': sailsSVR,

    // Have to have this if grunt hook is included, because it's required as a local dep
    // in order to use grunt programmatically.  (Hopefully we can change this in Grunt
    // at some point, if you want to help, please contact ben)
    'grunt': '1.0.1',

    // External hooks
    'sails-hook-orm': '^1.0.2',
    'sails-hook-sockets': '^1.0.7',
    'sails-hook-grunt': '^1.0.0',

    // Lodash
    'lodash': '3.10.1',

    // Async
    'async': '2.0.1'

  };

  // If this is an app being generated with `--no-frontend`, then include only
  // the bare minimum, esp. excluding grunt and all grunt-related dependencies.
  if (scope.frontend === false) {
    declaredDeps = _.pick(declaredDeps, [
      'sails',
      'sails-hook-orm',
      'sails-hook-sockets',
      'lodash',
      'async'
    ]);
  }//>-

  // Creating default package.json file content
  var defaultPackageJSONContent = {
    name: scope.appName,
    private: true,
    version: '0.0.0',
    description: scope.description || 'a Sails application',
    keywords: [],
    dependencies: declaredDeps,
    scripts: {
      start: 'node app.js',
      test:
        'echo && '+
        'echo "* * * * * * * * * * * * * * * * * * * * * * * * * * * " && '+
        'echo "About to run tests..." && '+
        'echo && '+
        'if node ./node_modules/mocha/bin/mocha --timeout 10000 ; then '+
          'sleep 0.0001'+
        '; else '+
          'echo && '+
          'echo && '+
          'echo "- - -" && '+
          'echo "Looks like something went wrong." && '+
          'echo "|  If you are not sure what to do next, try:" && '+
          'echo "|  npm install mocha@3.0.2 --save-dev --save-exact" && '+
          'echo "|  " && '+
          'echo "|  And then:" && '+
          'echo "|  mkdir test/" && '+
          'echo '+
        '; fi',
      debug: 'node debug app.js'
    },
    main: 'app.js',
    repository: {
      type: 'git',
      url: util.format('git://github.com/%s/%s.git', scope.github.username, scope.appName)
    },
    author: scope.author || '',
    license: ''
  };

  //
  // Check for `packageJson` configuration
  //

  if (scope.packageJson && _.isObject(scope.packageJson)) {
    //
    // Adding new dependencies to package.json
    //
    _.merge(defaultPackageJSONContent, (scope.packageJson || {}));

    //
    // Remove dependencies that has false as version
    // If somebody don't need dependency it could be removed using passing to scope:
    //
    // ```
    // packageJson: {
    //    dependencies: {
    //      ejs: false
    //    }
    // }
    // ```
    //
    if (scope.packageJson.dependencies) {
      defaultPackageJSONContent.dependencies = _.omit(defaultPackageJSONContent.dependencies, function(value) {
        return value === false;
      });
    }
  }

  return _.defaults(scope.appPackageJSON || {}, defaultPackageJSONContent);
};