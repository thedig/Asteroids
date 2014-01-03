(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var MovingObject = Asteroids.MovingObject =
    function (pos, speed, dir, radius, color) {
      this.pos = pos;
      this.speed = speed;
      this.dir = dir;
      this.radius = radius;
      this.color = color;
    };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var x = this.pos[0];
    var y = this.pos[1];
    var a = otherObject.pos[0];
    var b = otherObject.pos[1];
    var distance =
      Math.sqrt(Math.pow((x - a), 2) + Math.pow((y - b), 2));
    var combinedRadii = this.radius + otherObject.radius;
    console.log(combinedRadii >= distance);
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


// m1 = new MovingObject([25,25], 10, [1,1], 15, "black");
// m2 = new MovingObject([40,40], 10, [1,1], 15, "red");
