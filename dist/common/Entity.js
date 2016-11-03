"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Body_1 = require("./Body");
var Vector_1 = require("./Vector");
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(position, model, force, velocity) {
        if (force === void 0) { force = new Vector_1.default(0, 0); }
        if (velocity === void 0) { velocity = new Vector_1.default(0, 0); }
        _super.call(this, position, model);
        this.velocity = velocity;
        this.force = force;
    }
    Entity.prototype.render = function (ctx) {
        if (this.spritePositon == undefined || Math.ceil(this.spritePositon) >= this.model.spriteMax) {
            this.spritePositon = 0;
        }
        var rad = Math.atan2(this.velocity.x, this.velocity.y);
        var a = Math.round(rad * (4 / Math.PI));
        var direction = (a < -0 ? a * (-1) + 4 : a);
        var speed = 0;
        switch (direction) {
            case 0:
                speed = this.velocity.y;
                break;
            case 1:
                speed = (this.velocity.x + this.velocity.y) / 2;
                break;
            case 2:
                speed = this.velocity.x;
                break;
            case 3:
                speed = (this.velocity.x + (this.velocity.y * -1)) / 2;
                break;
            case 8:
            case 4:
                speed = this.velocity.y * -1;
                break;
            case 5:
                speed = ((this.velocity.x * -1) + this.velocity.y) / 2;
                break;
            case 6:
                speed = this.velocity.x * -1;
                break;
            case 7:
                speed = ((this.velocity.x + this.velocity.y) / 2) * -1;
                break;
        }
        this.spritePositon += speed / 1000;
        ctx.drawImage(this.model.texture, this.model.textureSize.x * Math.floor(this.spritePositon), 0, this.model.texture.width / this.model.spriteMax, this.model.texture.height, Math.round(this.position.x), Math.round(this.position.y), this.model.textureSize.x, this.model.textureSize.y);
    };
    return Entity;
}(Body_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entity;
