"use strict";
var Vector_1 = require("./Vector");
var Rectangle_1 = require("./Rectangle");
var Hitbox = (function () {
    function Hitbox(rectangles) {
        this.rectangles = rectangles;
        this.collisionBox = this.getCollisionBox();
    }
    Hitbox.prototype.checkCollision = function (origin, originHitbox, hitbox) {
        var collisionBox = new Rectangle_1.default(this.collisionBox.min.add(originHitbox), this.collisionBox.max);
        var collisionBox2 = new Rectangle_1.default(hitbox.collisionBox.min.add(origin), hitbox.collisionBox.max);
        if (collisionBox.checkCollision(collisionBox2)) {
            for (var i = 0; i < this.rectangles.length; i++) {
                for (var o = 0; o < hitbox.rectangles.length; o++) {
                    var otherRect = hitbox.rectangles[o];
                    var thisRect = this.rectangles[i];
                    var rect = new Rectangle_1.default(thisRect.min.add(originHitbox), thisRect.max);
                    var rect2 = new Rectangle_1.default(otherRect.min.add(origin), otherRect.max);
                    if (rect.checkCollision(rect2)) {
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
