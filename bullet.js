(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Bullet = Asteroids.Bullet = function() {
    var args = Array.prototype.slice.call(arguments);
    Asteroids.MovingObject.apply(this, args);
    this.game = args[5];
	}

	Bullet.inherits(Asteroids.MovingObject);

	Bullet.prototype.hitAsteroids = function() {
		var bullet = this;

		this.game.asteroids.forEach(function(aster, asterIdx) {
			var collide = aster.isCollidedWith(bullet);
			if (collide) {
				bullet.game.removeAsteroid(asterIdx)
				return (asterIdx + 1);
			}
		})
	}

})(this);