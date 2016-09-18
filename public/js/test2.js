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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QyLmpzIl0sIm5hbWVzIjpbImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImN0eCIsImdldENvbnRleHQiLCJWIiwieCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInkiLCJfY2xhc3NDYWxsQ2hlY2siLCJ0aGlzIiwidiIsInMiLCJhbmdsZSIsInZlY3RvciIsInhfcHJpbWUiLCJNYXRoIiwiY29zIiwic2luIiwieV9wcmltZSJdLCJtYXBwaW5ncyI6IjZYQUFJQSxPQUFTQyxTQUFTQyxjQUFjLFNBQ3BDRCxVQUFTRSxLQUFLQyxZQUFZSixPQUMxQixJQUFJSyxLQUFNTCxPQUFPTSxXQUFXLE1BR3RCQyxhQUNKLFFBQUFBLEtBQTJCLEdBQWRDLEdBQWNDLFVBQUFDLFFBQUEsR0FBQUMsU0FBQUYsVUFBQSxHQUFWLEVBQVVBLFVBQUEsR0FBUEcsRUFBT0gsVUFBQUMsUUFBQSxHQUFBQyxTQUFBRixVQUFBLEdBQUgsRUFBR0EsVUFBQSxFQUFBSSxpQkFBQUMsS0FBQVAsR0FDekJPLEtBQUtOLEVBQUlBLEVBQ1RNLEtBQUtGLEVBQUlBLHFEQUdVLEdBQWpCRyxHQUFpQk4sVUFBQUMsUUFBQSxHQUFBQyxTQUFBRixVQUFBLEdBQWIsR0FBSUYsR0FBRSxFQUFHLEdBQUlFLFVBQUEsRUFDbkIsT0FBTyxJQUFJRixHQUFFUSxFQUFFUCxFQUFJTSxLQUFLTixFQUFHTyxFQUFFSCxFQUFJRSxLQUFLRixzQ0FHZCxHQUFqQkcsR0FBaUJOLFVBQUFDLFFBQUEsR0FBQUMsU0FBQUYsVUFBQSxHQUFiLEdBQUlGLEdBQUUsRUFBRyxHQUFJRSxVQUFBLEVBQ3hCLE9BQU8sSUFBSUYsR0FBRU8sS0FBS04sRUFBSU8sRUFBRVAsRUFBR00sS0FBS0YsRUFBSUcsRUFBRUgsbUNBRzNCLEdBQVBJLEdBQU9QLFVBQUFDLFFBQUEsR0FBQUMsU0FBQUYsVUFBQSxHQUFILEVBQUdBLFVBQUEsRUFDWCxPQUFPLElBQUlGLEdBQUVPLEtBQUtOLEVBQUlRLEVBQUdGLEtBQUtGLEVBQUlJLGlDQUdmLEdBQWpCRCxHQUFpQk4sVUFBQUMsUUFBQSxHQUFBQyxTQUFBRixVQUFBLEdBQWIsR0FBSUYsR0FBRSxFQUFHLEdBQUlFLFVBQUEsRUFDbkIsT0FBUUssTUFBS04sRUFBSU8sRUFBRVAsRUFBSU0sS0FBS0YsRUFBSUcsRUFBRUgsa0NBR2IsR0FBakJHLEdBQWlCTixVQUFBQyxRQUFBLEdBQUFDLFNBQUFGLFVBQUEsR0FBYixHQUFJRixHQUFFLEVBQUcsR0FBSUUsVUFBQSxFQUNyQixPQUFRSyxNQUFLTixFQUFJTyxFQUFFSCxFQUFJRSxLQUFLRixFQUFJRyxFQUFFUCxpQ0FHN0JTLEVBQU9DLEdBQ1osR0FBSVYsR0FBSU0sS0FBS04sRUFBSVUsRUFBT1YsRUFDcEJJLEVBQUlFLEtBQUtGLEVBQUlNLEVBQU9OLEVBRXBCTyxFQUFVRCxFQUFPVixHQUFNQSxFQUFJWSxLQUFLQyxJQUFJSixHQUFXTCxFQUFJUSxLQUFLRSxJQUFJTCxJQUM1RE0sRUFBVUwsRUFBT04sR0FBTUosRUFBSVksS0FBS0UsSUFBSUwsR0FBV0wsRUFBSVEsS0FBS0MsSUFBSUosR0FFaEUsT0FBTyxJQUFJVixHQUFFWSxFQUFTSSIsImZpbGUiOiJ0ZXN0Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcblxyXG5jbGFzcyBWIHtcclxuICBjb25zdHJ1Y3RvciAoeCA9IDAsIHkgPSAwKSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICB9XHJcblxyXG4gIGFkZCh2ID0gbmV3IFYoMCwgMCkpIHtcclxuICAgIHJldHVybiBuZXcgVih2LnggKyB0aGlzLngsIHYueSArIHRoaXMueSk7XHJcbiAgfVxyXG5cclxuICBzdWJ0cmFjdCh2ID0gbmV3IFYoMCwgMCkpIHtcclxuICAgIHJldHVybiBuZXcgVih0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSk7XHJcbiAgfVxyXG5cclxuICBzY2FsZShzID0gMCkge1xyXG4gICAgcmV0dXJuIG5ldyBWKHRoaXMueCAqIHMsIHRoaXMueSAqIHMpO1xyXG4gIH1cclxuXHJcbiAgZG90KHYgPSBuZXcgVigwLCAwKSkge1xyXG4gICAgcmV0dXJuICh0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkpO1xyXG4gIH1cclxuXHJcbiAgY3Jvc3ModiA9IG5ldyBWKDAsIDApKSB7XHJcbiAgICByZXR1cm4gKHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueCk7XHJcbiAgfVxyXG5cclxuICByb3RhdGUoYW5nbGUsIHZlY3Rvcikge1xyXG4gICAgbGV0IHggPSB0aGlzLnggLSB2ZWN0b3IueDtcclxuICAgIGxldCB5ID0gdGhpcy55IC0gdmVjdG9yLnk7XHJcblxyXG4gICAgbGV0IHhfcHJpbWUgPSB2ZWN0b3IueCArICgoeCAqIE1hdGguY29zKGFuZ2xlKSkgLSAoeSAqIE1hdGguc2luKGFuZ2xlKSkpO1xyXG4gICAgbGV0IHlfcHJpbWUgPSB2ZWN0b3IueSArICgoeCAqIE1hdGguc2luKGFuZ2xlKSkgKyAoeSAqIE1hdGguY29zKGFuZ2xlKSkpO1xyXG5cclxuICAgIHJldHVybiBuZXcgVih4X3ByaW1lLCB5X3ByaW1lKTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
