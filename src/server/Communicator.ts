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
      }
    }

    app.ws('/', (ws, req) => {
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
      if (client != ws) {
        client.send(msg);
      }
    });
  }
}
