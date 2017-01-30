"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Body_1 = require("./Body");
var Vector_1 = require("./Vector");
var Rectangle_1 = require("./Rectangle");
var Hitbox_1 = require("./Hitbox");
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(position, model, force, velocity) {
        if (force === void 0) { force = new Vector_1.default(0, 0); }
        if (velocity === void 0) { velocity = new Vector_1.default(0, 0); }
        _super.call(this, position, model);
        this.velocity = velocity;
        this.force = force;
        this.lastDirection = 0;
        var attackRange = 16;
        this.attackRangeObject = {
            0: new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(0, this.model.hitbox.collisionBox.max.y), new Vector_1.default(attackRange, attackRange)),
            ]),
            1: new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2), new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2)),
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y), new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y)),
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y), new Vector_1.default(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y))
            ]),
            "-1": new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x * -1, this.model.hitbox.collisionBox.max.y / 2), new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2)),
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x * -1, this.model.hitbox.collisionBox.max.y), new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y)),
                new Rectangle_1.default(new Vector_1.default(0, this.model.hitbox.collisionBox.max.y), new Vector_1.default(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y))
            ]),
            2: new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x, 0), new Vector_1.default(attackRange, attackRange)),
            ]),
            "-2": new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x * -1, 0), new Vector_1.default(attackRange, attackRange)),
            ]),
            3: new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y * -1), new Vector_1.default(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y)),
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y * -1), new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y)),
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y), new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2))
            ]),
            "-3": new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y * -1), new Vector_1.default(this.model.hitbox.collisionBox.max.x / 2, this.model.hitbox.collisionBox.max.y)),
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y * -1), new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y)),
                new Rectangle_1.default(new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y), new Vector_1.default(this.model.hitbox.collisionBox.max.x, this.model.hitbox.collisionBox.max.y / 2))
            ]),
            4: new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(0, this.model.hitbox.collisionBox.max.y * -1), new Vector_1.default(attackRange, attackRange)),
            ]),
            "-4": new Hitbox_1.default([
                new Rectangle_1.default(new Vector_1.default(0, this.model.hitbox.collisionBox.max.y * -1), new Vector_1.default(attackRange, attackRange)),
            ]),
        };
    }
    Entity.prototype.inDirectionRange = function (body) {
        return this.attackRangeObject[this.lastDirection].checkCollision(body.position, this.position, body.model.hitbox);
    };
    Entity.prototype.getDirection = function () {
        if (Math.floor(Math.abs(this.velocity.x)) < 10 && Math.floor(Math.abs(this.velocity.y)) < 10) {
            return this.lastDirection;
        }
        else {
            var rad = Math.atan2(this.velocity.x, this.velocity.y);
            return Math.round(rad / Math.PI * 4);
        }
    };
    Entity.prototype.render = function (ctx) {
        if (this.spritePositon == undefined || Math.ceil(this.spritePositon) >= this.model.spriteMax) {
            this.spritePositon = 0;
        }
        var width = this.model.texture.width / this.model.spriteMax;
        var height = this.model.texture.height / this.model.spriteHeight;
        console.log(this.lastDirection);
        var textureX = 0;
        switch (this.lastDirection) {
            case 1:
            case 2:
            case 3:
                textureX = 3;
                break;
            case -1:
            case -2:
            case -3:
                textureX = 1;
                break;
            case -4:
            case 4:
                textureX = 2;
                break;
        }
        var speed = Math.sqrt(this.velocity.y * this.velocity.y + this.velocity.x * this.velocity.x);
        ;
        var direction = this.lastDirection;
        this.spritePositon += speed / 1000;
        ctx.drawImage(this.model.texture, width * Math.floor(this.spritePositon), height * textureX, width, height, Math.round(this.position.x), Math.round(this.position.y), this.model.textureSize.x, this.model.textureSize.y);
    };
    return Entity;
}(Body_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entity;
