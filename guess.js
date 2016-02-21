var path = require('path'),
    fs = require('fs'),
    resolveBabelrc = require('./lib/babelrc-util').resolveBabelrc,
    pattern = 'test/**/*.ts',
    packageData,
    testDir,
    babelrc,
    extension = '.ts';

var ts = require('typescript');

// Override extension via (eg: `mocha --compilers <extension>:espower-babel/guess`)
process.argv.forEach(function (arg) {
    // <extension>:espower-babel/guess
    var args = arg.split(':');
    if (args.length <= 1) {
        return;
    }
    var filePath = args[1];
    var compilerFilePath = require.resolve(filePath);
    var compilerFileExtension = args[0];
    if (compilerFilePath !== module.filename) {
        return;
    }
    extension = '.' + compilerFileExtension;
});

packageData = require(path.join(process.cwd(), 'package.json'));
if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
    testDir = packageData.directories.test;
    pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + '**/*' + extension;
}

babelrc = resolveBabelrc(process.cwd(), {});

var tsconfigPath = ts.findConfigFile(process.cwd(), fs.existsSync);
var tsconfigBasepath = null;
var compilerOptions = null;
if (tsconfigPath) {
  compilerOptions = parseTsConfig(tsconfigPath);
  tsconfigBasepath = path.dirname(tsconfigPath);
}

function parseTsConfig(tsconfigPath) {
  var parsed = ts.parseConfigFileTextToJson(tsconfigPath, fs.readFileSync(tsconfigPath, 'utf8'));
  if (parsed.error) {
    throw new Error(parsed.error.messageText);
  }

  if (!parsed.config || !parsed.config.compilerOptions) {
    return null;
  }

  return parsed.config.compilerOptions;
}

require('./index')({
    cwd: process.cwd(),
    pattern: pattern,
    babelrc: babelrc,
    extension: extension,
    compilerOptions: compilerOptions,
    basepath: tsconfigBasepath
});
