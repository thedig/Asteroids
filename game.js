(function(root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var Game = Asteroids.Game = function(ctx) {
    this.context = ctx;
    this.asteroids = [];
    this.addAsteroids(5);
    this.ship = new Asteroids.Ship([Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2], 0, [1,1]);
  };

  // prototype?
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

    key('up', this.ship.power.bind(this));
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
    game.ship.draw(game.context);
  };

  Game.prototype.move = function () {
    var game = this;
    game.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
    game.ship.move();
  };

  Game.prototype.removeOffAsteroids = function () {
    var game = this;
    var asteroidsLeft = [];

    for(var i = 0; i < game.asteroids.length; i++) {
      if (game.asteroids[i].isOnBoard(Game.DIM_X, Game.DIM_Y)) {
        asteroidsLeft.push(game.asteroids[i]);
      }
    }

    game.asteroids = asteroidsLeft;
  };

  Game.prototype.start = function () {
    this.myInterval = setInterval(this.step.bind(this), Game.STEP_INTERVAL);
  };

  Game.prototype.step = function (){
    this.move();
    this.draw();
    this.checkCollisions();
    this.removeOffAsteroids();
    console.log(this.asteroids.length);
  };

  Game.prototype.stop = function() {
    window.clearInterval(this.myInterval);
  }





})(this);