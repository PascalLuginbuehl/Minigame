"use strict";
var Game_1 = require("./../../common/Classes/Game");
var Communicator_1 = require("./../../common/Classes/Communicator");
var Render_1 = require("./../../common/Classes/Render");
var Input_1 = require("./../../common/Classes/Input");
'use strict';
var CONFIG = {
    gameLoopInterval: 16,
    map: {
        height: 1000,
        width: 1000,
    },
    textureBasepath: 'assets/images/',
    textures: {
        'dirt': {
            texture: 'dirt.png',
            w: 16,
            h: 16,
            spriteMax: 5,
        },
        'house': {
            texture: 'house.png',
            w: 254,
            h: 198,
            spriteMax: 1,
        },
        'duck': {
            texture: 'player.png',
            w: 16,
            h: 18,
            spriteMax: 4,
        },
    },
    models: {
        'dirt': {
            solid: true,
            static: false,
            hitbox: [{
                    x: 0,
                    y: 0,
                    w: 16,
                    h: 16,
                }],
        },
        'house': {
            solid: true,
            static: true,
            hitbox: [{
                    x: 0,
                    y: 0,
                    w: 254,
                    h: 198,
                }],
        },
        'duck': {
            solid: true,
            static: false,
            hitbox: [{
                    x: 0,
                    y: 0,
                    w: 18,
                    h: 18,
                }],
        }
    },
};
var game = new Game_1.default(CONFIG, function () { return window.performance.now(); });
var communicator = new Communicator_1.default(game);
var input = new Input_1.default(game, communicator);
document.addEventListener('DOMContentLoaded', function () {
    var render = new Render_1.default(game, document.body, {
        renderHitbox: true
    }, function () {
        return communicator.player.position;
    });
});
