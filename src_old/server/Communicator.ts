import Game from "./../common/Classes/Game";
import Entity from "./../common/Classes/Entity";
import Player from "./Player";


export default class Communicator {
  game: Game;
  expressWs: any;
  staticElements: Array<Object>;
  players: Array<Player>;

  constructor(game, app, expressWs) {
    this.game = game;
    this.expressWs = expressWs;
    this.players = [];
    this.staticElements = [];



    for (let i = 0; i < this.game.entitys.length; i++) {
      let entity = this.game.entitys[i];
      if (entity.model.static) {
        this.staticElements[i] = {
          position: entity.position,
          model: entity.getModel(this.game.models),
        };
      } else {
        this.staticElements[i] = null;
      }
    }

    app.ws('/', (ws, req) => {
      let counter = 0;
      Game.prototype.specialInput = () => {
        if (counter < 5) {
          counter = 0;
          let elems = [];
          for (let i = 0; i < this.game.entitys.length; i++) {
            let entity = this.game.entitys[i];
            if (entity && !entity.model.static) {
              let model = entity.getModel(this.game.models);
              elems[i] = {
                position: entity.position,
                model: model,
                velocity: entity.velocity,
                force: entity.force
              };
            } else {
              elems[i] = null;
            }
          }

          this.broadcast(null, JSON.stringify({action: "movingElements", params: elems}));
        }
        counter++;
      }

      let a = this.players.push(new Player(ws, this.game, this.staticElements, this.broadcast.bind(this)));
      for (let i = 0; i < this.players.length; i++) {
        if (a != i) {
          this.players[i].sendMovingElements();
        }
      }
    });
  }

  broadcast(ws, msg) {
    this.expressWs.getWss().clients.forEach(function (client) {
      if (client != ws && client.readyState == 1) {
        client.send(msg);
      }
    });
  }
}
