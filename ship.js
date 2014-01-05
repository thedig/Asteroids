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
    var ship = this;
    console.log(ship.pos);
    console.log(ship.dir);
    return new Asteroids.Bullet(ship.pos, 30, ship.dir);
  };

  Ship.prototype.power = function(boost) {
    if (this.speed > 19) {
      return this.speed;
    }
    boost_val = (boost === event) ? 5 : boost;
    this.speed += boost_val;
  };

  Ship.prototype.power = function(boost) {
    if (this.speed === 0) {
      return this.speed;
    }
    boost_val = (boost === event) ? 5 : boost;
    this.speed += boost_val;
  };

  Ship.prototype.turn = function(dir_event) {
    if (dir_event.keyCode === 39) {  // right keystroke
      // console.log("right turn");
      var new_dir = this.direction_seq.indexOf(this.dir) + 1;
    } else if (dir_event.keyCode === 37) { // left keystroke
      // console.log("left turn");
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