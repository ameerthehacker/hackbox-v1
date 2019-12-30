/*
 * SystemJS format Babel transformer
 */
/*
 * This source code is taken from https://github.com/systemjs/systemjs-transform-babel
 * Right now the official loader does not support other plugins
 */
import * as babel from '@babel/core';
import babelPluginSyntaxDynamicImport from '@babel/plugin-syntax-dynamic-import';
import babelPluginSyntaxImportMeta from '@babel/plugin-syntax-import-meta';
import babelPluginTransformModulesSystemJS from '@babel/plugin-transform-modules-systemjs';
import babelJsxPlugin from '@babel/plugin-transform-react-jsx';

const plugins = [
  babelPluginSyntaxDynamicImport,
  babelPluginSyntaxImportMeta,
  babelPluginTransformModulesSystemJS,
  babelJsxPlugin
];

/* eslint-disable no-undef */
(function(global) {
  const systemJSPrototype = global.System.constructor.prototype;
  const transform = systemJSPrototype.transform;
  systemJSPrototype.transform = function(url, source) {
    // composition of transform is done based on assuming every format
    // returns its own System.register. So we don't "compose" transforms
    // but rather treat transforms "fallbacks" where they can select themselves
    return Promise.resolve(transform.call(this, url, source)).then(function(
      _source
    ) {
      // if there was translation done, then stop
      if (source !== _source) return _source;

      return new Promise((resolve, reject) => {
        babel.transform(
          source,
          {
            plugins: plugins,
            sourceMaps: 'inline',
            sourceFileName: url.split('/').pop()
          },
          function(err, result) {
            if (err) reject(err);
            else resolve(result);
          }
        );
      }).then(function(result) {
        return result.code;
      });
    });
  };
})(typeof self !== 'undefined' ? self : global);
