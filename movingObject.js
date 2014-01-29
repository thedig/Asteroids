(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var MovingObject = Asteroids.MovingObject =
    function (pos, speed, dir, radius, color) {
      this.pos = pos;
      this.speed = speed;
      this.dir = dir;
      this.radius = radius;
      this.color = color;
      this.direction_seq = [[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]];
    };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var x = this.pos[0];
    var y = this.pos[1];
    var a = otherObject.pos[0];
    var b = otherObject.pos[1];
    var distance =
      Math.sqrt(Math.pow((x - a), 2) + Math.pow((y - b), 2));
    var combinedRadii = this.radius + otherObject.radius;
    return combinedRadii >= distance;
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isOnBoard = function(dimX, dimY) {
    return (this.pos[0] > -20) &&
      (this.pos[0] < (dimX + 20)) &&
      (this.pos[1] > -20) &&
      (this.pos[1] < (dimY + 20));
  };

  MovingObject.prototype.move = function() {
    var velocity = this.vel();
    this.pos = [this.pos[0] + velocity[0], this.pos[1] + velocity[1]];
    return this.pos;
  }

  MovingObject.prototype.vel = function() {
    var multiplier = 1;
    if (Math.abs(this.dir[0]) === 1 && Math.abs(this.dir[1]) === 1) {
      multiplier = 0.7;
    }
    var adjustedSpeed = this.speed * multiplier;
    return [this.dir[0] * adjustedSpeed, this.dir[1] * adjustedSpeed];
  };

})(this);

