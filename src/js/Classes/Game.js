/**
 * Class for game logic
 * @author Pascal Luginbühl
 * @version none
 */
class Game {

  /** Creates game
   * @param {object} config - Config file
   */
  constructor(config) {
    this.config = config;

    // Map starting corner left bottom, render left top
    // IDEA: Chunks for more performence

    this.height = config.map.height;
    this.width = config.map.width;
    this.entitys = [];


    this.models = {};
    for (var name in this.config.models) {
      this.models[name] = new Model(this.config.models[name]);
    }


    this.addEntity(new Entity({
      positionX: 300,
      positionY: 70,

      model: this.models['duck'],
    }));

    this.addEntity(new Entity({
      positionX: 0,
      positionY: 0,

      model: this.models['house'],
    }));

    this.addEntity(new Entity({
      positionX: 700,
      positionY: 700,

      model: this.models['house'],
    }));


    // Timer for gameloop
    this.expectedInterval = window.performance.now() + this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval);
  }


  addEntity (entity) {
    this.entitys.push(entity);
  }

  // catch up loop
  gameLoop() {
    // special for communicator and input
    this.specialInput();

    let overtime = window.performance.now() - this.expectedInterval;

    if (overtime > this.config.gameLoopInterval) {
      this.overtimeError(overtime);
      this.expectedInterval = window.performance.now();
      // error, overtime longer then Interval, sync with server...
    }

    let delay = (overtime + this.config.gameLoopInterval) / 1000;
    // console.log(delay);

    // physics here
    for (let i = 0; i < this.entitys.length; i++) {
      let entity = this.entitys[i];
      if (!entity.model.static) {

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

          if (entity != entity2 && entity.model.solid && entity2.model.solid) {

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


    this.expectedInterval += this.config.gameLoopInterval;
    setTimeout(this.gameLoop.bind(this), this.config.gameLoopInterval - overtime);
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
