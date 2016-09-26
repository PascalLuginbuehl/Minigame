class Entity {
  constructor({positionX = 0, positionY = 0, texture = 0, solid = false, static: staticElem = false, model: model}) {
    // position
    // left top of hitbox
    this.position = new V(positionX, positionY);

    // velocity for movement
    this.velocity = new V(0, 0);

    // pulls into Direction
    this.force = new V(0, 0);

    // IDEA: z-index

    // Textures and rest is safed in here
    this.model = model;
  }
}
