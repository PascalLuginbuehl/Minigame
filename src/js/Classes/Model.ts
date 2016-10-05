import Hitbox from "./Hitbox";

class Model {
  solid: boolean;
  static: boolean;
  hitbox: Hitbox;
  spriteMax: number;
  texture: any;
  textureSize: any;

  constructor({solid: solid = true, static: staticElem = false, hitbox: hitbox}) {
    // this.hitbox = [new Rectangle({x: 0, y: 0, w: 10, h: 10})];


    // comes to renderengine
    // IDEA: Also able to set via reference to type
    // this.texture = texture;
    // this.textureSize = new V(10, 10);

    // FIXME: Fix inputs from config
    // parameters
    this.solid = solid;
    this.static = staticElem;

    this.hitbox = new Hitbox(hitbox);
  }
}

export default Model;
