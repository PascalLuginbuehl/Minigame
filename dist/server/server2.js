"use strict";
var Game_js_1 = require("./../common/Classes/Game.js");
function getTime() {
    var hrend = process.hrtime();
    return hrend[0] + hrend[1] / 1000000;
}
var b = new Game_js_1.default({
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
}, getTime);
