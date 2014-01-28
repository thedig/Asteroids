(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  Function.prototype.inherits = function(BaseClass) {
    function Surrogate() {};
    Surrogate.prototype = BaseClass.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroid = Asteroids.Asteroid = function() {
    var args = Array.prototype.slice.call(arguments);
    Asteroids.MovingObject.apply(this, args);
    this.color = "brown";
    this.radius = 10;
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.prototype.randomAsteroid = function(dimX, dimY, offBoard) {
    if (offBoard) {
      console.log("generate offboard asteroid")
    } else {
    var startX = Math.random() * dimX;
    var startY = Math.random() * dimY;
    var startSpeed = randomSpeed();
    var startDir = randomDir();
    return new Asteroid([startX, startY], startSpeed, startDir);
    }
  };

  var _randomDir = function() {
    var xRand = Math.random();
    var yRand = Math.random();

    if (xRand < 0.33) {
      var xDir = -1;
    } else if (xRand < 0.67) {
      var xDir = 0;
    } else {
      var xDir = 1;
    }

    if (yRand < 0.33) {
      var yDir = -1;
    } else if (yRand < 0.67) {
      var yDir = 0;
    } else {
      var yDir = 1;
    }

    return [xDir, yDir];
  };

  var randomDir = function() {
    var dir;
    do {
      dir = _randomDir();
    } while (dir[0] === 0 && dir[1] === 0);

    return dir;
  };

  var randomSpeed = function() {
    return (Math.random() * 5 + 0);
  }

})(this);


