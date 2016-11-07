"use strict";
var Rectangle = require("../dist/common/Rectangle.js").default;
var V = require("../dist/common/Vector.js").default;
var Hitbox = require("../dist/common/Hitbox.js").default;
var Body = require("../dist/common/Body.js").default;
var Model = require("../dist/common/Model.js").default;
var Entity = require("../dist/common/Entity.js").default;
var Block = require("../dist/common/Block.js").default;
var chai = require("chai");
var expect = chai.expect;
describe('Testing vector functions', function () {
  it('should collide', function (done) {
      expect(new Rectangle(new V(0, 0), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.equals(true);
      done();
  });
  it('should not collide', function (done) {
      expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
      done();
  });
  it('Velcotr addition', function (done) {
      expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
      done();
  });
  it('Velcotr subtraction', function (done) {
      expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
      done();
  });
  it('Scalling', function (done) {
      expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
      done();
  });
  it('smalest', function (done) {
      expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
      done();
  });
  it('biggest', function (done) {
      expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
      done();
  });
  it('equal', function (done) {
      expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
      done();
  });
});
