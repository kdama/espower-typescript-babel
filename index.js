"use strict";
var assert = require("assert");
var babel = require("babel-core");
var shouldIgnoreByBabel = require("./lib/babelrc-util").shouldIgnoreByBabel;
var fs = require("fs");
var minimatch = require("minimatch");
var extend = require("xtend");
var createEspowerPlugin = require("babel-plugin-espower/create");
var sourceMapSupport = require("source-map-support");
var extensions = require.extensions;
var ts = require('typescript');
var TypeScriptSimple = require('typescript-simple').TypeScriptSimple;

function espowerBabel(options) {
    var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/',
        pattern = options.cwd + separator + options.pattern,
        babelrc = options.babelrc || {},
        extension = options.extension;

    assert(extension === '.ts');

    var compilerOptions = convertCompilerOptions(options.compilerOptions, options.basepath);
    var tss = new TypeScriptSimple(compilerOptions, false);

    var sourceMaps = {};
    // https://github.com/evanw/node-source-map-support
    // `sourceMaps` is the cached map object of transform by babel
    sourceMapSupport.install({
        handleUncaughtExceptions: false,
        retrieveSourceMap: function (source) {
            var map = sourceMaps && sourceMaps[source];
            if (map) {
                return {
                    url: null,
                    map: map
                };
            } else {
                return null;
            }
        }
    });
    function useEspower(babelOptions) {
        babelOptions.plugins = babelOptions.plugins || [];
        var espowerPluginExists = babelOptions.plugins.some(function (plugin) {
            var pluginName = typeof plugin === "string" ? plugin : plugin.key;
            return pluginName === "babel-plugin-espower";
        });
        if (!espowerPluginExists) {
            babelOptions.plugins.push(createEspowerPlugin(babel, options.espowerOptions));
        }
        return babelOptions;
    }

    extensions[extension] = function (localModule, filepath) {
        var result;
        // https://babeljs.io/docs/usage/api/
        var babelOptions = extend(babelrc, {
            filename: filepath,
            sourceMap: "both",
            ast: false
        });
        var src = fs.readFileSync(filepath, "utf-8");
        var tssrc = tss.compile(src);
        // transform test files using espower's `pattern` value
        if (minimatch(filepath, pattern)) {
            result = babel.transform(tssrc, useEspower(babelOptions));
            sourceMaps[filepath] = result.map;
            localModule._compile(result.code, filepath);
            return;
        }
        // transform the other files
        if (shouldIgnoreByBabel(filepath, babelOptions)) {
            localModule._compile(tssrc, filepath);
        } else {
            result = babel.transform(tssrc, babelOptions);
            sourceMaps[filepath] = result.map;
            localModule._compile(result.code, filepath);
        }
    };
}

function convertCompilerOptions(compilerOptions, basepath) {
  if (!compilerOptions) {
    return {};
  }

  var basepath = basepath || process.cwd();
  var converted = ts.convertCompilerOptionsFromJson(compilerOptions, basepath);
  if (converted.errors && converted.errors.length > 0) {
    var msg = converted.errors.map(function(e) {return e.messageText}).join(', ');
    throw new Error(msg);
  }
  return converted.options;
}

module.exports = espowerBabel;
