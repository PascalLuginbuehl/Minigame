"use strict";
var Vector_1 = require("./Vector");
var Rectangle_1 = require("./Rectangle");
var Hitbox = (function () {
    function Hitbox(hitboxconf) {
        this.hitboxes = [];
        for (var i = 0; i < hitboxconf.length; i++) {
            this.hitboxes.push(new Rectangle_1.default(hitboxconf[i]));
        }
        this.collisionBox = this.getCollisionBox();
    }
    Hitbox.prototype.checkCollision = function (origin, eOrigin, eHitbox) {
        if (this.collisionBox.checkCollision(origin, eOrigin, eHitbox.collisionBox)) {
            for (var i = 0; i < this.hitboxes.length; i++) {
                var hitboxes = this.hitboxes[i];
                for (var o = 0; o < eHitbox.hitboxes.length; o++) {
                    if (hitboxes.checkCollision(origin, eOrigin, eHitbox.hitboxes[o])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Hitbox.prototype.getCollisionBox = function () {
        var max = new Vector_1.default(0, 0);
        for (var i = 0; i < this.hitboxes.length; i++) {
            var hitbox = this.hitboxes[i];
            max = max.biggest(hitbox.min.add(hitbox.max));
        }
        var min = new Vector_1.default(max.x, max.y);
        for (var i = 0; i < this.hitboxes.length; i++) {
            min = min.smalest(this.hitboxes[i].min);
        }
        return new Rectangle_1.default({ min: min, max: max });
    };
    return Hitbox;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hitbox;
