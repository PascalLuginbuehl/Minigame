import Entity from "./Entity";
import V from "./Vector";
import Input from "./Input"

interface keys {
  w: false,
  a: false,
  s: false,
  d: false,
}

/** Player for user input and much more */
export default class Player {
  public input: Input;
  private keys: keys;

  /**
   * Constructor for player, initialises listeners
   * @param  {Input}  input Needs class input to send input to
   * @param  {number} index index of player entity
   */
  constructor(input: Input, index: number) {
    this.input = input;
    let date: number = Date.now();

    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = true;

        this.input.setForce(index, this.getDirection(this.keys));

        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = false;

        this.input.setForce(index, this.getDirection(this.keys));

        e.preventDefault();
      }
    });
  }

  /**
   * gets direction from pressed keys
   * @param  {keys} keys Object of pressed keys
   * @return {V}         Vector of direction keys ar going
   */
  private getDirection(keys: keys): V {
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
