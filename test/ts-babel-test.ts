import 'babel-polyfill';
import assert from 'power-assert';

describe(`hoge`, () => {
    it(`huga`, () => {
        var a: string;
        assert(1 === (() => {}));
    });

    it(`huga`, async () => {
        let res = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, 100);
        });
        assert(res === (() => {}));
    });
});
