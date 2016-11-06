import Body from "./Body";
import Model from "./Model";
import V from "./Vector";

export default class Block extends Body {
  public collision: boolean;
  constructor(position: V, model: Model, collision: boolean = true) {
    super(position, model);
    this.collision = collision;
  }
}
