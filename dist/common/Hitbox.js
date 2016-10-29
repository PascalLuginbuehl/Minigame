"use strict";
var Vector_1 = require("./Vector");
var Rectangle_1 = require("./Rectangle");
var Hitbox = (function () {
    function Hitbox(rectangles) {
        this.rectangles = rectangles;
        this.collisionBox = this.getCollisionBox();
    }
    Hitbox.prototype.checkCollision = function (origin, originHitbox, hitbox) {
        if (this.collisionBox.checkCollision(origin, originHitbox, hitbox.collisionBox)) {
            for (var i = 0; i < this.rectangles.length; i++) {
                for (var o = 0; o < hitbox.rectangles.length; o++) {
                    var otherRect = hitbox.rectangles[i];
                    var thisRect = this.rectangles[i];
                    if (thisRect.checkCollision(origin, originHitbox, otherRect)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Hitbox.prototype.getCollisionBox = function () {
        var max = new Vector_1.default(0, 0);
        for (var i = 0; i < this.rectangles.length; i++) {
            var hitbox = this.rectangles[i];
            max = max.biggest(hitbox.min.add(hitbox.max));
        }
        var min = new Vector_1.default(max.x, max.y);
        for (var i = 0; i < this.rectangles.length; i++) {
            min = min.smalest(this.rectangles[i].min);
        }
        return new Rectangle_1.default(min, max);
    };
    return Hitbox;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hitbox;
