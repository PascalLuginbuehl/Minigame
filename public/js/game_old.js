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
"use strict";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWVfb2xkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJmaWxlIjoiZ2FtZV9vbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB2YXIgQ09ORklHID0ge1xuLy8gICBtYXA6IHtcbi8vICAgICBtYXBXaWR0aDogMjAsXG4vLyAgICAgbWFwSGVpZ2h0OiAxNSxcbi8vICAgICBibG9ja1NpemU6IDE2LFxuLy8gICAgIGJsb2NrczogW1xuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLFxuLy8gICAgICAgMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLFxuLy8gICAgIF0sXG4vLyAgIH0sXG4vL1xuLy8gICB0ZXh0dXJlczoge1xuLy8gICAgIGJhc2VVcmw6IFwiYXNzZXRzL2ltYWdlcy9cIixcbi8vICAgICBkaXJ0OiBcImRpcnQucG5nXCIsXG4vLyAgICAgYWlyOiBcImFpci5wbmdcIixcbi8vICAgfSxcbi8vIH1cbi8vXG4vL1xuLy8gdmFyIENvbnRleHQgPSBmdW5jdGlvbihlbGVtZXQpIHtcbi8vICAgdGhpcy5jYW52YXMgPSBlbGVtZXQ7XG4vLyAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4vL1xuLy8gICAvKnRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGV2dCkge1xuLy8gICAgIHZhciBtb3VzZVBvcyA9IHRoaXMuZ2V0TW91c2VQb3MoZXZ0KTtcbi8vICAgICBjb25zb2xlLmxvZyhtb3VzZVBvcyk7XG4vLyAgIH0uYmluZCh0aGlzKSk7Ki9cbi8vXG4vLyAgIHRoaXMuZ2V0TW91c2VQb3MgPSBmdW5jdGlvbiAoZXZ0KSB7XG4vLyAgICAgdmFyIHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbi8vICAgICByZXR1cm4ge1xuLy8gICAgICAgeDogTWF0aC5mbG9vcigoZXZ0LmNsaWVudFgtcmVjdC5sZWZ0KS8ocmVjdC5yaWdodC1yZWN0LmxlZnQpKnRoaXMuY2FudmFzLndpZHRoKSxcbi8vICAgICAgIHk6IE1hdGguZmxvb3IoKGV2dC5jbGllbnRZLXJlY3QudG9wKS8ocmVjdC5ib3R0b20tcmVjdC50b3ApKnRoaXMuY2FudmFzLmhlaWdodClcbi8vICAgICB9O1xuLy8gICB9O1xuLy8gfVxuLy9cbi8vXG4vL1xuLy8gd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuLy8gICBHYW1lID0gbmV3IEdhbWUoQ09ORklHKTtcbi8vIH1cbi8vXG4vL1xuLy9cbi8vIHZhciBHYW1lID0gZnVuY3Rpb24oY29uZmlnKSB7XG4vL1xuLy8gICAvL1NldCBibG9ja3Ncbi8vICAgdGhpcy5jb252ZXJ0TWFwID0gZnVuY3Rpb24oY29uZmlnKXtcbi8vICAgICBpZihjb25maWcubWFwSGVpZ2h0ICogY29uZmlnLm1hcFdpZHRoID09IGNvbmZpZy5ibG9ja3MubGVuZ3RoKXtcbi8vXG4vLyAgICAgICB2YXIgcmV0dXJudmFsdWUgPSBbXTtcbi8vXG4vLyAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbmZpZy5ibG9ja3MubGVuZ3RoOyBpKyspIHtcbi8vICAgICAgICAgdmFyIHBvc2l0aW9uWCA9IChpIC0gKGkgLSAoaSAlIGNvbmZpZy5tYXBXaWR0aCkpKSAqIGNvbmZpZy5ibG9ja1NpemU7XG4vLyAgICAgICAgIHZhciBwb3NpdGlvblkgPSAoKGkgLSAoaSAlIGNvbmZpZy5tYXBXaWR0aCkpIC8gY29uZmlnLm1hcFdpZHRoKSAqIGNvbmZpZy5ibG9ja1NpemU7XG4vLyAgICAgICAgIHN3aXRjaCAoY29uZmlnLmJsb2Nrc1tpXSkge1xuLy8gICAgICAgICAgIGNhc2UgMDpcbi8vICAgICAgICAgICAgIHJldHVybnZhbHVlLnB1c2gobmV3IHRoaXMuZW50aXR5KHBvc2l0aW9uWCwgcG9zaXRpb25ZLCBjb25maWcuYmxvY2tTaXplLCBjb25maWcuYmxvY2tTaXplLCB0cnVlLCBmYWxzZSwgXCJhaXJcIikpO1xuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgICAgY2FzZSAxOlxuLy8gICAgICAgICAgICAgcmV0dXJudmFsdWUucHVzaChuZXcgdGhpcy5lbnRpdHkocG9zaXRpb25YLCBwb3NpdGlvblksIGNvbmZpZy5ibG9ja1NpemUsIGNvbmZpZy5ibG9ja1NpemUsIHRydWUsIHRydWUsIFwiZGlydFwiKSk7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgICAgcmV0dXJuIHJldHVybnZhbHVlO1xuLy8gICAgIH1cbi8vICAgfVxuLy9cbi8vICAgLy9OZXcgbW9iXG4vLyAgIHRoaXMubW9iID0gZnVuY3Rpb24oaW5zaWRlLCBwb3NYLCBwb3NZLCBoZWlnaHQsIHdpZHRoLCBjb2xsaXNpb24sIHRleHR1cmUsIGdyYXZpdHkpIHtcbi8vICAgICB0aGlzLmVudGl0eSA9IG5ldyBpbnNpZGUuZW50aXR5KHBvc1gsIHBvc1ksIGhlaWdodCwgd2lkdGgsIGZhbHNlLCBjb2xsaXNpb24sIHRleHR1cmUsIGdyYXZpdHkpO1xuLy8gICAgIGluc2lkZS5tYXAuZW50aXR5cy5wdXNoKHRoaXMuZW50aXR5KTtcbi8vICAgICBpbnNpZGUubWFwLm1vYnMucHVzaCh0aGlzKTtcbi8vICAgICB0aGlzLmRpcmVjdGlvbiA9IHtsZWZ0OiBmYWxzZSwgcmlnaHQ6IGZhbHNlfTtcbi8vICAgfVxuLy9cbi8vICAgLy9OZXcgZW50aXR5XG4vLyAgIHRoaXMuZW50aXR5ID0gZnVuY3Rpb24ocG9zWCwgcG9zWSwgaGVpZ2h0LCB3aWR0aCwgc3RhdGljLCBjb2xsaXNpb24sIHRleHR1cmUsIGdyYXZpdHkpIHtcbi8vICAgICB0aGlzLnBvc2l0aW9uWCA9IHBvc1ggIT0gdW5kZWZpbmVkID8gcG9zWCA6IDA7XG4vLyAgICAgdGhpcy5wb3NpdGlvblkgPSBwb3NZICE9IHVuZGVmaW5lZCA/IHBvc1kgOiAwO1xuLy9cbi8vICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCAhPSB1bmRlZmluZWQgPyBoZWlnaHQgOiAwO1xuLy8gICAgIHRoaXMud2lkdGggPSB3aWR0aCAhPSB1bmRlZmluZWQgPyB3aWR0aCA6IDA7XG4vL1xuLy8gICAgIHRoaXMuc3RhdGljID0gc3RhdGljICE9IHVuZGVmaW5lZCA/IHN0YXRpYyA6IGZhbHNlO1xuLy9cbi8vICAgICB0aGlzLmNvbGxpc2lvbiA9IGNvbGxpc2lvbiAhPSB1bmRlZmluZWQgPyBjb2xsaXNpb24gOiB0cnVlO1xuLy9cbi8vICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlICE9IHVuZGVmaW5lZCA/IHRleHR1cmUgOiBcImFpclwiO1xuLy9cbi8vICAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5ICE9IHVuZGVmaW5lZCA/IGdyYXZpdHkgOiAxO1xuLy9cbi8vICAgICB0aGlzLnZlbG9jaXR5ID0gMDtcbi8vXG4vLyAgICAgdGhpcy5jb2xsaXNpb25EZXRlY3Rpb24gPSBmdW5jdGlvbihlbnRpdHlzLCBuZXdYLCBuZXdZKSB7XG4vLyAgICAgICB2YXIgY29sbGlzaW9uID0gZmFsc2U7XG4vL1xuLy8gICAgICAgbmV3WCA9IG5ld1ggIT0gdW5kZWZpbmVkID8gbmV3WCA6IDA7XG4vLyAgICAgICBuZXdZID0gbmV3WSAhPSB1bmRlZmluZWQgPyBuZXdZIDogMDtcbi8vXG4vLyAgICAgICB2YXIgbG9jYWwgPSB0aGlzO1xuLy8gICAgICAgdmFyIGxvY2FsWCA9IGxvY2FsLnBvc2l0aW9uWCArIG5ld1g7XG4vLyAgICAgICB2YXIgbG9jYWxCb3hYID0gbG9jYWwucG9zaXRpb25YICsgbG9jYWwud2lkdGggKyBuZXdYO1xuLy8gICAgICAgdmFyIGxvY2FsWSA9IGxvY2FsLnBvc2l0aW9uWSAgKyBuZXdZO1xuLy8gICAgICAgdmFyIGxvY2FsQm94WSA9IGxvY2FsLnBvc2l0aW9uWSArIGxvY2FsLmhlaWdodCArIG5ld1k7XG4vL1xuLy8gICAgICAgaWYobG9jYWwuY29sbGlzaW9uKXtcbi8vICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRpdHlzLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgICAgdmFyIGVudGl0eSA9IGVudGl0eXNbaV07XG4vLyAgICAgICAgICAgaWYoZW50aXR5LmNvbGxpc2lvbil7XG4vLyAgICAgICAgICAgICBpZihlbnRpdHkgIT0gbG9jYWwpe1xuLy8gICAgICAgICAgICAgICB2YXIgZW50aXR5WCA9IGVudGl0eS5wb3NpdGlvblg7XG4vLyAgICAgICAgICAgICAgIHZhciBlbnRpdHlCb3hYID0gZW50aXR5LnBvc2l0aW9uWCArIGVudGl0eS53aWR0aDtcbi8vICAgICAgICAgICAgICAgdmFyIGVudGl0eVkgPSBlbnRpdHkucG9zaXRpb25ZO1xuLy8gICAgICAgICAgICAgICB2YXIgZW50aXR5Qm94WSA9IGVudGl0eS5wb3NpdGlvblkgKyBlbnRpdHkuaGVpZ2h0O1xuLy9cbi8vICAgICAgICAgICAgICAgaWYobG9jYWxCb3hYID4gZW50aXR5WCAmJiBsb2NhbFggPCBlbnRpdHlCb3hYICYmIGVudGl0eUJveFkgPiBsb2NhbFkgJiYgZW50aXR5WSA8IGxvY2FsQm94WSl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICAgIHJldHVybiBjb2xsaXNpb247XG4vLyAgICAgfVxuLy8gICB9XG4vL1xuLy8gICAvL0luaXQgbWFwXG4vLyAgIHRoaXMubWFwID0gZnVuY3Rpb24obWFwV2lkdGgsIG1hcEhlaWdodCwgYmxvY2tTaXplLCBlbnRpdHlzLCBtb2JzKSB7XG4vLyAgICAgdGhpcy5lbnRpdHlzID0gZW50aXR5cyAhPSB1bmRlZmluZWQgPyBlbnRpdHlzIDogW107XG4vLyAgICAgdGhpcy5tYXBXaWR0aCA9IG1hcFdpZHRoICE9IHVuZGVmaW5lZCA/IG1hcFdpZHRoIDogMDtcbi8vICAgICB0aGlzLm1hcEhlaWdodCA9IG1hcEhlaWdodCAhPSB1bmRlZmluZWQgPyBtYXBIZWlnaHQgOiAwO1xuLy8gICAgIHRoaXMuYmxvY2tTaXplID0gYmxvY2tTaXplICE9IHVuZGVmaW5lZCA/IGJsb2NrU2l6ZSA6IDA7XG4vLyAgICAgdGhpcy5tb2JzID0gbW9icyAhPSB1bmRlZmluZWQgPyBtb2JzIDogW107XG4vLyAgIH1cbi8vXG4vLyAgIC8vY3JlYXRlIG5ldyB0ZXh0dXJlc1xuLy8gICB0aGlzLnRleHR1cmUgPSBmdW5jdGlvbihzcmMpe1xuLy8gICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbi8vICAgICB0aGlzLmltYWdlLnNyYyA9IHNyYztcbi8vICAgfVxuLy9cbi8vICAgLy9SZW5kZXJcbi8vICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpIHtcbi8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWFwLmVudGl0eXMubGVuZ3RoOyBpKyspIHtcbi8vICAgICAgIHZhciBlbnRpdHkgPSB0aGlzLm1hcC5lbnRpdHlzW2ldXG4vLyAgICAgICB2YXIgaW1hZ2UgPSB0aGlzLnRleHR1cmVzW2VudGl0eS50ZXh0dXJlXTtcbi8vICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCBlbnRpdHkucG9zaXRpb25YLCBlbnRpdHkucG9zaXRpb25ZLCBlbnRpdHkuaGVpZ2h0LCBlbnRpdHkud2lkdGgpO1xuLy8gICAgIH1cbi8vICAgfVxuLy9cbi8vICAgLy9QaHlzaWNzXG4vLyAgIHRoaXMucGh5c2ljcyA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1hcC5lbnRpdHlzLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgICB2YXIgZW50aXR5ID0gdGhpcy5tYXAuZW50aXR5c1tpXTtcbi8vICAgICAgIGlmKCFlbnRpdHkuc3RhdGljKXtcbi8vICAgICAgICAgaWYoZW50aXR5LmNvbGxpc2lvbil7XG4vLyAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uWSA9IE1hdGgucm91bmQoMC4wMSAqIGVudGl0eS52ZWxvY2l0eSAqIDEwMCAqIDEwKSAvIDEwO1xuLy8gICAgICAgICAgIGlmKCFlbnRpdHkuY29sbGlzaW9uRGV0ZWN0aW9uKHRoaXMubWFwLmVudGl0eXMsIDAsIG5ld1Bvc2l0aW9uWSkpe1xuLy8gICAgICAgICAgICAgZW50aXR5LnBvc2l0aW9uWSA9IGVudGl0eS5wb3NpdGlvblkgKyBuZXdQb3NpdGlvblk7XG4vLyAgICAgICAgICAgICBlbnRpdHkudmVsb2NpdHkgPSBlbnRpdHkudmVsb2NpdHkgPCAxID8gTWF0aC5yb3VuZCgoZW50aXR5LnZlbG9jaXR5ICsgMC4wMSAqIGVudGl0eS5ncmF2aXR5KSoxMDApLzEwMCA6IGVudGl0eS52ZWxvY2l0eTtcbi8vICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgZW50aXR5LnZlbG9jaXR5ID0gMDtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIC8vTW92ZW1lbnQgb2YgbW9ic1xuLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXAubW9icy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgdmFyIG1vYiA9IHRoaXMubWFwLm1vYnNbaV07XG4vLyAgICAgICBpZihtb2IuZGlyZWN0aW9uLmxlZnQpe1xuLy8gICAgICAgICBpZighbW9iLmVudGl0eS5jb2xsaXNpb25EZXRlY3Rpb24odGhpcy5tYXAuZW50aXR5cywgLTEsIDApKXtcbi8vICAgICAgICAgICBtb2IuZW50aXR5LnBvc2l0aW9uWCArPSAwLjU7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICAgIGlmKG1vYi5kaXJlY3Rpb24ucmlnaHQpe1xuLy8gICAgICAgICBpZighbW9iLmVudGl0eS5jb2xsaXNpb25EZXRlY3Rpb24odGhpcy5tYXAuZW50aXR5cywgMSwgMCkpe1xuLy8gICAgICAgICAgIG1vYi5lbnRpdHkucG9zaXRpb25YICs9IDAuNTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfVxuLy9cbi8vICAgdGhpcy5yZW5kZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuLy8gICAgIHRoaXMucmVuZGVyKCk7XG4vLyAgIH0uYmluZCh0aGlzKSwgMTAwMC8zMCk7XG4vL1xuLy8gICB0aGlzLnBoeXNpY3NJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuLy8gICAgIHRoaXMucGh5c2ljcygpO1xuLy8gICB9LmJpbmQodGhpcyksIDcpO1xuLy8gICAvL0NvbmZpZ3VyaW5nIHRoaW5ncy4uLlxuLy8gICB0aGlzLm1hcCA9IG5ldyB0aGlzLm1hcChjb25maWcubWFwLm1hcFdpZHRoLCBjb25maWcubWFwLm1hcEhlaWdodCwgdW5kZWZpbmVkLCB0aGlzLmNvbnZlcnRNYXAoY29uZmlnLm1hcCkpO1xuLy9cbi8vICAgdGhpcy50ZXh0dXJlcyA9IHt9O1xuLy8gICBmb3IgKHZhciBpIGluIGNvbmZpZy50ZXh0dXJlcykge1xuLy8gICAgIGlmIChjb25maWcudGV4dHVyZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSAhPSAnYmFzZVVybCcpIHtcbi8vICAgICAgIHRoaXMudGV4dHVyZXNbaV0gPSBuZXcgdGhpcy50ZXh0dXJlKGNvbmZpZy50ZXh0dXJlc1snYmFzZVVybCddICsgY29uZmlnLnRleHR1cmVzW2ldKS5pbWFnZTtcbi8vICAgICB9XG4vLyAgIH1cbi8vXG4vLyAgIC8vRHJhd2luZ3NwYWNlIGZvciBjYW52YXNcbi8vICAgdGhpcy5jYW52YXMgPSBuZXcgQ29udGV4dChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykpO1xuLy9cbi8vICAgdGhpcy5jYW52YXMuY2FudmFzLndpZHRoID0gY29uZmlnLm1hcC5tYXBXaWR0aCpjb25maWcubWFwLmJsb2NrU2l6ZTtcbi8vICAgdGhpcy5jYW52YXMuY2FudmFzLmhlaWdodCA9IGNvbmZpZy5tYXAubWFwSGVpZ2h0KmNvbmZpZy5tYXAuYmxvY2tTaXplO1xuLy8gfVxuLy9cbi8vIC8qXG4vLyB2YXIgcGxheWVyID0ge2dyYXZpdHk6IC0xLCB2ZWxvY2l0eTogMSwgcG9zaXRpb246IDB9XG4vLyB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVzdCcpLnN0eWxlLm1hcmdpblRvcCA9IHBsYXllci5wb3NpdGlvbioxMDAwICsgXCJweFwiO1xuLy8gICBwbGF5ZXIucG9zaXRpb24gPSBwbGF5ZXIucG9zaXRpb24gKyAwLjAxMCAqIHBsYXllci52ZWxvY2l0eTtcbi8vICAgcGxheWVyLnZlbG9jaXR5ID0gcGxheWVyLnZlbG9jaXR5ICsgMC4wMTAgKiBwbGF5ZXIuZ3Jhdml0eTtcbi8vICAgY29uc29sZS5sb2cocGxheWVyLnBvc2l0aW9uKTtcbi8vIH0sIDEwKTtcbi8vICovXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
