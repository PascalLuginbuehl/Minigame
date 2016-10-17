import Game from "./../../common/Classes/Game";
import Communicator from "./../../common/Classes/Communicator";
import Render from "./../../common/Classes/Render";
import Input from "./../../common/Classes/Input";

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
      w: 16,
      h: 16,
      spriteMax: 5,
    },
    'house': {
      texture: 'house.png',
      w: 254,
      h: 198,
      spriteMax: 1,
    },
    'duck': {
      texture: 'player.png',
      w: 16,
      h: 18,
      spriteMax: 4,
    },
  },

  models: {
    'dirt': {
      solid: true,
      static: false,
      hitbox: [{
        x: 0,
        y: 0,
        w: 16,
        h: 16,
      }],
    },
    'house': {
      solid: true,
      static: true,
      hitbox: [{
        x: 0,
        y: 0,
        w: 254,
        h: 198,
      }],
    },
    'duck': {
      solid: true,
      static: false,
      hitbox: [{
        x: 0,
        y: 0,
        w: 18,
        h: 18,
      }],
    }
  },
}


let game = new Game(CONFIG, function() {return window.performance.now()});
let communicator = new Communicator(game);
let input = new Input(game, communicator);

document.addEventListener('DOMContentLoaded', () => {
  let render = new Render(game, document.body, {
    renderHitbox: true
  }, input.player);
});
