(function(root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var Ship = Asteroids.Ship = function () {
    var args = Array.prototype.slice.call(arguments);
    Asteroids.MovingObject.apply(this, args);
    this.color = "blue";
    this.radius = 15;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.fireBullet = function(){

  };

  Ship.prototype.power = function(boost) {
    boost_val = (boost === event) ? 10 : boost;
    this.speed += boost_val;
  };

  Ship.prototype.turn = function(dir) {
    if (dir === "right") {

    } else if (dir === "left") {

    }
  };

})(this);