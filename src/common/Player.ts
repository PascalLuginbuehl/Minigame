/// <reference path="./../../typings/dat-gui.d.ts" />

let dat = require("./dat.gui.js");


import Entity from "./Entity";
import V from "./Vector";
import Input from "./Input"
import Render from "./Render"

interface keys {
  w: false,
  a: false,
  s: false,
  d: false,
}

/** Player for user input and much more */
export default class Player {
  public render: Render;
  public input: Input;
  private keys: keys;
  private playerIndex: number;

  /**
   * Constructor for player, initialises listeners
   * @param  {Input}  input Needs class input to send input to
   * @param  {number} index index of player entity
   */
  constructor(input: Input, index: number, render: Render) {
    this.input = input;
    this.playerIndex = index;
    this.render = render;

    var text = {
      message: "LOL",
      lol: input.game.models["dirt"].textureSize.x,
      paint: () => {
        this.render.paintBlocks();
      }
    }
    var gui: dat.GUI = new dat.GUI();
    gui.add(text, 'message')
    gui.add(text, 'paint')
    gui.add(text, 'lol', 0, 500).onChange(function(value) {
      input.game.models["dirt"].textureSize.x = value;
    });

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
