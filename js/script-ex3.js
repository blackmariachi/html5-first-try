var fpsCount = 0,
	fps = 0,
	startTime = 0;

var Timer = function() {
	this.date = new Date();
}

Timer.prototype.update = function() {
	var d = new Date();
	this.date = d;
}

Timer.prototype.getMilliseconds = function() {
	return this.date.getTime();
}

Timer.prototype.getSeconds = function() {
	return Math.round(this.date.getTime() / 1000);
}

window.onload = function() {
	var canvas = document.getElementById("myCanvas"),
		c = canvas.getContext("2d"),
		spritesheet = "img/sprite1.png",
		gray = new Sprite(spritesheet, 60, 60, 0, 0, 5, 5000),
		yellow = new Sprite(spritesheet, 60, 60, 0, 60, 5, 2500),
		red = new Sprite(spritesheet, 60, 60, 0, 120, 5, 1666),
		blue = new Sprite(spritesheet, 60, 60, 0, 180, 5, 1250),
		green = new Sprite(spritesheet, 60, 60, 0, 240, 5, 1000),
		timer = new Timer(),
		startTime = timer.getSeconds();

	c.font = "14px _sans";

	draw(startTime);

	function draw(timeStamp) {
		timer.update();

		if(timeStamp !== timer.getSeconds()) {
			fps = fpsCount;
			fpsCount = 0;
		} else {
			fpsCount++;
		}

		c.fillStyle = "#ffffff";
		c.fillRect(0, 0, canvas.width, canvas.height);

		c.fillStyle = "#000000";

		gray.setPosition(40, 60);
		gray.animate(c, timer);
		gray.draw(c);

		yellow.setPosition(80, 100);
		yellow.animate(c, timer);
		yellow.draw(c);

		red.setPosition(120, 140);
		red.animate(c, timer);
		red.draw(c);

		blue.setPosition(160, 180);
		blue.animate(c, timer);
		blue.draw(c);

		green.setPosition(200, 220);
		green.animate(c, timer);
		green.draw(c);

		c.fillText("Elapsed Time: " + (timeStamp - startTime) + " Seconds", 10, 20);
		c.fillText("FPS: " + fps, 10, 40);

		setTimeout(
			function() { 
				draw(timer.getSeconds()); 
			}, 1
		);
	}
}