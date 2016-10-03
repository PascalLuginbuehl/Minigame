
/**
 * Input for user inputs.
 * Communicator for communicating to WebSocket
 */
class Input {
  constructor(game) {
    this.game = game;

    this.player = new Entity({
      positionX: 300,
      positionY: 300,

      model: this.game.models['duck'],
    });

    this.game.addEntity(this.player);
    console.log(this.player);
    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      ArrowUp: false,
      ArrowLeft: false,
      ArrowDown: false,
      ArrowRigth: false,
    }


    let keys = this.keys;
    let player = this.player
    game.__proto__.specialInput = function() {
      let v = new V(0, 0);
      if (keys.w) {
        v.y-- ;
      }
      if (keys.a) {
        v.x--;
      }
      if (keys.s) {
        v.y++;
      }
      if (keys.d) {
        v.x++;
      }
      player.force = v;
    }

    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = true;
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = false;
        e.preventDefault();
      }
    });
  }
}
