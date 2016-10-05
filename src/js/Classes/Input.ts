import Game from "./Game";
import Communicator from "./Communicator";
import Entity from "./Entity";
import V from "./Vector";
/**
 * Input for user inputs.
 * Communicator for communicating to WebSocket
 */
class Input {
  game: Game
  communicator: Communicator;
  player: Entity;
  keys: any;

  constructor(game, communicator) {
    this.game = game;
    this.communicator = communicator;

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
      // let v = new V(0, 0);
      // if (keys.w) {
      //   v.y-- ;
      // }
      // if (keys.a) {
      //   v.x--;
      // }
      // if (keys.s) {
      //   v.y++;
      // }
      // if (keys.d) {
      //   v.x++;
      // }
      // player.force = v;
    }

    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = true;
        this.player.force = this.direction();

        this.communicator.sendInput({action: "updateMovement",  params: {arrayPosition: 3, force: this.direction()}});
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = false;
        this.player.force = this.direction();

        this.communicator.sendInput({action: "updateMovement",  params: {arrayPosition: 3, force: this.direction()}});
        e.preventDefault();
      }
    });
  }

  direction() {
    let v = new V(0, 0);
    if (this.keys.w) {
      v.y-- ;
    }
    if (this.keys.a) {
      v.x--;
    }
    if (this.keys.s) {
      v.y++;
    }
    if (this.keys.d) {
      v.x++;
    }
    return v;
  }
}
export default Input;
