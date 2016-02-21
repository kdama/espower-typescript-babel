import 'babel-polyfill'; // for regenerator
import assert from 'power-assert';

describe(`error sample`, () => {
    it(`should error 1`, () => {
        var a: string;
        assert(1 === (() => {}));
    });

    it(`should error 2`, async () => {
        let res = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, 100);
        });
        assert(res === (() => {}));
    });
});
