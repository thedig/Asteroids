(function(root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var Game = Asteroids.Game = function(ctx) {
    this.context = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(5);
    this.ship = new Asteroids.Ship([Asteroids.Game.DIM_X / 2, 
      Asteroids.Game.DIM_Y / 2], 0, [0,1]);
    this.bindKeyHandlers();
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.STEP_INTERVAL = 50;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for(var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(
        Asteroids
        .Asteroid
        .prototype
        .randomAsteroid(Game.DIM_X, Game.DIM_Y)
      );
    }
  };

  Game.prototype.bindKeyHandlers = function() {
    key('a', function() {
      alert('you pressed a!');
    });

    key('up', this.ship.power.bind(this.ship));
    key('down', this.ship.slow.bind(this.ship));
    key('right', this.ship.turn.bind(this.ship));
    key('left', this.ship.turn.bind(this.ship));
    key('space', this.fireBullet.bind(this));
  }

  Game.prototype.checkCollisions = function() {
    var game = this;
    game.asteroids.forEach( function(asteroid) {
      if (asteroid.isCollidedWith(game.ship)) {
        alert("You died!");
        game.stop();
      }
    })
  };

  Game.prototype.draw = function () {
    var game = this;
    game.context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    game.asteroids.forEach(function (asteroid) {
      asteroid.draw(game.context);
    });
    game.bullets.forEach(function (bullet) {
      bullet.draw(game.context);
    });
    game.ship.draw(game.context);
  };

  Game.prototype.fireBullet = function() {
    if (this.ship.speed !== 0) {
      this.bullets.push(this.ship.fireBullet(this));
    }
  };

  Game.prototype.move = function () {
    var game = this;
    game.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
    game.bullets.forEach(function (bullet) {
      bullet.move();
    });
    game.ship.move();
  };

  Game.prototype.removeAsteroid = function(asteroidIdx) {
    // if (asteroidIdx > -1) {
      // this.asteroids.splice(asteroidIdx, 1);
      // console.log(this.asteroids);
    // }

    console.log("got here");
    var game = this;
    var asteroidsLeft = [];


    for(var i = 0; i < game.asteroids.length; i++) {
      if (i != asteroidIdx) {
        asteroidsLeft.push(game.asteroids[i]);
      }
      else {
        console.log(asteroidIdx);
        console.log("and " + i);
      }
    }
    game.asteroids = asteroidsLeft;
  };

  Game.prototype.removeBullet = function(bullet_idx) {
    if (bullet_idx > -1) {
      this.bullets = this.bullets.splice(bullet_idx, 1);
    }
  };

  Game.prototype.removeOffAsteroids = function () {
    var game = this;
    var asteroidsLeft = [];

    for(var i = 0; i < game.asteroids.length; i++) {
      var currentAsteroid = game.asteroids[i];
      if (currentAsteroid.isOnBoard(Game.DIM_X, Game.DIM_Y)) {
        asteroidsLeft.push(currentAsteroid);
      }
    }
    game.asteroids = asteroidsLeft;
  };

  Game.prototype.removeOffBullets = function () {
    var game = this;
    var bulletsLeft = [];

    for(var i = 0; i < game.bullets.length; i++) {
      var currentBullet = game.bullets[i];
      if (currentBullet.isOnBoard(Game.DIM_X, Game.DIM_Y)) {
        bulletsLeft.push(currentBullet);
      }
    }
    game.bullets = bulletsLeft;
  };

  Game.prototype.start = function () {
    this.myInterval = setInterval(this.step.bind(this), Game.STEP_INTERVAL);
  };

  Game.prototype.step = function (){
    var game = this;
    this.move();
    this.draw();
    this.checkCollisions();
    this.removeOffAsteroids();
    this.removeOffBullets();
    this.bullets.forEach(function(bullet, bulletIdx) { //refactor?
      var collidedAsteroidIdx = bullet.hitAsteroids();
      console.log("got here !!!!!");
      console.log(collidedAsteroidIdx);
      if (collidedAsteroidIdx) {
        var realAsterIdx = (collidedAsteroidIdx - 1);
        console.log("got here ???");
        game.removeAsteroid(realAsterIdx);
        game.removeBullet(bulletIdx);
      }
    })
  };

  Game.prototype.stop = function() {
    window.clearInterval(this.myInterval);
  }

})(this);