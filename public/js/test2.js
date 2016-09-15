"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var V = function () {
  function V() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, V);

    this.x = x;
    this.y = y;
  }

  _createClass(V, [{
    key: "add",
    value: function add() {
      var v = arguments.length <= 0 || arguments[0] === undefined ? new V(0, 0) : arguments[0];

      return new V(v.x + this.x, v.y + this.y);
    }
  }, {
    key: "subtract",
    value: function subtract() {
      var v = arguments.length <= 0 || arguments[0] === undefined ? new V(0, 0) : arguments[0];

      return new V(this.x - v.x, this.y - v.y);
    }
  }, {
    key: "scale",
    value: function scale() {
      var s = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      return new V(this.x * s, this.y * s);
    }
  }, {
    key: "dot",
    value: function dot() {
      var v = arguments.length <= 0 || arguments[0] === undefined ? new V(0, 0) : arguments[0];

      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "cross",
    value: function cross() {
      var v = arguments.length <= 0 || arguments[0] === undefined ? new V(0, 0) : arguments[0];

      return this.x * v.y - this.y * v.x;
    }
  }, {
    key: "rotate",
    value: function rotate(angle, vector) {
      var x = this.x - vector.x;
      var y = this.y - vector.y;

      var x_prime = vector.x + (x * Math.cos(angle) - y * Math.sin(angle));
      var y_prime = vector.y + (x * Math.sin(angle) + y * Math.cos(angle));

      return new V(x_prime, y_prime);
    }
  }]);

  return V;
}();