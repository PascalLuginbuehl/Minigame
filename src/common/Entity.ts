import Body from "./Body";
import V from "./Vector";
import Model from "./Model";

export default class Entity extends Body {
  public velocity: V;
  public force: V;

  constructor(position: V, model: Model, force: V = new V(0, 0), velocity: V = new V(0, 0)) {
    super(position, model);

    this.velocity = velocity;
    this.force = force;
  }
}
