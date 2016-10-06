import Game from "./Game";
import V from "./Vector";
/**
 * Errorhandling for Client Server has its own...
 * Websocket here
 *
 */
class Communicator {
  websocket: WebSocket;
  game: Game

  constructor(game) {
    this.websocket = new WebSocket('ws://localhost');

    this.websocket.onopen = () => {
      this.websocket.send('Ping');
    };

    // Log errors
    this.websocket.onerror = (error) => {
      console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    this.websocket.onmessage = (e) => {
      // console.log(e.data);
      try {
        let data = JSON.parse(e.data);
        switch (data.action) {
          case "updateMovement":
            this.updateMovement(data.params);
            break;
          case "loadStaticElements":
            this.loadStaticElements(data.params);
            break;
          case "loadMovingElements":
            this.loadMovingElements(data.params);
            break;
          }
      } catch (e) {
        console.error(e);
      }


    };



    this.game = game;
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
  updateMovement({arrayPosition: arrayPosition, force: force}) {
    this.game.entitys[arrayPosition].force = new V(force);
    // console.log(this.game.entitys[arrayPosition]);
  }

  /**
   * Initialises static Elements which cant move
   * @param
   */
  loadStaticElements(param) {

  }


  loadMovingElements(param) {

  }

  loadMap() {

  }



  sendInput(v) {
    this.websocket.send(JSON.stringify(v));
  }
}

export default Communicator;
