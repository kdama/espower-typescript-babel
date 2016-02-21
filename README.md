# espower-typescript-babel (experimental)  [![NPM version][npm-image]][npm-url] [![Dependency Status][deps-image]][deps-url]

power-assert instrumentor for TypeScript and Babel

1. Transpile from TypeScript to ES6 with typescript-simple
2. Transpile from ES6 to ES5 with babel
3. Instrument with power-assert
4. Run tests

## Why?

* TypeScript cannot transpile some features (generator, async/await) to ES5
* Babel can do it
* Zero configuration and zero temporary file for power-assert

## Usage

Put tsconfig.json (target: ES6) in your project root and

```bash
$ npm i -D espower-typescript-babel
$ mocha --compilers ts:espower-typescript-babel/guess test/**/*.ts
```

## License

MIT License: Teppei Sato &lt;teppeis@gmail.com&gt;

[npm-image]: https://img.shields.io/npm/v/espower-typescript-babel.svg
[npm-url]: https://npmjs.org/package/espower-typescript-babel
[travis-image]: https://travis-ci.org/teppeis/espower-typescript-babel.svg?branch=master
[travis-url]: https://travis-ci.org/teppeis/espower-typescript-babel
[deps-image]: https://david-dm.org/teppeis/espower-typescript-babel.svg
[deps-url]: https://david-dm.org/teppeis/espower-typescript-babel
