import Body from "./Body";
import Model from "./Model";
import V from "./Vector";

export default class Block extends Body {
  constructor(position: V, model: Model) {
    super(position, model);
  }
}
