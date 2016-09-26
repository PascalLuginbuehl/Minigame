'use strict'
// IDEA: Circle collision
// IDEA: z-index
// IDEA: collision side
// IDEA: Pathfinding
// IDEA: sprites
// IDEA: Players controller
// IDEA: collsion speedup (AABB detection with outer part
// FIXME: Outer colisionbox

const CONFIG = {
  gameLoopInterval: 16,

  map: {
    height: 1000,
    width: 1000,
  },

  textureBasepath: 'assets/images/',
  textures: {
    'dirt': {
      texture: 'dirt.png',
      size: {
        x: 10,
        y: 10,
      }
    },
    'house': {
      texture: 'house.png',
      size: {
        x: 64,
        y: 50,
      }
    },
  },

  models: {
    'dirt': {
      solid: true,
      static: false,
      hitbox: [{
        x: 0,
        y: 0,
        w: 10,
        h: 10,
      },{
        x: 10,
        y: 10,
        w: 10,
        h: 10,
      }],
    },
    'house': {
      solid: true,
      static: true,
      hitbox: [{
        x: 0,
        y: 0,
        w: 48,
        h: 48,
      },{
        x: 49,
        y: 8,
        w: 15,
        h: 32,
      },{
        x: 16,
        y: 48,
        w: 4,
        h: 2,
      },{
        x: 28,
        y: 48,
        w: 4,
        h: 2,
      }],
    }
  },
}


let game = new Game(CONFIG);
let input = new Input(game);
let communicator = new Communicator(game, input);

document.addEventListener('DOMContentLoaded', () => {
  let render = new Render(game, document.body, {
    renderHitbox: true
  });
});
