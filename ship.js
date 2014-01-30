(function(root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var Ship = Asteroids.Ship = function () {
    var args = Array.prototype.slice.call(arguments);
    Asteroids.MovingObject.apply(this, args);
    
    this.color = "blue";
    this.radius = 15;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );

    var line1x = this.pos[0]-15;
    var line1y = this.pos[1]+35;
    var line2x = this.pos[0]+15;
    var line2y = this.pos[1]+35;

    if ((this.dir[0] == -1) && (this.dir[1] == -1)) {
      line1x = this.pos[0]+35;
      line1y = this.pos[1]+15;
      line2x = this.pos[0]+15;
      line2y = this.pos[1]+35;
    }

    if ((this.dir[0] == -1) && (this.dir[1] == 0)) {
      line1x = this.pos[0]+35;
      line1y = this.pos[1]-15;
      line2x = this.pos[0]+35;
      line2y = this.pos[1]+15;
    }

    if ((this.dir[0] == -1) && (this.dir[1] == 1)) {
      line1x = this.pos[0]+35;
      line1y = this.pos[1]-15;
      line2x = this.pos[0]+15;
      line2y = this.pos[1]-35;
    }

    if ((this.dir[0] == 0) && (this.dir[1] == 1)) {
      line1x = this.pos[0]+15;
      line1y = this.pos[1]-35;
      line2x = this.pos[0]-15;
      line2y = this.pos[1]-35;
    }

    if ((this.dir[0] == 1) && (this.dir[1] == 1)) {
      line1x = this.pos[0]-35;
      line1y = this.pos[1]-15;
      line2x = this.pos[0]-15;
      line2y = this.pos[1]-35;
    }

    if ((this.dir[0] == 1) && (this.dir[1] == 0)) {
      line1x = this.pos[0]-35;
      line1y = this.pos[1]-15;
      line2x = this.pos[0]-35;
      line2y = this.pos[1]+15;
    }

    if ((this.dir[0] == 1) && (this.dir[1] == -1)) {
      line1x = this.pos[0]-35;
      line1y = this.pos[1]+15;
      line2x = this.pos[0]-15;
      line2y = this.pos[1]+35;
    }

    ctx.moveTo(this.pos[0],this.pos[1]);
    ctx.lineTo(line1x,line1y);
    ctx.lineTo(line2x,line2y);

    ctx.fill();


  };



  Ship.prototype.fireBullet = function(game){
    var ship = this;
    return new Asteroids.Bullet(ship.pos, 30, ship.dir, 3, "white", game);
  };

  Ship.prototype.power = function(boost) {
    if (this.speed > 19) {
      return this.speed;
    }
    boost_val = (boost === event) ? 5 : boost;
    this.speed += boost_val;
  };

  Ship.prototype.slow = function(slow_incr) {
    if (this.speed === 0) {
      return this.speed;
    }
    boost_val = (slow_incr === event) ? 5 : slow_incr;
    this.speed -= boost_val;
  };

  Ship.prototype.turn = function(dir_event) {
    if (dir_event.keyCode === 39) {  // right keystroke
      var new_dir = this.direction_seq.indexOf(this.dir) + 1;
    } else if (dir_event.keyCode === 37) { // left keystroke
      var new_dir = this.direction_seq.indexOf(this.dir) - 1;
    }

    if(new_dir > 7) {
      new_dir = 0;
    } else if(new_dir < 0) {
      new_dir = 7;
    }
    this.dir = this.direction_seq[new_dir];
  };

})(this);