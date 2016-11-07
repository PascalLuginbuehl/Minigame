/// <reference path="./../typings/node/node.d.ts" />
/// <reference path="./../typings/mocha/mocha.d.ts" />
/// <reference path="./../typings/chai/chai.d.ts" />


let Rectangle = require("../dist/common/Rectangle.js").default;
let V = require("../dist/common/Vector.js").default;
let Hitbox = require("../dist/common/Hitbox.js").default;
let Body = require("../dist/common/Body.js").default;
let Model = require("../dist/common/Model.js").default;
let Entity = require("../dist/common/Entity.js").default;
let Block = require("../dist/common/Block.js").default;
/**
 * Module dependencies.
 */
import chai = require('chai');

/**
 * Globals
 */
var expect = chai.expect;


/**
 * Unit tests
 */
describe('Testing vector functions', () => {
  it('Velcotr addition', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('Velcotr subtraction', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('Scalling', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('smalest', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('biggest', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('equal', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });
});
