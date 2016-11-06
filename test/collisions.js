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
describe('Collisiondetection between Hitboxes, Rectangles, Bodys, Blocks and Entitys', function () {
    describe('Rectangles', function () {
        it('should collide', function (done) {
            expect(new Rectangle(new V(0, 0), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.be.true;
            done();
        });
        it('should not collide', function (done) {
            expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.be.false;
            done();
        });
    });
    describe('Hitboxes', function () {
        it('should collide', function (done) {
            expect(new Hitbox([new Rectangle(new V(0, 0), new V(10, 10))])
                .checkCollision(new V(0, 0), new V(0, 0), new Hitbox([new Rectangle(new V(0, 0), new V(10, 10))]))).to.be.true;
            done();
        });
        it('should collide', function (done) {
            expect(new Hitbox([new Rectangle(new V(0, 0), new V(10, 10))])
                .checkCollision(new V(10, 10), new V(0, 0), new Hitbox([new Rectangle(new V(0, 0), new V(10, 10))]))).to.be.false;
            done();
        });
    });
    describe('Bodys', function () {
        it('should collide', function (done) {
            expect(new Body(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))).checkCollision(new Body(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))))).to.be.true;
            done();
        });
        it('should not collide', function (done) {
            expect(new Body(new V(10, 10), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))).checkCollision(new Body(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))))).to.be.false;
            done();
        });
    });
    describe('Entitys', function () {
        it('should collide', function (done) {
            expect(new Entity(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))).checkCollision(new Body(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))))).to.be.true;
            done();
        });
        it('should not collide', function (done) {
            expect(new Entity(new V(10, 10), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))).checkCollision(new Entity(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))))).to.be.false;
            done();
        });
    });
    describe('Blocks', function () {
        it('should collide', function (done) {
            expect(new Block(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))).checkCollision(new Block(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))))).to.be.true;
            done();
        });
        it('should not collide', function (done) {
            expect(new Block(new V(10, 10), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))).checkCollision(new Block(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))))).to.be.false;
            done();
        });
        it('should collide but due to no collision dont', function (done) {
            expect(new Block(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ]))).checkCollision(new Block(new V(0, 0), new Model(new Hitbox([
                new Rectangle(new V(0, 0), new V(10, 10))
            ])), false))).to.be.true;
            done();
        });
    });
});
