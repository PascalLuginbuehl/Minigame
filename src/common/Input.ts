import V from "./Vector";
import Game from "./Game";
import Render from "./Render";

export default class Input {
  public game: Game;

  /**
   * Constructor, basic initialisations
   * @param  {Game}   game Game
   */
  constructor(game: Game) {
    this.game = game;
  }

  /**
   * sets force of entity to vetor at provided index
   * @param {number} index index of entity
   * @param {V}      force new force of entity
   */
  public setForce(index: number, force: V): void {
    this.game.map.entitys[index].force = force;
  }

  /**
   * updates Entity positon localy
   * @param {number} index    index of entity
   * @param {V}      force    new force of entity
   * @param {V}      velocity new velocity of entity
   * @param {V}      position new position of entity
   */
  public updateEntity(index: number, force: V, velocity: V, position: V): void {
    this.game.map.entitys[index].force = force;
    this.game.map.entitys[index].position = position;
    this.game.map.entitys[index].velocity = velocity;
  }
}
