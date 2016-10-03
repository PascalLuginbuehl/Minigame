/**
 * Errorhandling for Client Server has its own...
 * Websocket here
 *
 */
class Communicator {
  constructor(game) {
    this.websocket = new WebSocket('ws://10.71.58.81');

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
      this.updateForce(0, JSON.parse(e.data));
    };



    this.game = game;
    game.__proto__.overtimeError = (overtime) => {
      // console.log(overtime);
      // console.log(this);
      this.expectedInterval = window.performance.now();
      // this.loadMap();
    };
  }

  updateForce(arrayPosition, force) {
    this.game.entitys[arrayPosition].force = new V(force.x, force.y);
    // console.log(this.game.entitys[arrayPosition]);
  }

  loadMap() {

  }

  sendInput(v) {
    this.websocket.send(JSON.stringify(v));
  }
}
