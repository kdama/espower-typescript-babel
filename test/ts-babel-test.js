var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
require('babel-polyfill');
var power_assert_1 = require('power-assert');
describe("hoge", function () {
    it("huga", function () {
        var a;
        power_assert_1["default"](1 === (function () { }));
    });
    it("huga", function () {
        var res = yield new Promise(function (resolve) {
            setTimeout(function () {
                resolve(2);
            }, 100);
        });
        power_assert_1["default"](res === (function () { }));
    });
});
