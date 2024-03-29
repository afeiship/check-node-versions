var ROOT_PATH = require('root-path');
var semver = require('semver');
var chalk = require('chalk');
var packageJson = require(ROOT_PATH + '/package.json');
var exec = function(cmd) {
  return require('child_process')
    .execSync(cmd).toString().trim()
};


var versionRequirements = [{
  name: 'node',
  currentVersion: semver.clean(process.version),
  versionRequirement: packageJson.engines.node
}, {
  name: 'npm',
  currentVersion: exec('npm --version'),
  versionRequirement: packageJson.engines.npm
}];

module.exports = function() {
  var warnings = [];
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i];
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      );
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning);
    }
    process.exit(1);
  }
};
