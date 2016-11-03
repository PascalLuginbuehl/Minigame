"use strict";
var Render = (function () {
    function Render(game, canvasParent, getRenderPosition, cameraEntity) {
        var _this = this;
        this.game = game;
        this.cameraEntity = cameraEntity;
        this.canvas = document.createElement('canvas');
        canvasParent.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.canvas.height = document.documentElement.clientHeight;
        this.canvas.width = document.documentElement.clientWidth;
        this.mapCanvas = document.createElement('canvas');
        this.mapCanvas.height = 10000;
        this.mapCanvas.width = 10000;
        this.mapContext = this.mapCanvas.getContext('2d');
        window.addEventListener('resize', function () {
            _this.canvas.width = document.documentElement.clientWidth;
            _this.canvas.height = document.documentElement.clientHeight;
        });
        var texturesToLoad = Object.keys(this.game.models).length;
        var loadedTextures = 0;
        var _loop_1 = function(modelName) {
            var model = this_1.game.models[modelName];
            model.texture = new Image();
            model.texture.src = model.texturePath;
            model.texture.addEventListener('load', function () {
                loadedTextures++;
                if (model.hasPattern) {
                    model.pattern = _this.context.createPattern(model.texture, "repeat");
                }
                if (loadedTextures >= texturesToLoad) {
                    for (var i = 0; i < _this.game.map.blocks.length; i++) {
                        _this.game.map.blocks[i].render(_this.mapContext);
                    }
                    setInterval(_this.renderLoop.bind(_this), 16);
                }
            });
        };
        var this_1 = this;
        for (var modelName in this.game.models) {
            _loop_1(modelName);
        }
    }
    Render.prototype.renderLoop = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.translate(Math.round(this.cameraEntity.position.x) * -1 + Math.round(this.canvas.width / 2), Math.round(this.cameraEntity.position.y) * -1 + Math.round(this.canvas.height / 2));
        this.context.drawImage(this.mapCanvas, 0, 0);
        for (var i = 0; i < this.game.map.entitys.length; i++) {
            this.game.map.entitys[i].render(this.context);
        }
        this.context.restore();
    };
    return Render;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Render;
