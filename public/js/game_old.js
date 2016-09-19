// var CONFIG = {
//   map: {
//     mapWidth: 20,
//     mapHeight: 15,
//     blockSize: 16,
//     blocks: [
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//       1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
//     ],
//   },
//
//   textures: {
//     baseUrl: "assets/images/",
//     dirt: "dirt.png",
//     air: "air.png",
//   },
// }
//
//
// var Context = function(elemet) {
//   this.canvas = elemet;
//   this.context = this.canvas.getContext('2d');
//
//   /*this.canvas.addEventListener('mousemove', function(evt) {
//     var mousePos = this.getMousePos(evt);
//     console.log(mousePos);
//   }.bind(this));*/
//
//   this.getMousePos = function (evt) {
//     var rect = this.canvas.getBoundingClientRect();
//     return {
//       x: Math.floor((evt.clientX-rect.left)/(rect.right-rect.left)*this.canvas.width),
//       y: Math.floor((evt.clientY-rect.top)/(rect.bottom-rect.top)*this.canvas.height)
//     };
//   };
// }
//
//
//
// window.onload = function() {
//   Game = new Game(CONFIG);
// }
//
//
//
// var Game = function(config) {
//
//   //Set blocks
//   this.convertMap = function(config){
//     if(config.mapHeight * config.mapWidth == config.blocks.length){
//
//       var returnvalue = [];
//
//       for (var i = 0; i < config.blocks.length; i++) {
//         var positionX = (i - (i - (i % config.mapWidth))) * config.blockSize;
//         var positionY = ((i - (i % config.mapWidth)) / config.mapWidth) * config.blockSize;
//         switch (config.blocks[i]) {
//           case 0:
//             returnvalue.push(new this.entity(positionX, positionY, config.blockSize, config.blockSize, true, false, "air"));
//             break;
//           case 1:
//             returnvalue.push(new this.entity(positionX, positionY, config.blockSize, config.blockSize, true, true, "dirt"));
//             break;
//         }
//       }
//       return returnvalue;
//     }
//   }
//
//   //New mob
//   this.mob = function(inside, posX, posY, height, width, collision, texture, gravity) {
//     this.entity = new inside.entity(posX, posY, height, width, false, collision, texture, gravity);
//     inside.map.entitys.push(this.entity);
//     inside.map.mobs.push(this);
//     this.direction = {left: false, right: false};
//   }
//
//   //New entity
//   this.entity = function(posX, posY, height, width, static, collision, texture, gravity) {
//     this.positionX = posX != undefined ? posX : 0;
//     this.positionY = posY != undefined ? posY : 0;
//
//     this.height = height != undefined ? height : 0;
//     this.width = width != undefined ? width : 0;
//
//     this.static = static != undefined ? static : false;
//
//     this.collision = collision != undefined ? collision : true;
//
//     this.texture = texture != undefined ? texture : "air";
//
//     this.gravity = gravity != undefined ? gravity : 1;
//
//     this.velocity = 0;
//
//     this.collisionDetection = function(entitys, newX, newY) {
//       var collision = false;
//
//       newX = newX != undefined ? newX : 0;
//       newY = newY != undefined ? newY : 0;
//
//       var local = this;
//       var localX = local.positionX + newX;
//       var localBoxX = local.positionX + local.width + newX;
//       var localY = local.positionY  + newY;
//       var localBoxY = local.positionY + local.height + newY;
//
//       if(local.collision){
//         for (var i = 0; i < entitys.length; i++) {
//           var entity = entitys[i];
//           if(entity.collision){
//             if(entity != local){
//               var entityX = entity.positionX;
//               var entityBoxX = entity.positionX + entity.width;
//               var entityY = entity.positionY;
//               var entityBoxY = entity.positionY + entity.height;
//
//               if(localBoxX > entityX && localX < entityBoxX && entityBoxY > localY && entityY < localBoxY){
//                 return true;
//               }
//             }
//           }
//         }
//       }
//       return collision;
//     }
//   }
//
//   //Init map
//   this.map = function(mapWidth, mapHeight, blockSize, entitys, mobs) {
//     this.entitys = entitys != undefined ? entitys : [];
//     this.mapWidth = mapWidth != undefined ? mapWidth : 0;
//     this.mapHeight = mapHeight != undefined ? mapHeight : 0;
//     this.blockSize = blockSize != undefined ? blockSize : 0;
//     this.mobs = mobs != undefined ? mobs : [];
//   }
//
//   //create new textures
//   this.texture = function(src){
//     this.image = new Image();
//     this.image.src = src;
//   }
//
//   //Render
//   this.render = function() {
//     for (var i = 0; i < this.map.entitys.length; i++) {
//       var entity = this.map.entitys[i]
//       var image = this.textures[entity.texture];
//       this.canvas.context.drawImage(image, entity.positionX, entity.positionY, entity.height, entity.width);
//     }
//   }
//
//   //Physics
//   this.physics = function(){
//     for (var i = 0; i < this.map.entitys.length; i++) {
//       var entity = this.map.entitys[i];
//       if(!entity.static){
//         if(entity.collision){
//           var newPositionY = Math.round(0.01 * entity.velocity * 100 * 10) / 10;
//           if(!entity.collisionDetection(this.map.entitys, 0, newPositionY)){
//             entity.positionY = entity.positionY + newPositionY;
//             entity.velocity = entity.velocity < 1 ? Math.round((entity.velocity + 0.01 * entity.gravity)*100)/100 : entity.velocity;
//           } else {
//             entity.velocity = 0;
//           }
//         }
//       }
//     }
//
//     //Movement of mobs
//     for (var i = 0; i < this.map.mobs.length; i++) {
//       var mob = this.map.mobs[i];
//       if(mob.direction.left){
//         if(!mob.entity.collisionDetection(this.map.entitys, -1, 0)){
//           mob.entity.positionX += 0.5;
//         }
//       }
//       if(mob.direction.right){
//         if(!mob.entity.collisionDetection(this.map.entitys, 1, 0)){
//           mob.entity.positionX += 0.5;
//         }
//       }
//     }
//   }
//
//   this.renderInterval = setInterval(function() {
//     this.render();
//   }.bind(this), 1000/30);
//
//   this.physicsInterval = setInterval(function() {
//     this.physics();
//   }.bind(this), 7);
//   //Configuring things...
//   this.map = new this.map(config.map.mapWidth, config.map.mapHeight, undefined, this.convertMap(config.map));
//
//   this.textures = {};
//   for (var i in config.textures) {
//     if (config.textures.hasOwnProperty(i) && i != 'baseUrl') {
//       this.textures[i] = new this.texture(config.textures['baseUrl'] + config.textures[i]).image;
//     }
//   }
//
//   //Drawingspace for canvas
//   this.canvas = new Context(document.getElementById('canvas'));
//
//   this.canvas.canvas.width = config.map.mapWidth*config.map.blockSize;
//   this.canvas.canvas.height = config.map.mapHeight*config.map.blockSize;
// }
//
// /*
// var player = {gravity: -1, velocity: 1, position: 0}
// var interval = setInterval(function(){
//   document.getElementById('test').style.marginTop = player.position*1000 + "px";
//   player.position = player.position + 0.010 * player.velocity;
//   player.velocity = player.velocity + 0.010 * player.gravity;
//   console.log(player.position);
// }, 10);
// */
