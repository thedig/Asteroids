(function(root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var Ship = Asteroids.Ship = function () {
    var args = Array.prototype.slice.call(arguments);
    Asteroids.MovingObject.apply(this, args);
    this.color = "blue";
    this.radius = 15;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(boost) {
    this.speed += boost;
  }


})(this);