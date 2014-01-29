(function(root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var Ship = Asteroids.Ship = function () {
    var args = Array.prototype.slice.call(arguments);
    Asteroids.MovingObject.apply(this, args);
    
    this.color = "blue";
    this.radius = 15;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.fireBullet = function(game){
    var ship = this;
    return new Asteroids.Bullet(ship.pos, 30, ship.dir, 3, "black", game);
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
    }
    else if(new_dir < 0) {
      new_dir = 7;
    }
    this.dir = this.direction_seq[new_dir];
  };

})(this);