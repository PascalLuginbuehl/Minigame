import Game from "./Game";
import V from "./Vector";
import Entity from "./Entity";
/**
 * Errorhandling for Client Server has its own...
 * Websocket here
 *
 */
class Communicator {
  websocket: WebSocket;
  game: Game;
  player: Entity;
  arrayPosition: number;

  constructor(game) {
    this.game = game;
    this.websocket = new WebSocket('ws://192.168.1.112:8080');

    this.player = new Entity(
      new V(300, 300),
      game.models['duck'],
    );

    this.websocket.onopen = () => {

    };


    // Log errors
    this.websocket.onerror = (error) => {
      console.log('WebSocket Error ' + error);
    };

    setInterval(() => {
      this.websocket.send(JSON.stringify({action: "movingElements"}))
    }, this.game.config.gameLoopInterval * 2);
    // Log messages from the server
    this.websocket.onmessage = (e) => {
      // console.log(e.data);
      try {
        let data = JSON.parse(e.data);
        switch (data.action) {
          case "staticElements":
            this.updateStaticElements(data.params);
            break;
          case "movingElements":
            this.updateMovingElements(data.params);
            break;
          case "force":
            this.updateForce(data.params);
            break;
          case "player":
            this.createPlayer(data.params);
            break;
        }
      } catch (e) {
        console.error(e);
      }
    };

    this.websocket.onopen = () => {
      this.websocket.send('{"action": "staticElements"}');
    };

    // game.__proto__.overtimeError = (overtime) => {
    //   // console.log(overtime);
    //   // console.log(this);
    //   this.expectedInterval = window.performance.now();
    //   // this.loadMap();
    // };
  }

  /**
   * sets force to force on arrayPosition
   * @param {number} arrayPosition - position in Array
   * @param {vector} force - new Force value
   */
  updateForce({arrayPosition: arrayPosition, force: force}) {
    // console.log(this.game.entitys);
    this.game.entitys[arrayPosition].force = new V(force);
    // console.log(this.game.entitys[arrayPosition]);
  }

  /**
   * Initialises static Elements which cant move
   * @param
   */


  getMovingElements() {

  }

  updateMovingElements(data) {
    for (let i = 0; i < data.length; i++) {
      let entity = data[i];
      if (entity) {
        this.game.entitys[i] = new Entity(
          entity.position,
          this.game.models[entity.model],
          new V(entity.velocity),
          new V(entity.force),
        );
      }
    }
    this.player = this.game.entitys[this.arrayPosition];
  }

  createPlayer(params) {
    this.arrayPosition = params;
    this.player = this.game.entitys[params];
  }

  updateStaticElements(data) {
    for (let i = 0; i < data.length; i++) {
      let entity = data[i];
      if (entity) {
        this.game.entitys[i] = new Entity(
          entity.position,
          this.game.models[entity.model]
        );
      }
    }
  }


  sendInput(v) {
    this.websocket.send(JSON.stringify(v));
  }
}

export default Communicator;
