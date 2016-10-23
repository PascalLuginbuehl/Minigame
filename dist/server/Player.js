"use strict";
var Entity_1 = require('./../common/Classes/Entity');
var Vector_1 = require('./../common/Classes/Vector');
var Player = (function () {
    function Player(ws, game, staticElements, broadcast) {
        var _this = this;
        this.staticElements = staticElements;
        this.game = game;
        this.ws = ws;
        this.broadcast = broadcast;
        this.entity = new Entity_1.default(new Vector_1.default(300, 300), game.models["duck"]);
        this.arrayPosition = game.entitys.push(this.entity) - 1;
        this.sendStaticElements();
        this.sendMovingElements();
        this.sendPlayer();
        this.ws.on('close', function () {
            _this.game.entitys[_this.arrayPosition] = null;
        });
        this.ws.on('error', function () {
            console.log("err");
        });
        this.ws.on('message', function (msg) {
            var data = { action: null, params: null };
            try {
                data = JSON.parse(msg);
            }
            catch (e) {
                console.log(e);
            }
            switch (data.action) {
                case "movingElements":
                    _this.sendMovingElements();
                    break;
                case "force":
                    _this.updateForce(data.params);
                    break;
                case "ping":
                    ws.send('{"action": "ping"}');
                    break;
            }
        });
    }
    Player.prototype.sendMovingElements = function () {
        var elems = [];
        for (var i = 0; i < this.game.entitys.length; i++) {
            var entity = this.game.entitys[i];
            if (entity && !entity.model.static) {
                var model = entity.getModel(this.game.models);
                elems[i] = {
                    position: entity.position,
                    model: model,
                    velocity: entity.velocity,
                    force: entity.force
                };
            }
            else {
                elems[i] = null;
            }
        }
        this.send({ action: "movingElements", params: elems });
    };
    Player.prototype.sendPlayer = function () {
        this.send({ action: "player", params: this.arrayPosition });
    };
    Player.prototype.sendStaticElements = function () {
        this.send({ action: "staticElements", params: this.staticElements });
    };
    Player.prototype.updateForce = function (force) {
        this.entity.force = new Vector_1.default(force);
        this.broadcast(this.ws, JSON.stringify({ action: "force", params: { arrayPosition: this.arrayPosition, force: force } }));
    };
    Player.prototype.send = function (data) {
        this.ws.send(JSON.stringify(data));
    };
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
