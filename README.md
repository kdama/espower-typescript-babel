# espower-typescript-babel (experimental)

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
$ npm i teppeis/espower-typescript-babel
$ mocha --compilers ts:espower-typescript-babel/guess test/**/*.ts
```
