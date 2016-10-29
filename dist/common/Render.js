"use strict";
var Render = (function () {
    function Render(game, canvasParent, getRenderPosition) {
        var _this = this;
        this.canvas = document.createElement('canvas');
        canvasParent.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.game = game;
        this.canvas.height = document.documentElement.clientHeight;
        this.canvas.width = document.documentElement.clientWidth;
        window.addEventListener('resize', function () {
            _this.canvas.width = document.documentElement.clientWidth;
            _this.canvas.height = document.documentElement.clientHeight;
        });
        setInterval(this.renderLoop.bind(this), 16);
    }
    Render.prototype.renderLoop = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.game.map.blocks.length; i++) {
            this.game.map.blocks[i].render(this.context);
        }
        for (var i = 0; i < this.game.map.entitys.length; i++) {
            this.game.map.entitys[i].render(this.context);
        }
    };
    return Render;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Render;
