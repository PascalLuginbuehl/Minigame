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
describe('Collisiondetection between Hitboxes, Rectangles, Bodys, Blocks and Entitys', () => {
  describe('Rectangles', () => {
    it('should collide', (done) => {
      expect(
        new Rectangle(
          new V(0, 0), new V(10, 10)
        ).checkCollision(
          new Rectangle(new V(0, 0), new V(10, 10))
        )).to.be.true;
      done();
    });

    it('should not collide', (done) => {
      expect(
        new Rectangle(
          new V(10, 10), new V(10, 10)
        ).checkCollision(
          new Rectangle(new V(0, 0), new V(10, 10))
        )).to.be.false;
      done();
    });
  });


  describe('Hitboxes', () => {
    it('should collide', (done) => {
      expect(
        new Hitbox([new Rectangle(
          new V(0, 0), new V(10, 10)
        )])
        .checkCollision(new V(0, 0), new V(0, 0),
          new Hitbox([new Rectangle(new V(0, 0), new V(10, 10))])
        )).to.be.true;
      done();
    });

    it('should collide', (done) => {
      expect(
        new Hitbox([new Rectangle(
          new V(0, 0), new V(10, 10)
        )])
        .checkCollision(new V(10, 10), new V(0, 0),
          new Hitbox([new Rectangle(new V(0, 0), new V(10, 10))])
        )).to.be.false;
      done();
    });
  });


  describe('Bodys', () => {
    it('should collide', (done) => {
      expect(
        new Body(
          new V(0, 0),
          new Model(
            new Hitbox([
              new Rectangle(
                new V(0, 0), new V(10, 10)
              )]
            )
          )
        ).checkCollision(
          new Body(
            new V(0, 0),
            new Model(
              new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
              ])
            )
          )
        )).to.be.true;
        done();
    });

    it('should not collide', (done) => {
      expect(
        new Body(
          new V(10, 10),
          new Model(
            new Hitbox([
              new Rectangle(
                new V(0, 0), new V(10, 10)
              )]
            )
          )
        ).checkCollision(
          new Body(
            new V(0, 0),
            new Model(
              new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
              ])
            )
          )
        )).to.be.false
        done();
    });
  });

  describe('Entitys', () => {
    it('should collide', (done) => {
      expect(
        new Entity(
          new V(0, 0),
          new Model(
            new Hitbox([
              new Rectangle(
                new V(0, 0), new V(10, 10)
              )]
            )
          )
        ).checkCollision(
          new Body(
            new V(0, 0),
            new Model(
              new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
              ])
            )
          )
        )).to.be.true;
        done();
    });

    it('should not collide', (done) => {
      expect(
        new Entity(
          new V(10, 10),
          new Model(
            new Hitbox([
              new Rectangle(
                new V(0, 0), new V(10, 10)
              )]
            )
          )
        ).checkCollision(
          new Entity(
            new V(0, 0),
            new Model(
              new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
              ])
            )
          )
        )).to.be.false;
        done();
    });
  });


  describe('Blocks', () => {
    it('should collide', (done) => {
      expect(
        new Block(
          new V(0, 0),
          new Model(
            new Hitbox([
              new Rectangle(
                new V(0, 0), new V(10, 10)
              )]
            )
          )
        ).checkCollision(
          new Block(
            new V(0, 0),
            new Model(
              new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
              ])
            )
          )
        )).to.be.true;
        done();
    });

    it('should not collide', (done) => {
      expect(
        new Block(
          new V(10, 10),
          new Model(
            new Hitbox([
              new Rectangle(
                new V(0, 0), new V(10, 10)
              )]
            )
          )
        ).checkCollision(
          new Block(
            new V(0, 0),
            new Model(
              new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
              ])
            )
          )
        )).to.be.false;
        done();
    });

    it('should collide but due to no collision dont', (done) => {
      expect(
        new Block(
          new V(0, 0),
          new Model(
            new Hitbox([
              new Rectangle(
                new V(0, 0), new V(10, 10)
              )]
            )
          ),
        ).checkCollision(
          new Block(
            new V(0, 0),
            new Model(
              new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
              ])
            ),
            false
          )
        )).to.be.true;
        done();
    });
  });
});
