import V from "./Vector";
import Hitbox from "./Hitbox";

/** Class for model */
export default class Model {
  public hitbox: Hitbox;
  public texture: HTMLImageElement;

  /**
 * Constructor
   * @param  {Hitbox} hitbox  Hitbox of Model
   * @param  {string} texture Url of texture
   */
  constructor(hitbox: Hitbox, texture: string) {
    this.hitbox = hitbox;
    this.texture = new Image();
    this.texture.src = texture;
  }

  /**
   * Checks for collsions between two Bodys
   * @param  {Body}   the other body which colsion has to get checked
   * @return {boolean}      returns a boolean if collsion occured
   */
  public checkCollision(origin: V, originHitbox: V, model: Model): boolean {
    return this.hitbox.checkCollision(origin, originHitbox, model.hitbox);
  }
}
