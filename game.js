(function(root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var Game = Asteroids.Game = function(ctx) {
    this.context = ctx;
    this.asteroids = [];
    this.addAsteroids(5);
    console.log(this.asteroids);
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

  Game.prototype.draw = function () {
    var game = this;
    game.context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    game.asteroids.forEach(function (asteroid) {
      asteroid.draw(game.context);
    });
  };

  Game.prototype.move = function () {
    var game = this;
    game.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.start = function () {
    window.setInterval(this.step.bind(this), Game.STEP_INTERVAL);
  };

  Game.prototype.step = function (){
    this.move();
    this.draw();
  };


})(this);