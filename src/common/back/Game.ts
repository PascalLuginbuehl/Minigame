import Model from "./Model";
import Entity from "./Entity";
/**
 * Class for game logic
 * @author Pascal Luginbühl
 * @version none
 */

// needs timerfunction as param... :D
export default class Game {
  models: Object;
  config: any;
  height: number;
  width: number;
  entitys: Array<Entity>
  expectedInterval: number;
  timeFunction: Function;
  /** Creates game
   * @param {object} config - Config file
   */
  constructor(config, timeFunction: Function) {
    this.config = config;

    // Map starting corner left bottom, render left top
    // IDEA: Chunks for more performence

    this.height = config.map.height;
    this.width = config.map.width;
    this.timeFunction = timeFunction;

    this.entitys = [];


    this.models = {};
    for (var name in this.config.models) {
      this.models[name] = new Model(this.config.models[name]);
    }


    // Timer for gameloop
    this.expectedInterval = this.timeFunction() + this.config.gameLoopInterval;
    setInterval(this.gameLoop.bind(this), this.config.gameLoopInterval, this.config.gameLoopInterval);
  }


  addEntity (entity) {
    this.entitys.push(entity);
  }

  // catch up loop
  gameLoop() {
    // special for communicator and input

    // let overtime = this.timeFunction() - this.expectedInterval;

    // console.log(overtime);
    // console.log(this.config.gameLoopInterval);
    // console.log(this.expectedInterval);

    // if (overtime > this.config.gameLoopInterval) {
    //   this.overtimeError(overtime);
    //   console.log("error");
    //   this.expectedInterval = this.timeFunction();
    //   // error, overtime longer then Interval, sync with server...
    // }
    //
    // let delay = (overtime + this.config.gameLoopInterval) / 1000;
    let delay = 16 / 1000;
    // console.log(delay);

    // physics here
    for (let i = 0; i < this.entitys.length; i++) {
      let entity = this.entitys[i];
      if (entity && !entity.model.static) {

        let acceleration = entity.force.scale(2000);
        // idk wahts betta
        // let friction = 0.08;
        let friction = 0.8;
        // entity.velocity = entity.velocity.add(acceleration.subtract(entity.velocity.scale(friction)));

        entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(.92);

        // console.log(entity.velocity);
        let position = entity.position.add(entity.velocity.scale(delay));
        // let rect = new Rectangle({min: entity.hitbox.min.add(entity.velocity.scale(delay)), max: entity.hitbox.max});
        // velocity += acceleration * time_step
        // position += velocity * time_step

        let collision = false;

        // collisions
        for (let o = 0; o < this.entitys.length; o++) {
          let entity2 = this.entitys[o];
          // check collision

          if (entity2 && entity != entity2 && entity.model.solid && entity2.model.solid) {

            // FIXME: do better physX
            // Collision detection
            if (entity.model.hitbox.checkCollision(position, entity2.position, entity2.model.hitbox)) {
              collision = true;
            }
          }
        }


        if (collision) {
          entity.velocity = entity.velocity.scale(.1);
        } else {
          entity.position = position;
        }
      }
    }


    // this.expectedInterval += this.config.gameLoopInterval;
    //
    // console.log(this.config.gameLoopInterval);
    // console.log(overtime);
    // console.log(this.config.gameLoopInterval - overtime);
    // setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval - overtime);
    
    this.specialInput();
  }

  overtimeError(overtime) {
    console.error("overtimeError: " + overtime);
  }

  specialInput() {

  }

  exportMap() {
    let returnValue = [];
    for (var i = 0; i < this.entitys.length; i++) {
      let entity = this.entitys[i];

      for (let model in this.models) {
        if (this.models[model] == entity.model) {
          returnValue.push({position: entity.position, velocity: entity.velocity, force: entity.force, model: model});
        }
      }
    }
    return returnValue;
  }
}
