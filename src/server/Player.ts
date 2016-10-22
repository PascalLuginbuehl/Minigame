import Entity from './../common/Classes/Entity';
import Game from './../common/Classes/Game';
import V from './../common/Classes/Vector';

// keep array position

export default class Player {
  ws: any;
  entity: Entity;
  game: Game;
  staticElements: Array<Object>;
  arrayPosition: number;
  broadcast: Function;

  constructor(ws: any, game: Game, staticElements: Array<Object>, broadcast: Function) {
    this.staticElements = staticElements;
    this.game = game;
    this.ws = ws;
    this.broadcast = broadcast;


    this.entity = new Entity (
      new V(300, 300),
      game.models["duck"]
    );

    this.arrayPosition = game.entitys.push(this.entity) - 1;


    this.sendStaticElements();
    this.sendMovingElements();
    this.sendPlayer();

    this.ws.on('close', () => {
      this.game.entitys[this.arrayPosition] = null;
    });

    this.ws.on('error', function() {
      console.log("err");
    });

    this.ws.on('message', (msg) => {
      try {
        let data = JSON.parse(msg);
        switch (data.action) {
          case "movingElements":
            this.sendMovingElements();
            break;
          case "force":
            this.updateForce(data.params);
            break;
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  sendMovingElements() {
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
      }
    }
    this.send({action: "movingElements", params: elems});
  }

  sendPlayer() {
    this.send({action: "player", params: this.arrayPosition});
  }

  sendStaticElements() {
    this.send({action: "staticElements", params: this.staticElements});
  }

  updateForce(force) {
    this.entity.force = new V(force);
    this.broadcast(this.ws, JSON.stringify({action: "force", params: {arrayPosition: this.arrayPosition, force: force}}));
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }
}
