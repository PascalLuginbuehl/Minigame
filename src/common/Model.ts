import V from "./Vector";
import Hitbox from "./Hitbox";

/** Class for model */
export default class Model {
  public hitbox: Hitbox;
  public texture: HTMLImageElement;
  public name: string;
  public textureSize: V;
  public texturePath: string;
  public spriteMax: number;
  public spriteHeight: number;
  public hasPattern: boolean;
  public pattern: CanvasPattern;

  /**
   * Constructor
   * @param  {Hitbox} hitbox  Hitbox of Model
   * @param  {string} texture Url of texture
   * @param  {string} name    name of the model
   * @param  {V}      textureSize Vector of size of the model
   * @param  {number} spriteMax maximum distance the sprite should go
   */
  constructor(hitbox: Hitbox, texturePath: string, name: string, textureSize: V, spriteMax: number = 1, hasPattern: boolean = false, spriteHeight = 1) {
    this.hitbox = hitbox;
    this.name = name;
    this.textureSize = textureSize;
    this.hasPattern = hasPattern;
    this.spriteHeight = spriteHeight;

    this.spriteMax = spriteMax;
    this.texturePath = texturePath;
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
