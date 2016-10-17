"use strict";
var Vector_1 = require("./Vector");
var Render = (function () {
    function Render(game, canvasParent, debugging, origin) {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.height = this.canvas.height = document.documentElement.clientHeight;
        this.canvas.width = this.canvas.width = document.documentElement.clientWidth;
        canvasParent.appendChild(this.canvas);
        this.canvas.style.imageRendering = "pixelated";
        this.ctx = this.canvas.getContext("2d");
        this.origin = origin;
        this.game = game;
        this.debugging = debugging;
        for (var name_1 in this.game.models) {
            var img = new Image();
            var texture = this.game.config.textures[name_1];
            img.src = "assets/images/" + texture.texture;
            this.game.models[name_1].spriteMax = texture.spriteMax;
            this.game.models[name_1].texture = img;
            this.game.models[name_1].textureSize = new Vector_1.default(texture.w, texture.h);
        }
        window.addEventListener('resize', function () {
            _this.canvas.width = document.documentElement.clientWidth;
            _this.canvas.height = document.documentElement.clientHeight;
        });
        setInterval(this.render.bind(this), Math.round(1000 / 60));
    }
    Render.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.origin.position.x * -1 + this.canvas.width / 2, this.origin.position.y * -1 + this.canvas.height / 2);
        for (var i = 0; i < this.game.entitys.length; i++) {
            var entity = this.game.entitys[i];
            entity.renderTexture(this.ctx);
            for (var i_1 = 0; i_1 < entity.model.hitbox.hitboxes.length; i_1++) {
                entity.model.hitbox.hitboxes[i_1].drawRect(entity.position, this.ctx);
            }
        }
        this.ctx.restore();
    };
    return Render;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Render;
