const expect = require('chai').expect;
const $ = require('../lib');

describe('$', () => {
  it('tagged template', () => {
    expect($`return 1 + 1`).to.equal(2);

    expect($`return ${5}`).to.equal(5);

    expect($`return ${true}`).to.equal(true);

    expect($`return "${'foo'}"`).to.equal('foo');

    expect($`return ${'"foo"'}`).to.equal('foo');

    expect($`return ${null}`).to.equal(null);

    expect($`return ${undefined}`).to.equal(undefined);

    expect($``).to.equal(undefined);

    const obj = { foo: 1, bar: '2', baz: true };
    expect($`return ${obj}`).to.deep.equal(obj);

    const arr = [1, '2', true];
    expect($`return ${arr}`).to.deep.equal(arr);
  });

  it('normal function', () => {
    expect($(`return 1 + 1`)).to.deep.equal(2);
  });

  it('with context', () => {
    expect($({ a: 1, b: 2 })(`return a + b`)).to.deep.equal(3);

    expect($({ a: 1, b: 2 })`return a + b`).to.deep.equal(3);
  });
});
